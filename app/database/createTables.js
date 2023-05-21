import { DatabaseConnection } from "./database-connection"

const db = DatabaseConnection.getConnection()
const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Food (id INTEGER PRIMARY KEY ,serverId INTEGER, name TEXT NOT NULL, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created food table")
      },
      (error) => {
        console.log("Error creating food table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userFood (id INTEGER PRIMARY KEY AUTOINCREMENT, serverId INTEGER, name TEXT NOT NULL, calories REAL NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created userFood table")
      },
      (error) => {
        console.log("Error creating userFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Meal (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, name TEXT NOT NULL, description TEXT, image BLOB, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')), isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created meal table")
      },
      (error) => {
        console.log("Error creating meal table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMeal (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, name TEXT NOT NULL, description TEXT, image BLOB, calories INTEGER NOT NULL, protein REAL NOT NULL, carbohydrates REAL NOT NULL, fat REAL NOT NULL, mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')), isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created userMeal table")
      },
      (error) => {
        console.log("Error creating userMeal table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Menu (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, name TEXT NOT NULL, description TEXT NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created menu table")
      },
      (error) => {
        console.log("Error creating menu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMenu (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, name TEXT NOT NULL, description TEXT NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created menu table")
      },
      (error) => {
        console.log("Error creating userMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS MealFood (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, mealId INTEGER NOT NULL REFERENCES Meal(serverId), foodId INTEGER NOT NULL REFERENCES Food(serverId), servingSize INTEGER NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created MealFood table")
      },
      (error) => {
        console.log("Error creating MealFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS MealMenu (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, menuId INTEGER NOT NULL REFERENCES Menu(serverId), mealId INTEGER NOT NULL REFERENCES Meal(serverId), isSynced BOOLEAN DEFAULT false);",
      [],
      () => {
        console.log("Created MealMenu table")
      },
      (error) => {
        console.log("Error creating MealMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMealFood (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, mealId INTEGER NOT NULL REFERENCES UserMeal(serverId), foodId INTEGER REFERENCES Food(serverId), userFoodId INTEGER REFERENCES UserFood(serverId), servingSize INTEGER NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created userMealFood table")
      },
      (error) => {
        console.log("Error creating userMealFood table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS userMealMenu (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, menuId INTEGER NOT NULL REFERENCES UserMenu(serverId), mealId INTEGER REFERENCES Meal(serverId), userMealId INTEGER REFERENCES UserMeal(serverId), isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created useMealMenu table")
      },
      (error) => {
        console.log("Error creating useMealMenu table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Exercise (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, name TEXT NOT NULL, caloriesBurned INTEGER NOT NULL, duration INTEGER NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created exercise table")
      },
      (error) => {
        console.log("Error creating exercise table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS UserWeightHistory (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, date DATE NOT NULL, weight FLOAT NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created UserWeightHistory table")
      },
      (error) => {
        console.log("Error creating UserWeightHistory table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS WaterLog (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, date DATEONLY NOT NULL, amount FLOAT NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created WaterLog table")
      },
      (error) => {
        console.log("Error creating WaterLog table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS UserExercise (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, exerciseId INTEGER NOT NULL REFERENCES Exercise(serverId), date DATEONLY NOT NULL, duration INTEGER NOT NULL, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created UserExercise table")
      },
      (error) => {
        console.log("Error creating UserExercise table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DailyCalo (id INTEGER PRIMARY KEY AUTOINCREMENT, serverId INTEGER, totalCalo INTEGER NOT NULL, date DATEONLY NOT NULL, isSynced BOOLEAN DEFAULT false);",
      [],
      () => {
        console.log("Created DailyCalo table")
      },
      (error) => {
        console.log("Error creating DailyCalo table:", error)
      },
    )

    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS DailyCaloFoodMappings (id INTEGER PRIMARY KEY AUTOINCREMENT,serverId INTEGER, dailyCaloId INTEGER NOT NULL REFERENCES DailyCalo(serverId), foodId INTEGER REFERENCES Food(serverId), userFoodId INTEGER REFERENCES UserFood(serverId), mealId INTEGER NOT NULL REFERENCES Meal(serverId), userMealId INTEGER REFERENCES UserMeal(serverId), menuId INTEGER NOT NULL REFERENCES Menu(serverId), userMenuId INTEGER REFERENCES UserMenu(serverId), servingSize INTEGER, isSynced BOOLEAN DEFAULT false)",
      [],
      () => {
        console.log("Created DailyCaloFoodMappings table")
      },
      (error) => {
        console.log("Error creating DailyCaloFoodMappings table:", error)
      },
    )
  })
}

export default createTables
