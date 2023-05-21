import { DatabaseConnection } from "./database-connection"

const db = DatabaseConnection.getConnection()
const deleteTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Food",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Food thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Food:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM userFood",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userFood thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Meal",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Meal thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Meal:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM userMeal",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMeal thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMeal:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Menu",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Menu thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Menu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM userMenu",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMenu thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM MealFood",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng MealFood thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng MealFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM MealMenu",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng MealMenu thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng MealMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM userMealFood",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMealFood thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMealFood:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM userMealMenu",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng userMealMenu thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng userMealMenu:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM Exercise",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng Exercise thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng Exercise:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM UserWeightHistory",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng UserWeightHistory thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng UserWeightHistory:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM WaterLog",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng WaterLog thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng WaterLog:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM UserExercise",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng UserExercise thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng UserExercise:", error)
      },
    )

    tx.executeSql(
      "DELETE FROM DailyMenu",
      [],
      () => {
        console.log("Xóa dữ liệu từ bảng DailyMenu thành công")
      },
      (error) => {
        console.log("Lỗi khi xóa dữ liệu từ bảng DailyMenu:", error)
      },
    )
  })
}

export default deleteTables
