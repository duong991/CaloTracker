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
    async fetchData() {
      const response = await
        waterLogApi.getWaterLogByDate(
          convertDateBeforeInsertOrUpdate(
            store.dateTime))
      const response2 = await
        dailyCaloApi.getDailyCaloByDate(
          convertDateBeforeInsertOrUpdate(
            store.dateTime))
      if (response.kind === "ok") {
        store.setProp("amount", response.data.amount)
      } else {
        console.tron.error(`Error fetching water log : ${JSON.stringify(response)}`, [])
      }
      if (response2.kind === "ok") {
        const data = response2.data
        // check caloIntakeMappings 
        if (data.caloIntakeMappings === null || !data.caloIntakeMappings) {
          store.mealFoodStoreModel.clearMealFood()
        } else if (data.caloIntakeMappings !== null && data.caloIntakeMappings) {
          const dataIntake = data.caloIntakeMappings
          dataIntake.forEach((item) => {
            if (item.mealId !== null) {
              let meal;
              switch (item.mealType) {
                case 'breakfast':
                  meal = store.mealFoodStoreModel.meals.find((meal) => meal.id === item.mealId);
                  store.mealFoodStoreModel.dailyMeals.addMealToBreakfast(meal);
                  break;
                case 'lunch':
                  meal = store.mealFoodStoreModel.meals.find((meal) => meal.id === item.mealId);
                  store.mealFoodStoreModel.dailyMeals.addMealToLunch(meal);
                  break;
                case 'dinner':
                  meal = store.mealFoodStoreModel.meals.find((meal) => meal.id === item.mealId);
                  store.mealFoodStoreModel.dailyMeals.addMealToDinner(meal);
                  break;
                case 'snack':
                  meal = store.mealFoodStoreModel.meals.find((meal) => meal.id === item.mealId);
                  store.mealFoodStoreModel.dailyMeals.addMealToSnacks(meal);
                  break;
              }
            }
            else if (item.foodId !== null) {
              store.mealFoodStoreModel.addDailyFood(item, item.mealType)
            }
          }
          )
        }
        // check caloConsumedMappings
        if (data.caloConsumedMappings === null || !data.caloConsumedMappings) {
          store.exerciseStoreModel.clearExercise()
        }
        else if (data.caloConsumedMappings !== null && data.caloConsumedMappings) {
          const dataConsumed = data.caloConsumedMappings
          dataConsumed.forEach((item) => {
            if (item.exerciseId !== null) {
              const exercise = store.exerciseStoreModel.exercises.find((exercise) => exercise.id === item.exerciseId);
              store.exerciseStoreModel.addExercise(exercise)
            }
          })
        }
      } else {
        console.tron.error(`Error fetching daily calo : ${JSON.stringify(response2)}`, [])
      }
    },
    setDateTime(value: Date) {
      store.dateTime = value
      this.fetchData()
    },
    setAmount(value: number) {
      store.amount = value
    },
    checkTimeChoseIsToday() {
      const today = new Date()
      return today.getDate() === store.dateTime.getDate() && today.getMonth() === store.dateTime.getMonth() && today.getFullYear() === store.dateTime.getFullYear()
    }

  }))

export interface DateStore extends Instance<typeof DateStoreModel> { }
export interface DateStoreSnapshot extends SnapshotOut<typeof DateStoreModel> { }

