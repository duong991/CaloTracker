/* eslint-disable no-case-declarations */
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FoodModel, Food } from "./Food"
import { DailyFoodModel, DailyFood } from "./DailyFoodModel"
import { Meal, MealModel } from "./Meal"
import { DailyMealsModel } from "./DailyMealsModel"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { mealApi, foodApi, searchApi } from "../services/api"
import { action } from "mobx"
type TScreen = 'breakfast' | 'lunch' | 'dinner' | 'snack';
type TMealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export const MealFoodStoreModel = types
    .model("MealFoodStore")
    .props({
        // Danh sách các thực phẩm
        foods: types.array(FoodModel),
        // Danh sách các thực phẩm kết hợp từ food của người dùng tự tạo và food của hệ thống
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
        searchFoodList: types.array(DailyFoodModel),
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
        async fetchSearchFoodList(keyword: string) {
            const response = await searchApi.getDataSearchAllFood(keyword)
            if (response.kind === "ok") {
                const foods = response.items.foods
                const userFoods = response.items.userFoods

                const searchFoodList = foods.map((food) => {
                    return DailyFoodModel.create({
                        id: "SYSTEMFOOD-" + food.id,
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbohydrates: food.carbohydrates,
                        fat: food.fat,
                        servingSize: 100,
                        isUserCreated: false,
                    })
                })
                const searchUserFoodList = userFoods.map((food) => {
                    return DailyFoodModel.create({
                        id: "USERFOOD-" + food.id,
                        name: food.name,
                        calories: food.calories,
                        protein: food.protein,
                        carbohydrates: food.carbohydrates,
                        fat: food.fat,
                        servingSize: 100,
                        isUserCreated: true,
                    })
                })
                store.setProp("searchFoodList", [...searchFoodList, ...searchUserFoodList])
            } else {
                console.tron.error(`Error fetching meals: ${JSON.stringify(response)}`, [])
            }
        },
        addDailyFood(value: {
            id: number,
            servingSize: number,
        }, mealType: TMealType, isUserCreated: boolean) {
            let food;
            if (isUserCreated) {
                food = store.userFoods.find((food) => {
                    const idFood = food.id.split("-")[1]
                    return +idFood === value.id
                })
            } else {
                food = store.foods.find((food) => {
                    const idFood = food.id.split("-")[1]
                    return +idFood === value.id
                })
            }
            action(() => {
                const dailyFood = DailyFoodModel.create({
                    id: food.id,
                    name: food.name,
                    calories: food.calories * value.servingSize / 100,
                    protein: food.protein * value.servingSize / 100,
                    carbohydrates: food.carbohydrates * value.servingSize / 100,
                    fat: food.fat * value.servingSize / 100,
                    servingSize: value.servingSize,
                    isUserCreated,
                });

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
                        break;
                }
            })();
        },

        addDailyMeal: (id: number, mealType: TMealType, isUserCreated: boolean) => {
            let meal;
            if (isUserCreated) {
                meal = store.userMeals.find((meal) => {
                    const idMeal = meal.id.split("-")[1]
                    return +idMeal === id
                })
            } else {
                meal = store.meals.find((meal) => {
                    const idMeal = meal.id.split("-")[1]
                    return +idMeal === id
                })
            }
            switch (mealType) {
                case "breakfast":
                    store.dailyMeals.addMealToBreakfast(meal);
                    break;
                case "lunch":
                    store.dailyMeals.addMealToLunch(meal);
                    break;
                case "dinner":
                    store.dailyMeals.addMealToDinner(meal);
                    break;
                case "snack":
                    store.dailyMeals.addMealToSnacks(meal);
                    break;
                default:
                    break;
            }
        },



        removeFood(food: DailyFood, screen: TScreen) {
            switch (screen) {
                case "breakfast":
                    const idFoodBreakfast = store.dailyMeals.breakfastFoods.map((item) => item.id)
                    const indexBreakfast = idFoodBreakfast.indexOf(food.id)
                    store.dailyMeals.breakfastFoods.splice(indexBreakfast, 1)
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
                    const idFoodBreakfast = store.dailyMeals.breakfastFoods.map((item) => item.id)
                    return idFoodBreakfast.includes(food.id)
                case "lunch":
                    const idFoodLunch = store.dailyMeals.lunchFoods.map((item) => item.id)
                    return idFoodLunch.includes(food.id)
                case "dinner":
                    const idFoodDinner = store.dailyMeals.dinnerFoods.map((item) => item.id)
                    return idFoodDinner.includes(food.id)
                case "snack":
                    const idFoodSnack = store.dailyMeals.snackFoods.map((item) => item.id)
                    return idFoodSnack.includes(food.id)
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
        isListSystemFoodsHaveId(id: number) {
            const idString = "SYSTEMFOOD-" + id;
            const idFoods = store.foods.map((item) => item.id)
            return idFoods.includes(idString)
        },
        isListUserFoodsHaveId(id: number) {
            const idString = "USERFOOD-" + id;
            const idFoods = store.userFoods.map((item) => item.id)
            return idFoods.includes(idString)
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
        clearDailyMeal() {
            store.dailyMeals.clearDailyMeals()
        },
        // hàm thực hiện convert thì food sang dailyFood đồng thời setProps dailyFoods
        convertArrFoodToDailyFood(arrFood: Food[], arrUserFood: Food[]) {
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
        },
        clearSearchFood() {
            store.searchFoodList.clear()
        },

    }))



export interface MealFoodStore extends Instance<typeof MealFoodStoreModel> { }
export interface MealFoodStoreSnapshot extends SnapshotOut<typeof MealFoodStoreModel> { }

// @demo remove-file
