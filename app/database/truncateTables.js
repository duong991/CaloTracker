import { DatabaseConnection } from "./database-connection"

const db = DatabaseConnection.getConnection()

const truncateTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "TRUNCATE TABLE userFood, userFood, userMeal, userMenu, userMealFood, userMealMenu, UserWeightHistory, WaterLog, UserExercise, DailyMenu",
      [],
      () => {
        console.log("truncate table done")
      },
      (error) => {
        console.log("truncate table fail:", error)
      },
    )
  })
}

export default truncateTable
