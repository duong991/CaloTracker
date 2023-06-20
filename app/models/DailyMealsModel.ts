import { Instance, SnapshotOut, SnapshotIn, types } from "mobx-state-tree"
// import { Food, FoodModel, } from "./Food"
import { DailyFood, DailyFoodModel, } from "./DailyFoodModel"
import { Meal, MealModel } from "./Meal"

export const DailyMealsModel = types
    .model("DailyMeals")
    .props({
        breakfastMeals: types.array(types.reference(MealModel)),
        breakfastFoods: types.array(types.reference(DailyFoodModel)),
        lunchMeals: types.array(types.reference(MealModel)),
        lunchFoods: types.array(types.reference(DailyFoodModel)),
        dinnerMeals: types.array(types.reference(MealModel)),
        dinnerFoods: types.array(types.reference(DailyFoodModel)),
        snackMeals: types.array(types.reference(MealModel)),
        snackFoods: types.array(types.reference(DailyFoodModel)),
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
            const snacksItems = [...store.snackFoods, ...store.snackMeals]
            combined.push(...snacksItems)
            return {
                breakfast: breakfastItems,
                lunch: lunchItems,
                dinner: dinnerItems,
                snack: snacksItems,
                combined,
            }
        },
        get totalCalories() {
            const CaloriesFromFood =
                store.breakfastFoods.reduce((total, item) => total + item.caloriesPerServing, 0) +
                store.lunchFoods.reduce((total, item) => total + item.caloriesPerServing, 0) +
                store.dinnerFoods.reduce((total, item) => total + item.caloriesPerServing, 0) +
                store.snackFoods.reduce((total, item) => total + item.caloriesPerServing, 0);

            const CaloriesFromMeal =
                store.breakfastMeals.reduce((total, item) => total + item.calories, 0)
                + store.lunchMeals.reduce((total, item) => total + item.calories, 0)
                + store.dinnerMeals.reduce((total, item) => total + item.calories, 0)
                + store.snackMeals.reduce((total, item) => total + item.calories, 0);

            return CaloriesFromFood + CaloriesFromMeal
        },
        get totalProtein() {
            const ProteinFromFood =
                store.breakfastFoods.reduce((total, item) => total + item.proteinPerServing, 0)
                + store.lunchFoods.reduce((total, item) => total + item.proteinPerServing, 0)
                + store.dinnerFoods.reduce((total, item) => total + item.proteinPerServing, 0)
                + store.snackFoods.reduce((total, item) => total + item.proteinPerServing, 0)

            const ProteinFromMeal =
                store.breakfastMeals.reduce((total, item) => total + item.protein, 0)
                + store.lunchMeals.reduce((total, item) => total + item.protein, 0)
                + store.dinnerMeals.reduce((total, item) => total + item.protein, 0)
                + store.snackMeals.reduce((total, item) => total + item.protein, 0)

            return ProteinFromFood + ProteinFromMeal
        },
        get totalFat() {
            const FatFromFood =
                store.breakfastFoods.reduce((total, item) => total + item.fatPerServing, 0)
                + store.lunchFoods.reduce((total, item) => total + item.fatPerServing, 0)
                + store.dinnerFoods.reduce((total, item) => total + item.fatPerServing, 0)
                + store.snackFoods.reduce((total, item) => total + item.fatPerServing, 0)

            const FatFromMeal =
                store.breakfastMeals.reduce((total, item) => total + item.fat, 0)
                + store.lunchMeals.reduce((total, item) => total + item.fat, 0)
                + store.dinnerMeals.reduce((total, item) => total + item.fat, 0)
                + store.snackMeals.reduce((total, item) => total + item.fat, 0)

            return FatFromFood + FatFromMeal
        },
        get totalCarbs() {
            const CarbsFromFood =
                store.breakfastFoods.reduce((total, item) => total + item.carbohydratesPerServing, 0)
                + store.lunchFoods.reduce((total, item) => total + item.carbohydratesPerServing, 0)
                + store.dinnerFoods.reduce((total, item) => total + item.carbohydratesPerServing, 0)
                + store.snackFoods.reduce((total, item) => total + item.carbohydratesPerServing, 0)

            const CarbsFromMeal =
                store.breakfastMeals.reduce((total, item) => total + item.carbohydrates, 0)
                + store.lunchMeals.reduce((total, item) => total + item.carbohydrates, 0)
                + store.dinnerMeals.reduce((total, item) => total + item.carbohydrates, 0)
                + store.snackMeals.reduce((total, item) => total + item.carbohydrates, 0)

            return CarbsFromFood + CarbsFromMeal
        },
        get totalCaloForBreakfast() {
            const CaloFromFood =
                store.breakfastFoods.reduce((total, item) => total + item.caloriesPerServing, 0)
            const CaloFromMeal =
                store.breakfastMeals.reduce((total, item) => total + item.calories, 0)
            return CaloFromFood + CaloFromMeal
        },
        get totalCaloForLunch() {
            const CaloFromFood =
                store.lunchFoods.reduce((total, item) => total + item.caloriesPerServing, 0)
            const CaloFromMeal =
                store.lunchMeals.reduce((total, item) => total + item.calories, 0)
            return CaloFromFood + CaloFromMeal
        },
        get totalCaloForDinner() {
            const CaloFromFood =
                store.dinnerFoods.reduce((total, item) => total + item.caloriesPerServing, 0)
            const CaloFromMeal =
                store.dinnerMeals.reduce((total, item) => total + item.calories, 0)
            return CaloFromFood + CaloFromMeal
        },
        get totalCaloForSnack() {
            const CaloFromFood =
                store.snackFoods.reduce((total, item) => total + item.caloriesPerServing, 0)
            const CaloFromMeal =
                store.snackMeals.reduce((total, item) => total + item.calories, 0)
            return CaloFromFood + CaloFromMeal
        }

    }))
    .actions((store) => ({
        clearDailyMeals() {
            store.breakfastMeals.clear()
            store.breakfastFoods.clear()
            store.lunchMeals.clear()
            store.lunchFoods.clear()
            store.dinnerMeals.clear()
            store.dinnerFoods.clear()
            store.snackMeals.clear()
            store.snackFoods.clear()
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
        addFoodToBreakfast(food: DailyFood) {
            if (store.breakfastFoods.find((f) => f.id === food.id)) {
                return
            }
            store.breakfastFoods.push(food)
        },
        removeFoodFromBreakfast(food: DailyFood) {
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
        addFoodToLunch(food: DailyFood) {
            if (store.lunchFoods.find((f) => f.id === food.id)) {
                return
            }
            store.lunchFoods.push(food)
        },
        removeFoodFromLunch(food: DailyFood) {
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
        addFoodToDinner(food: DailyFood) {
            if (store.dinnerFoods.find((f) => f.id === food.id)) {
                return
            }
            store.dinnerFoods.push(food)
        },
        removeFoodFromDinner(food: DailyFood) {
            store.dinnerFoods.remove(food)
        },
        addMealToSnacks(meal: Meal) {
            if (store.snackMeals.find((m) => m.id === meal.id)) {
                return
            }
            store.snackMeals.push(meal)
        },
        removeMealFromSnacks(meal: Meal) {
            store.snackMeals.remove(meal)
        },
        addFoodToSnacks(food: DailyFood) {
            if (store.snackFoods.find((f) => f.id === food.id)) {
                return
            }
            store.snackFoods.push(food)
        },
        removeFoodFromSnacks(food: DailyFood) {
            store.snackFoods.remove(food)
        },

    }))
export interface DailyMeals extends Instance<typeof DailyMealsModel> { }
export interface DailyMealsSnapshotOut extends SnapshotOut<typeof DailyMealsModel> { }
export interface DailyMealsSnapshotIn extends SnapshotIn<typeof DailyMealsModel> { }