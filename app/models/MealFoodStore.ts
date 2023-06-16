import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FoodModel } from "./Food"
import { MealModel } from "./Meal"
import { DailyMealsModel } from "./DailyMealsModel"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { mealApi, foodApi } from "../services/api"
export const MealFoodStoreModel = types
    .model("MealFoodStore")
    .props({
        // Danh sách các thực phẩm
        foods: types.array(FoodModel),
        // Danh sách các món ăn
        meals: types.array(MealModel),
        // Hiển thị danh sách các món ăn, hoặc thực phẩm đã nạp trong ngày
        dailyMeals: types.optional(DailyMealsModel, {}),
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async fetchFoods() {
            const response = await foodApi.getAllFoodsFromSystem()
            if (response.kind === "ok") {
                store.setProp("foods", response.foods)
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },
        async fetchMeals() {
            const response = await mealApi.getAllFoodsFromSystem()
            if (response.kind === "ok") {
                store.setProp("meals", response.meals)
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },

    }))
    .views((store) => ({
        get foodsForList() {
            return store.foods
        },
        get mealsForList() {
            return store.meals
        }

    }))

export interface MealFoodStore extends Instance<typeof MealFoodStoreModel> { }
export interface MealFoodStoreSnapshot extends SnapshotOut<typeof MealFoodStoreModel> { }

// @demo remove-file
