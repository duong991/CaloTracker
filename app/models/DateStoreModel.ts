import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { waterLogApi, dailyCaloApi } from "app/services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { convertDateBeforeInsertOrUpdate } from "app/utils/convertDate"
import { MealFoodStoreModel } from "./MealFoodStore"
import { ExerciseStoreModel } from "./ExerciseStore"

export const DateStoreModel = types
  .model("DateStore")
  .props({
    dateTime: types.optional(types.Date, new Date()),
    amount: types.optional(types.number, 0),
    mealFoodStoreModel: types.optional(MealFoodStoreModel, {}),
    exerciseStoreModel: types.optional(ExerciseStoreModel, {}),
  })
  .views((store) => ({
    getDateStore() {
      return {
        dateTime: store.dateTime,
      }
    },

  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchData(time: Date) {
      const dateString = convertDateBeforeInsertOrUpdate(time)
      if (dateString !== '') {
        const response = await
          waterLogApi.getWaterLogByDate(dateString)
        const response2 = await
          dailyCaloApi.getDailyCaloByDate(dateString)
        // nếu response.kind === "ok" thì set amount = response.data.amount
        console.log(response2, "---", response);
        if (response.kind === "ok") {
          store.setProp("amount", response.data.amount)
        } else {
          console.tron.error(`Error fetching water log : ${JSON.stringify(response)}`, [])
        }
        // nếu response2.kind === "ok" thì set mealFoodStoreModel và exerciseStoreModel
        if (response2.kind === "ok") {
          const data = response2.data.items
          if (data === null) {
            store.mealFoodStoreModel.clearDailyMeal()
            store.exerciseStoreModel.clearExercise()
          } else {
            // nếu không có caloIntakeMappings thì clear mealFoodStoreModel _ tức ngày hôm đó không có nhật ký được ghi lại
            if (data.caloIntakeMappings === null || !data.caloIntakeMappings) {
              store.mealFoodStoreModel.clearDailyMeal()
            }
            // nếu có caloIntakeMappings thì add mealFood vào mealFoodStoreModel _ tức ngày hôm đó có nhật ký được ghi lại
            else if (data.caloIntakeMappings !== null && data.caloIntakeMappings) {
              // clear mealFoodStoreModel
              store.mealFoodStoreModel.clearDailyMeal()
              // add mealFood vào mealFoodStoreModel
              // lấy caloIntakeMappings _ mảng các mealFood trong ngày chứa Id của meal và food và số lượng, được dùng trong bữa nào
              const dataIntake = data.caloIntakeMappings
              dataIntake.forEach((item) => {
                // nếu mealId !== null thì add meal vào mealFoodStoreModel _mealId là id của meal hệ thống
                if (item.mealId !== null) {
                  store.mealFoodStoreModel.addDailyMeal(item.mealId, item.mealType, false)
                }
                // nếu foodId !== null thì add food vào mealFoodStoreModel _foodId là id của food hệ thống
                else if (item.foodId !== null) {
                  const value = {
                    id: item.foodId,
                    servingSize: item.servingSize,
                  }
                  store.mealFoodStoreModel.addDailyFood(value, item.mealType, false)
                }
                else if (item.userFoodId !== null) {
                  const value = {
                    id: item.userFoodId,
                    servingSize: item.servingSize,
                  }
                  store.mealFoodStoreModel.addDailyFood(value, item.mealType, true)
                }
                else if (item.userMealId) {
                  store.mealFoodStoreModel.addDailyMeal(item.userMealId, item.mealType, true)
                }
              }
              )
            }
            // nếu không có caloConsumedMappings thì clear exerciseStoreModel
            if (!data?.caloConsumedMappings.length) {
              store.exerciseStoreModel.clearExercise()
            }
            // nếu có caloConsumedMappings thì add exercise vào exerciseStoreModel
            else {
              const dataConsumed = data.caloConsumedMappings
              dataConsumed.forEach((item) => {
                if (item.exerciseId !== null) {
                  let newExercise
                  const exercise = store.exerciseStoreModel.exercises.find((exercise) => exercise.id === item.exerciseId);
                  if (exercise) {
                    newExercise = {
                      id: exercise.id,
                      name: exercise.name,
                      caloriesBurned: exercise.caloriesBurned * item.duration / exercise.duration,
                      duration: item.duration,
                    }
                    store.exerciseStoreModel.addExercise(newExercise)
                  }
                }
              })
            }
          }

        } else {
          store.mealFoodStoreModel.clearDailyMeal()
          console.tron.error(`Error fetching daily calo : ${JSON.stringify(response2)}`, [])
        }
      }
    },
    setDateTime(value: Date) {
      let flag = true
      store.dateTime = value
      while (!store.dateTime) {
        if (store.dateTime) {
          flag = false
          this.fetchData(value)
          return;
        }
      }
      if (store.dateTime && flag) {
        console.log("setDateTime", store.dateTime);
        this.fetchData(value)
      }
    },
    setAmount(value: number) {
      store.amount = value
    },
    checkTimeChoseIsToday() {
      const today = new Date()
      return today.getDate() === store.dateTime.getDate() && today.getMonth() === store.dateTime.getMonth() && today.getFullYear() === store.dateTime.getFullYear()
    },
    getUserFood(id: number) {
      const userFoodId = "USERFOOD-" + id
      return store.mealFoodStoreModel.userFoods.find((food) => food.id === userFoodId)
    }

  }))

export interface DateStore extends Instance<typeof DateStoreModel> { }
export interface DateStoreSnapshot extends SnapshotOut<typeof DateStoreModel> { }

