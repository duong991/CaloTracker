import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FoodModel, Food } from "./Food"
import { DailyFoodModel, DailyFood } from "./DailyFoodModel"
import { Meal, MealModel } from "./Meal"
import { DailyMealsModel } from "./DailyMealsModel"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { mealApi, foodApi } from "../services/api"
type TScreen = 'breakfast' | 'lunch' | 'dinner' | 'snack';
type TMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export const MealFoodStoreModel = types
    .model("MealFoodStore")
    .props({
        // Danh sách các thực phẩm
        foods: types.array(FoodModel),
        // Danh sách các thực phẩm đã nạp trong ngày
        dailyFoods: types.array(DailyFoodModel),
        // Danh sách các thực phẩm của người dùng
        userFoods: types.array(FoodModel),
        // Danh sách các món ănr
        meals: types.array(MealModel),
        // Danh sách các món ăn của người dùng
        userMeals: types.array(MealModel),
        // Hiển thị danh sách các món ăn, hoặc thực phẩm đã nạp trong ngày
        dailyMeals: types.optional(DailyMealsModel, {}),
        // // Hiển thị danh sách food trong 1 meal cụ thể do người dùng tạo
        // userMealFoods: types.optional(DailyFoodModel, {}),
        // // Hiển thị danh sách food trong 1 meal cụ thể do hệ thống tạo

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
            const response = await mealApi.getAllMealFromSystem()
            if (response.kind === "ok") {
                store.setProp("meals", response.meals)
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },
        async fetchUserFoods() {
            const response = await foodApi.getAllFoodsFromUser()
            if (response.kind === "ok") {
                store.setProp("userFoods", response.foods)
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },
        async fetchUserMeals() {
            const response = await mealApi.getAllMealFromUser()
            if (response.kind === "ok") {
                store.setProp("userMeals", response.meals)
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },
        addFood(food: DailyFood, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    store.dailyMeals.addFoodToBreakfast(food)
                    break;
                case "lunch":
                    store.dailyMeals.addFoodToLunch(food)
                    break;
                case "dinner":
                    store.dailyMeals.addFoodToDinner(food)
                    break;
                case "snack":
                    store.dailyMeals.addFoodToSnacks(food)
                    break;
                default:
                    break;
            }

        },
        removeFood(food: DailyFood, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    store.dailyMeals.removeFoodFromBreakfast(food)
                    break;
                case "lunch":
                    store.dailyMeals.removeFoodFromLunch(food)
                    break;
                case "dinner":
                    store.dailyMeals.removeFoodFromDinner(food)
                    break;
                case "snack":
                    store.dailyMeals.removeFoodFromSnacks(food)
                    break;
                default:
                    break;
            }
        },
        addMeal(meal: Meal, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    store.dailyMeals.addMealToBreakfast(meal)
                    break;
                case "lunch":
                    store.dailyMeals.addMealToLunch(meal)
                    break;
                case "dinner":
                    store.dailyMeals.addMealToDinner(meal)
                    break;
                case "snack":
                    store.dailyMeals.addMealToSnacks(meal)
                    break;
                default:
                    break;
            }
        },
        removeMeal(meal: Meal, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    store.dailyMeals.removeMealFromBreakfast(meal)
                    break;
                case "lunch":
                    store.dailyMeals.removeMealFromLunch(meal)
                    break;
                case "dinner":
                    store.dailyMeals.removeMealFromDinner(meal)
                    break;
                case "snack":
                    store.dailyMeals.removeMealFromSnacks(meal)
                    break;
                default:
                    break;
            }
        },
        hasFoodList(food: DailyFood, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    return store.dailyMeals.breakfastFoods.includes(food)
                case "lunch":
                    return store.dailyMeals.lunchFoods.includes(food)
                case "dinner":
                    return store.dailyMeals.dinnerFoods.includes(food)
                case "snack":
                    return store.dailyMeals.snackFoods.includes(food)
                default:
                    return false
            }
        },
        hasMealList(meal: Meal, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    return store.dailyMeals.breakfastMeals.includes(meal)
                case "lunch":
                    return store.dailyMeals.lunchMeals.includes(meal)
                case "dinner":
                    return store.dailyMeals.dinnerMeals.includes(meal)
                case "snack":
                    return store.dailyMeals.snackMeals.includes(meal)
                default:
                    return false
            }
        },

    }))
    .views((store) => ({
        get foodsForList() {
            return store.foods
        },
        get mealsForList() {
            return store.meals
        },
        get userFoodsForList() {
            return store.userFoods
        },
        get userMealsForList() {
            return store.userMeals
        }

    }))
    .actions((store) => ({
        toggleFood(food: DailyFood, screen: TScreen) {
            if (store.hasFoodList(food, screen)) {
                store.removeFood(food, screen)
            } else {
                store.addFood(food, screen)
            }
        },
        toggleMeal(meal: Meal, screen: TScreen) {
            if (store.hasMealList(meal, screen)) {
                store.removeMeal(meal, screen)
            } else {
                store.addMeal(meal, screen)
            }
        },
        selectedFoodForList(screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    return store.dailyMeals.breakfastFoods
                case "lunch":
                    return store.dailyMeals.lunchFoods
                case "dinner":
                    return store.dailyMeals.dinnerFoods
                case "snack":
                    return store.dailyMeals.snackFoods
                default:
                    return []
            }
        },
        selectedMealForList(screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    return store.dailyMeals.breakfastMeals
                case "lunch":
                    return store.dailyMeals.lunchMeals
                case "dinner":
                    return store.dailyMeals.dinnerMeals
                case "snack":
                    return store.dailyMeals.snackMeals
                default:
                    return []
            }
        },
        clearMealFood() {
            store.dailyMeals.clearDailyMeals()
            store.meals.clear()
            store.foods.clear()
            store.userFoods.clear()
            store.userMeals.clear()
            store.dailyFoods.clear()
        },
        addDailyFood(value, mealType: TMealType, isUserCreated: boolean) {
            const food = store.foods.find((food) => food.id === value.id)
            const dailyFood = DailyFoodModel.create({
                id: food.id,
                name: food.name,
                calories: food.calories,
                protein: food.protein,
                carbohydrates: food.carbohydrates,
                fat: food.fat,
                servingSize: value.servingSize,
                isUserCreated,
            })
            switch (mealType) {
                case "breakfast":
                    store.dailyMeals.addFoodToBreakfast(dailyFood);
                    break;
                case "lunch":
                    store.dailyMeals.addFoodToLunch(dailyFood);
                    break;
                case "dinner":
                    store.dailyMeals.addFoodToDinner(dailyFood);
                    break;
                case "snack":
                    store.dailyMeals.addFoodToSnacks(dailyFood);
            }

        },
        // hàm thực hiện convert thì food sang dailyFood đồng thời setProps dailyFoods
        convertArrFoodToDailyFood(arrFood: Food[], arrUserFood: Food[]) {
            console.log("food", arrFood);
            console.log("userFood", arrUserFood);
            let dailyFood = [];
            let foods = []
            let userFoods = []
            if (arrFood.length > 0) {
                foods = arrFood.map((food) => {
                    return DailyFoodModel.create({
                        id: food.id,
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbohydrates: food.carbohydrates,
                        fat: food.fat,
                        servingSize: 100,
                        isUserCreated: false,
                    })
                })
            }
            if (arrUserFood.length > 0) {
                userFoods = arrUserFood.map((food) => {
                    return DailyFoodModel.create({
                        id: food.id,
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbohydrates: food.carbohydrates,
                        fat: food.fat,
                        servingSize: 100,
                        isUserCreated: true,
                    })
                })
            }

            dailyFood = [...userFoods, ...foods]

            store.setProp("dailyFoods", dailyFood)
        },

        removeUserFood(food: Food) {
            store.userFoods.remove(food)
        }

    }))



export interface MealFoodStore extends Instance<typeof MealFoodStoreModel> { }
export interface MealFoodStoreSnapshot extends SnapshotOut<typeof MealFoodStoreModel> { }

// @demo remove-file
