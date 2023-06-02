import * as SQLite from "expo-sqlite"

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
}

export const db = DatabaseConnection.getConnection()
