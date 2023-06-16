import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
import { Food, FoodModel } from "./Food"
import { Meal, MealModel } from "./Meal"

export const DailyMealsModel = types
    .model("DailyMeals")
    .props({
        breakfastMeals: types.array(types.reference(MealModel)),
        breakfastFoods: types.array(types.reference(FoodModel)),
        lunchMeals: types.array(types.reference(MealModel)),
        lunchFoods: types.array(types.reference(FoodModel)),
        dinnerMeals: types.array(types.reference(MealModel)),
        dinnerFoods: types.array(types.reference(FoodModel)),
        snacksMeals: types.array(types.reference(MealModel)),
        snacksFoods: types.array(types.reference(FoodModel)),
    })
    .views((store) => ({
        get combinedFoodsAndMeals() {
            const combined = []

            // Bữa sáng
            const breakfastItems = [...store.breakfastFoods, ...store.breakfastMeals]
            combined.push(...breakfastItems)

            // Bữa trưa
            const lunchItems = [...store.lunchFoods, ...store.lunchMeals]
            combined.push(...lunchItems)

            // Bữa tối
            const dinnerItems = [...store.dinnerFoods, ...store.dinnerMeals]
            combined.push(...dinnerItems)

            // Bữa phụ
            const snacksItems = [...store.snacksFoods, ...store.snacksMeals]
            combined.push(...snacksItems)

            return {
                breakfast: breakfastItems,
                lunch: lunchItems,
                dinner: dinnerItems,
                snacks: snacksItems,
                combined,
            }
        },
        get totalCalories() {
            const combined = this.combinedFoodsAndMeals.combined
            return combined.reduce((total, item) => total + item.calories, 0)
        },
        get totalProtein() {
            const combined = this.combinedFoodsAndMeals.combined
            return combined.reduce((total, item) => total + item.protein, 0)
        },
        get totalFat() {
            const combined = this.combinedFoodsAndMeals.combined
            return combined.reduce((total, item) => total + item.fat, 0)
        },
        get totalCarbs() {
            const combined = this.combinedFoodsAndMeals.combined
            return combined.reduce((total, item) => total + item.carbs, 0)
        },
    }))
    .actions((store) => ({
        clearDailyMeals() {
            store.breakfastMeals.clear()
            store.breakfastFoods.clear()
            store.lunchMeals.clear()
            store.lunchFoods.clear()
            store.dinnerMeals.clear()
            store.dinnerFoods.clear()
            store.snacksMeals.clear()
            store.snacksFoods.clear()
        },

        addMealToBreakfast(meal: Meal) {
            if (store.breakfastMeals.find((m) => m.id === meal.id)) {
                return
            }
            store.breakfastMeals.push(meal)
        },
        removeMealFromBreakfast(meal: Meal) {
            store.breakfastMeals.remove(meal)
        },
        addFoodToBreakfast(food: Food) {
            if (store.breakfastFoods.find((f) => f.id === food.id)) {
                return
            }
            store.breakfastFoods.push(food)
        },
        removeFoodFromBreakfast(food: Food) {
            store.breakfastFoods.remove(food)
        },
        addMealToLunch(meal: Meal) {
            if (store.lunchMeals.find((m) => m.id === meal.id)) {
                return
            }
            store.lunchMeals.push(meal)
        },
        removeMealFromLunch(meal: Meal) {
            store.lunchMeals.remove(meal)
        },
        addFoodToLunch(food: Food) {
            if (store.lunchFoods.find((f) => f.id === food.id)) {
                return
            }
            store.lunchFoods.push(food)
        },
        removeFoodFromLunch(food: Food) {
            store.lunchFoods.remove(food)
        },
        addMealToDinner(meal: Meal) {
            if (store.dinnerMeals.find((m) => m.id === meal.id)) {
                return
            }
            store.dinnerMeals.push(meal)
        },
        removeMealFromDinner(meal: Meal) {
            store.dinnerMeals.remove(meal)
        },
        addFoodToDinner(food: Food) {
            if (store.dinnerFoods.find((f) => f.id === food.id)) {
                return
            }
            store.dinnerFoods.push(food)
        },
        removeFoodFromDinner(food: Food) {
            store.dinnerFoods.remove(food)
        },
        addMealToSnacks(meal: Meal) {
            if (store.snacksMeals.find((m) => m.id === meal.id)) {
                return
            }
            store.snacksMeals.push(meal)
        },
        removeMealFromSnacks(meal: Meal) {
            store.snacksMeals.remove(meal)
        },
        addFoodToSnacks(food: Food) {
            if (store.snacksFoods.find((f) => f.id === food.id)) {
                return
            }
            store.snacksFoods.push(food)
        },
        removeFoodFromSnacks(food: Food) {
            store.snacksFoods.remove(food)
        },
    }))
export interface DailyMeals extends Instance<typeof DailyMealsModel> { }
export interface DailyMealsSnapshotOut extends SnapshotOut<typeof DailyMealsModel> { }
export interface DailyMealsSnapshotIn extends SnapshotIn<typeof DailyMealsModel> { }