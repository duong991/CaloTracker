import { db } from "./database-connection"

const deleteTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Foods",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Food thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Food:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_foods",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userFood thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Meals",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Meal thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Meal:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_meals",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMeal thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMeal:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Menus",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Menu thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Menu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_menus",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMenu thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM meal_foods",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng MealFood thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng MealFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM meal_menus",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng MealMenu thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng MealMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_meal_foods",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMealFood thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMealFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_meal_menus",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMealMenu thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMealMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Exercises",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Exercise thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Exercise:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_weight_histories",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng UserWeightHistory thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng UserWeightHistory:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM water_logs",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng WaterLog thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng WaterLog:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM user_exercises",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng UserExercise thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng UserExercise:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM daily_calos",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng daily_calos thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng daily_calos:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM daily_calo_food_mappings",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng daily_calo_food_mappings thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng daily_calo_food_mappings:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM SyncQueue",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng SyncQueue thành công")
      },
      (error): any => {
        console.log("Lỗi khi xóa dữ liệu từ bảng SyncQueue:", error)
      },
    )
  })
}

export default deleteTables
