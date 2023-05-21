import { ApiFetchDataResponse } from "../services/api/api.types"
import { DatabaseConnection } from "./database-connection"

export const insertData = async (data: ApiFetchDataResponse) => {
  const db = DatabaseConnection.getConnection()

  try {
    await db.transaction(async (tx) => {
      // Chèn dữ liệu vào bảng userFoods
      const { userFoods } = data
      for (const userFood of userFoods) {
        const { id, name, calories, protein, carbohydrates, fat } = userFood
        await tx.executeSql(
          "INSERT INTO userFood (serverId, name, calories, protein, carbohydrates, fat, isSynced) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
          [id, name, calories, protein, carbohydrates, fat, true],
        )
      }

      // Chèn dữ liệu vào bảng userMealFoods
      const { userMealFoods } = data
      for (const userMealFood of userMealFoods) {
        const { id, mealId, foodId, servingSize } = userMealFood
        await tx.executeSql(
          "INSERT INTO userMealFood (serverId, mealId, foodId, servingSize, isSynced) VALUES (?, ?, ?, ?, ?)",
          [id, mealId, foodId, servingSize, true],
        )
      }

      // Chèn dữ liệu vào bảng userMeals
      const { userMeals } = data
      for (const userMeal of userMeals) {
        const { id, name, description, calories, protein, carbohydrates, fat, mealType } = userMeal
        await tx.executeSql(
          "INSERT INTO userMeals (serverId, name, description, calories, protein, carbohydrates, fat, mealType, isSynced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, name, description, calories, protein, carbohydrates, fat, mealType, true],
        )
      }

      // Chèn dữ liệu vào bảng userMealMenus
      const { userMealMenus } = data
      for (const userMealMenu of userMealMenus) {
        const { id, menuId, mealId } = userMealMenu
        await tx.executeSql(
          "INSERT INTO userMealMenus (serverId, menuId, mealId, isSynced) VALUES (?, ?, ?, ?)",
          [id, menuId, mealId, true],
        )
      }

      // Chèn dữ liệu vào bảng userMenus
      const { userMenus } = data
      for (const userMenu of userMenus) {
        const { id, name, description } = userMenu
        await tx.executeSql(
          "INSERT INTO userMenus (serverId, name, description, isSynced) VALUES (?, ?, ?, ?)",
          [id, name, description, true],
        )
      }

      // Chèn dữ liệu vào bảng foods
      const { foods } = data
      for (const food of foods) {
        const { id, name, calories, protein, carbohydrates, fat } = food
        await tx.executeSql(
          "INSERT INTO foods ( serverId, name, calories, protein, carbohydrates, fat, isSynced) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
          [id, name, calories, protein, carbohydrates, fat, true],
        )
      }

      // Chèn dữ liệu vào bảng mealFoods
      const { mealFoods } = data
      for (const mealFood of mealFoods) {
        const { id, mealId, foodId, servingSize } = mealFood
        await tx.executeSql(
          "INSERT INTO mealFoods (serverId, mealId, foodId, servingSize, isSynced) VALUES (?, ?, ?, ?, ?)",
          [id, mealId, foodId, servingSize, true],
        )
      }

      // Chèn dữ liệu vào bảng meals
      const { meals } = data
      for (const meal of meals) {
        const { id, name, description, calories, protein, carbohydrates, fat, mealType } = meal
        await tx.executeSql(
          "INSERT INTO meals (serverId, name, description, calories, protein, carbohydrates, fat, mealType, isSynced) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [id, name, description, calories, protein, carbohydrates, fat, mealType, true],
        )
      }

      // Chèn dữ liệu vào bảng mealMenus
      const { mealMenus } = data
      for (const mealMenu of mealMenus) {
        const { id, menuId, mealId } = mealMenu
        await tx.executeSql(
          "INSERT INTO mealMenus (serverId, menuId, mealId, isSynced) VALUES (?, ?, ?, ?)",
          [id, menuId, mealId, true],
        )
      }

      // Chèn dữ liệu vào bảng menus
      const { menus } = data
      for (const menu of menus) {
        const { id, name, description } = menu
        await tx.executeSql(
          "INSERT INTO menus (serverId, name, description, isSynced) VALUES (?, ?, ?, ?)",
          [id, name, description, true],
        )
      }

      // Chèn dữ liệu vào bảng exercises
      const { exercises } = data
      for (const exercise of exercises) {
        const { id, name, caloriesBurned, duration } = exercise
        await tx.executeSql(
          "INSERT INTO exercises (serverId, name, caloriesBurned, duration, isSynced) VALUES (?, ?, ?, ?, ?)",
          [id, name, caloriesBurned, duration, true],
        )
      }

      // Chèn dữ liệu vào bảng userExercise
      const { userExercise } = data
      for (const userExr of userExercise) {
        const { id, exerciseId, date, duration } = userExr
        await tx.executeSql(
          "INSERT INTO userExercise (serverId, exerciseId, date, duration, isSynced) VALUES (?, ?, ?, ?, ?)",
          [id, exerciseId, date, duration, true],
        )
      }

      // Chèn dữ liệu vào bảng waterLogs
      const { waterLogs } = data
      for (const waterLog of waterLogs) {
        const { id, date, amount } = waterLog
        await tx.executeSql(
          "INSERT INTO waterLogs (serverId, date, amount, isSynced) VALUES (?, ?, ?, ?)",
          [id, date, amount, true],
        )
      }

      // Chèn dữ liệu vào bảng userWeightHistories
      const { userWeightHistories } = data
      for (const userWeightHistory of userWeightHistories) {
        const { id, date, weight } = userWeightHistory
        await tx.executeSql(
          "INSERT INTO userWeightHistories (serverId, date, weight, isSynced) VALUES (?, ?, ?, ?)",
          [id, date, weight, true],
        )
      }

      // Chèn dữ liệu vào bảng dailyCalos
      const { dailyCalos } = data
      for (const dailyCalo of dailyCalos) {
        const { id, date, totalCalo } = dailyCalo
        await tx.executeSql(
          "INSERT INTO dailyCalos (serverId, totalCalo,date, isSynced) VALUES (?, ?, ?, ?)",
          [id, totalCalo, date, true],
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
        await tx.executeSql(
          "INSERT INTO dailyCaloFoodMapping (serverId, dailyCaloId, foodId, userFoodId, mealId, userMealId, menuId, userMenuId servingSize, isSynced) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,? ,?)",
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
            true,
          ],
        )
      }
    })
    console.log("Chèn dữ liệu thành công")
  } catch (error) {
    console.log("Lỗi khi chèn dữ liệu:", error)
  }
}
