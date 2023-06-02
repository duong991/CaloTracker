import { ApiFetchDataResponse } from "../services/api/api.types"
import { db } from "./database-connection"

export const insertData = async (data: ApiFetchDataResponse) => {
  try {
    db.transaction(async (tx) => {
      // Chèn dữ liệu vào bảng exercises
      const { exercises } = data
      for (const exercise of exercises) {
        const { id, name, caloriesBurned, duration } = exercise
        tx.executeSql(
          "INSERT INTO exercises (serverId, name, caloriesBurned, duration) VALUES (?, ?, ?, ?)",
          [id, name, caloriesBurned, duration],
        )
      }

      // Chèn dữ liệu vào bảng userFoods
      const { userFoods } = data
      for (const userFood of userFoods) {
        const { id, name, calories, protein, carbohydrates, fat } = userFood
        tx.executeSql(
          "INSERT INTO user_foods (serverId, name, calories, protein, carbohydrates, fat) VALUES ( ?, ?, ?, ?, ?, ?)",
          [id, name, calories, protein, carbohydrates, fat],
        )
      }

      // Chèn dữ liệu vào bảng userMealFoods
      const { userMealFoods } = data
      for (const userMealFood of userMealFoods) {
        const { id, mealId, foodId, servingSize } = userMealFood
        tx.executeSql(
          "INSERT INTO user_meal_foods (serverId, mealId, foodId, servingSize) VALUES (?, ?, ?, ?)",
          [id, mealId, foodId, servingSize],
        )
      }

      // Chèn dữ liệu vào bảng userMeals
      const { userMeals } = data
      for (const userMeal of userMeals) {
        const { id, name, description, calories, protein, carbohydrates, fat, mealType } = userMeal
        tx.executeSql(
          "INSERT INTO user_meals (serverId, name, description, calories, protein, carbohydrates, fat, mealType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [id, name, description, calories, protein, carbohydrates, fat, mealType],
        )
      }

      // Chèn dữ liệu vào bảng userMealMenus
      const { userMealMenus } = data
      for (const userMealMenu of userMealMenus) {
        const { id, menuId, mealId, userMealId } = userMealMenu
        tx.executeSql(
          "INSERT INTO user_meal_menus (serverId, menuId, mealId, userMealId) VALUES (?, ?, ?)",
          [id, menuId, mealId, userMealId],
        )
      }

      // Chèn dữ liệu vào bảng userMenus
      const { userMenus } = data
      for (const userMenu of userMenus) {
        const { id, name, description } = userMenu
        tx.executeSql(
          "INSERT INTO user_menus (serverId, name, description) VALUES (?, ?, ?)",
          [id, name, description],
        )
      }

      // Chèn dữ liệu vào bảng foods
      const { foods } = data
      for (const food of foods) {
        const { id, name, calories, protein, carbohydrates, fat } = food
        tx.executeSql(
          "INSERT INTO foods ( serverId, name, calories, protein, carbohydrates, fat) VALUES ( ?, ?, ?, ?, ?, ?)",
          [id, name, calories, protein, carbohydrates, fat],
        )
      }


      // Chèn dữ liệu vào bảng mealFoods
      const { mealFoods } = data
      for (const mealFood of mealFoods) {
        const { id, mealId, foodId, servingSize } = mealFood
        tx.executeSql(
          "INSERT INTO meal_foods (serverId, mealId, foodId, servingSize) VALUES (?, ?, ?, ?)",
          [id, mealId, foodId, servingSize],
        )
      }

      // Chèn dữ liệu vào bảng meals
      const { meals } = data
      for (const meal of meals) {
        const { id, name, description, calories, protein, carbohydrates, fat, mealType } = meal
        tx.executeSql(
          "INSERT INTO meals (serverId, name, description, calories, protein, carbohydrates, fat, mealType) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [id, name, description, calories, protein, carbohydrates, fat, mealType],
        )
      }

      // Chèn dữ liệu vào bảng mealMenus
      const { mealMenus } = data
      for (const mealMenu of mealMenus) {
        const { id, menuId, mealId } = mealMenu
        tx.executeSql(
          "INSERT INTO meal_menus (serverId, menuId, mealId) VALUES (?, ?, ?)",
          [id, menuId, mealId],
        )
      }

      // Chèn dữ liệu vào bảng menus
      const { menus } = data
      for (const menu of menus) {
        const { id, name, description } = menu
        tx.executeSql(
          "INSERT INTO menus (serverId, name, description) VALUES (?, ?, ?)",
          [id, name, description],
        )
      }



      // Chèn dữ liệu vào bảng userExercise
      const { userExercise } = data
      for (const userExr of userExercise) {
        const { id, exerciseId, date, duration } = userExr
        tx.executeSql(
          "INSERT INTO user_exercises (serverId, exerciseId, date, duration) VALUES (?, ?, ?, ?)",
          [id, exerciseId, date, duration],
        )
      }

      // Chèn dữ liệu vào bảng waterLogs
      const { waterLogs } = data
      for (const waterLog of waterLogs) {
        const { id, date, amount } = waterLog
        tx.executeSql(
          "INSERT INTO water_logs (serverId, date, amount) VALUES (?, ?, ?)",
          [id, date, amount],
        )
      }

      // Chèn dữ liệu vào bảng userWeightHistories
      const { userWeightHistories } = data
      for (const userWeightHistory of userWeightHistories) {
        const { id, date, weight } = userWeightHistory
        tx.executeSql(
          "INSERT INTO user_weight_histories (serverId, date, weight) VALUES (?, ?, ?)",
          [id, date, weight],
        )
      }

      // Chèn dữ liệu vào bảng dailyCalos
      const { dailyCalos } = data
      for (const dailyCalo of dailyCalos) {
        const { id, date, totalCalo } = dailyCalo
        tx.executeSql(
          "INSERT INTO daily_calos (serverId, totalCalo,date) VALUES (?, ?, ?)",
          [id, totalCalo, date],
        )
      }

      // Chèn dữ liệu vào bảng dailyCaloFoodMapping
      const { dailyCaloFoodMapping } = data
      for (const caloFoodMapping of dailyCaloFoodMapping) {
        const {
          id,
          dailyCaloId,
          foodId,
          userFoodId,
          mealId,
          userMealId,
          menuId,
          userMenuId,
          servingSize,
        } = caloFoodMapping
        tx.executeSql(
          "INSERT INTO daily_calo_food_mappings (serverId, dailyCaloId, foodId, userFoodId, mealId, userMealId, menuId, userMenuId,servingSize) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,?)",
          [
            id,
            dailyCaloId,
            foodId,
            userFoodId,
            mealId,
            userMealId,
            menuId,
            userMenuId,
            servingSize,
          ],
        )
      }
    })
    console.log("Chèn dữ liệu thành công")

  } catch (error) {
    console.log("Lỗi khi chèn dữ liệu:", error)
  }
}


