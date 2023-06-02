import { db } from "./database-connection"

const findAllInfoFromTable = (tableName) => {
  try {
    const query = `SELECT * FROM ${tableName}`
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    db.transaction((tx) => {
      tx.executeSql(
        query,
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            console.log(`Dữ liệu trong bảng ${tableName} _findAllInfoFromTable:`)
            return results.rows._array
          } else {
            console.log(`Bảng ${tableName} không có dữ liệu _findAllInfoFromTable.`)
            return []
          }
        },
        (error) => error,
      )
    })
  } catch (error) {
    console.error("Lỗi khi truy vấn dữ liệu:", error)
    return []
  }
}

export default findAllInfoFromTable
