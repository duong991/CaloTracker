import { DatabaseConnection } from "./database-connection"
// DatabaseConnection
// const database = require("../assets/database.db")
// const db = await openDatabase(database)

const db = DatabaseConnection.getConnection()
const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Food (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL)",
      [],
      () => {
        console.log("Created food table")
      },
      (error) => {
        console.log("Error creating food table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userFood (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, calories REAL NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL)",
      [],
      () => {
        console.log("Created userFood table")
      },
      (error) => {
        console.log("Error creating userFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Meal (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, image BLOB, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')))",
      [],
      () => {
        console.log("Created meal table")
      },
      (error) => {
        console.log("Error creating meal table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMeal (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT, image BLOB, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')))",
      [],
      () => {
        console.log("Created userMeal table")
      },
      (error) => {
        console.log("Error creating userMeal table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Menu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL)",
      [],
      () => {
        console.log("Created menu table")
      },
      (error) => {
        console.log("Error creating menu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMenu (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, description TEXT NOT NULL)",
      [],
      () => {
        console.log("Created menu table")
      },
      (error) => {
        console.log("Error creating userMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS MealFood (id INTEGER PRIMARY KEY AUTOINCREMENT, mealId INTEGER NOT NULL REFERENCES Meal(id), foodId INTEGER NOT NULL REFERENCES Food(id), servingSize INTEGER NOT NULL)",
      [],
      () => {
        console.log("Created MealFood table")
      },
      (error) => {
        console.log("Error creating MealFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS MealMenu (id INTEGER PRIMARY KEY AUTOINCREMENT, menuId INTEGER NOT NULL REFERENCES Menu(id), mealId INTEGER NOT NULL REFERENCES Meal(id));",
      [],
      () => {
        console.log("Created MealMenu table")
      },
      (error) => {
        console.log("Error creating MealMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMealFood (id INTEGER PRIMARY KEY AUTOINCREMENT, mealId INTEGER NOT NULL REFERENCES UserMeal(id), foodId INTEGER REFERENCES Food(id), userFoodId INTEGER REFERENCES UserFood(id), servingSize INTEGER NOT NULL)",
      [],
      () => {
        console.log("Created userMealFood table")
      },
      (error) => {
        console.log("Error creating userMealFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMealMenu (id INTEGER PRIMARY KEY AUTOINCREMENT, menuId INTEGER NOT NULL REFERENCES UserMenu(id), mealId INTEGER REFERENCES Meal(id), userMealId INTEGER REFERENCES UserMeal(id))",
      [],
      () => {
        console.log("Created useMealMenu table")
      },
      (error) => {
        console.log("Error creating useMealMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Exercise (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, caloriesBurned INTEGER NOT NULL, duration INTEGER NOT NULL)",
      [],
      () => {
        console.log("Created exercise table")
      },
      (error) => {
        console.log("Error creating exercise table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS UserWeightHistory (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE NOT NULL, weight FLOAT NOT NULL)",
      [],
      () => {
        console.log("Created UserWeightHistory table")
      },
      (error) => {
        console.log("Error creating UserWeightHistory table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS WaterLog (id INTEGER PRIMARY KEY AUTOINCREMENT, date DATEONLY NOT NULL, amount FLOAT NOT NULL)",
      [],
      () => {
        console.log("Created WaterLog table")
      },
      (error) => {
        console.log("Error creating WaterLog table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS UserExercise (id INTEGER PRIMARY KEY AUTOINCREMENT, exerciseId INTEGER NOT NULL REFERENCES Exercise(id), date DATEONLY NOT NULL, duration INTEGER NOT NULL)",
      [],
      () => {
        console.log("Created UserExercise table")
      },
      (error) => {
        console.log("Error creating UserExercise table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DailyMenu (id INTEGER PRIMARY KEY AUTOINCREMENT,  menuId INTEGER NOT NULL REFERENCES Menu(id), userMenuId INTEGER NOT NULL REFERENCES UserMenu(id), date DATEONLY NOT NULL, note TEXT NOT NULL)",
      [],
      () => {
        console.log("Created DailyMenu table")
      },
      (error) => {
        console.log("Error creating DailyMenu table:", error)
      },
    )
    tx.executeSql("SELECT name FROM sqlite_master WHERE type='table'")
  })
}

export default createTables
