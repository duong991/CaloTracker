import * as SQLite from "expo-sqlite"

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
}

// export async function openDatabase(pathToDatabaseFile) {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite")).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "SQLite")
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + "SQLite/database.db",
//   )
//   return SQLite.openDatabase("database.db")
// }
