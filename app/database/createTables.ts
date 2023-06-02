import { db } from "./database-connection"

const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS foods (
        id INTEGER PRIMARY KEY ,
        serverId INTEGER, 
        name TEXT NOT NULL, 
        calories INTEGER NOT NULL, 
        protein REAL NOT NULL, 
        carbohydrates REAL NOT NULL, 
        fat REAL NOT NULL)`,
      [],
      () => {
        console.log(`Created foods table`)
      },
      (error): any => {
        console.log(`Error creating foods table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        serverId INTEGER, name TEXT NOT NULL, 
        calories REAL NOT NULL, 
        protein REAL NOT NULL, 
        carbohydrates REAL NOT NULL, 
        fat REAL NOT NULL)`,
      [],
      () => {
        console.log(`Created user_foods table`)
      },
      (error): any => {
        console.log(`Error creating user_foods table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        name TEXT NOT NULL, 
        description TEXT, 
        calories INTEGER NOT NULL, 
        protein REAL NOT NULL, 
        carbohydrates REAL NOT NULL, 
        fat REAL NOT NULL, 
        mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')))`,
      [],
      () => {
        console.log(`Created meals table`)
      },
      (error): any => {
        console.log(`Error creating meals table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        name TEXT NOT NULL, 
        description TEXT, 
        image BLOB, 
        calories INTEGER NOT NULL, 
        protein REAL NOT NULL, 
        carbohydrates REAL NOT NULL, 
        fat REAL NOT NULL, 
        mealType TEXT NOT NULL CHECK(mealType IN ('breakfast', 'lunch', 'dinner', 'snacks')))`,
      [],
      () => {
        console.log(`Created userMeal table`)
      },
      (error): any => {
        console.log(`Error creating userMeal table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Menus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        name TEXT NOT NULL, 
        description TEXT NOT NULL)`,
      [],
      () => {
        console.log(`Created menu table`)
      },
      (error): any => {
        console.log(`Error creating menu table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_menus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        name TEXT NOT NULL, 
        description TEXT NOT NULL)`,
      [],
      () => {
        console.log(`Created menu table`)
      },
      (error): any => {
        console.log(`Error creating userMenu table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS meal_foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        mealId INTEGER NOT NULL REFERENCES Meal(serverId), 
        foodId INTEGER NOT NULL REFERENCES Food(serverId), 
        servingSize INTEGER NOT NULL)`,
      [],
      () => {
        console.log(`Created MealFood table`)
      },
      (error): any => {
        console.log(`Error creating MealFood table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS meal_menus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        menuId INTEGER NOT NULL REFERENCES Menu(serverId),
        mealId INTEGER NOT NULL REFERENCES Meal(serverId));`,
      [],
      () => {
        console.log(`Created MealMenu table`)
      },
      (error): any => {
        console.log(`Error creating MealMenu table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_meal_foods (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        mealId INTEGER NOT NULL REFERENCES UserMeal(serverId), 
        foodId INTEGER REFERENCES Food(serverId), 
        userFoodId INTEGER REFERENCES UserFood(serverId), 
        servingSize INTEGER NOT NULL)`,
      [],
      () => {
        console.log(`Created user_meal_foods table`)
      },
      (error): any => {
        console.log(`Error creating user_meal_foods table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_meal_menus (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        menuId INTEGER NOT NULL REFERENCES UserMenu(serverId),
        mealId INTEGER REFERENCES Meal(serverId),
        userMealId INTEGER REFERENCES UserMeal(serverId)
      );`,
      [],
      () => {
        console.log(`Created user_meal_menus table`)
      },
      (error): any => {
        console.log(`Error creating user_meal_menus table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        name TEXT NOT NULL,
        caloriesBurned INTEGER NOT NULL,
        duration INTEGER NOT NULL
       );`,
      [],
      () => {
        console.log(`Created exercise table`)
      },
      (error): any => {
        console.log(`Error creating exercise table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_weight_histories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        date VARCHAR NOT NULL,
        weight FLOAT NOT NULL
      );`,
      [],
      () => {
        console.log(`Created user_weight_histories table`)
      },
      (error): any => {
        console.log(`Error creating user_weight_histories table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS water_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        date VARCHAR NOT NULL,
        amount FLOAT NOT NULL
      );`,
      [],
      () => {
        console.log(`Created water_logs table`)
      },
      (error): any => {
        console.log(`Error creating water_logs table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user_exercises (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        exerciseId INTEGER NOT NULL REFERENCES Exercise(serverId),
        date VARCHAR NOT NULL,
        duration INTEGER NOT NULL
      );`,
      [],
      () => {
        console.log(`Created user_exercises table`)
      },
      (error): any => {
        console.log(`Error creating user_exercises table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS daily_calos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER,
        totalCalo INTEGER NOT NULL,
        date VARCHAR NOT NULL
      );`,
      [],
      () => {
        console.log(`Created daily_calos table`)
      },
      (error): any => {
        console.log(`Error creating daily_calos table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS daily_calo_food_mappings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        serverId INTEGER, 
        dailyCaloId INTEGER NOT NULL REFERENCES DailyCalo(serverId), 
        foodId INTEGER REFERENCES Food(serverId), 
        userFoodId INTEGER REFERENCES UserFood(serverId), 
        mealId INTEGER NOT NULL REFERENCES Meal(serverId), 
        userMealId INTEGER REFERENCES UserMeal(serverId), 
        menuId INTEGER NOT NULL REFERENCES Menu(serverId), 
        userMenuId INTEGER REFERENCES UserMenu(serverId), 
        servingSize INTEGER)`,
      [],
      () => {
        console.log(`Created daily_calo_food_mappings table`)
      },
      (error): any => {
        console.log(`Error creating daily_calo_food_mappings table:`, error)
      },
    )

    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS SyncQueue (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tableName TEXT NOT NULL,
        action TEXT NOT NULL,
        data TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      )`,
      [],
      () => {
        console.log(`Created SyncQueue table`)
      },
      (error): any => {
        console.log(`Error creating SyncQueue table:`, error)
      },
    )
  })
}

export default createTables
