import { db } from "./database-connection"

export const insertOrUpdateWaterLogTable = async (chuoiNgayThang: string, amount: number) => {
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM water_logs WHERE date = ?", [chuoiNgayThang], (tx, results) => {
            if (results.rows.length === 0) {
                tx.executeSql(
                    "Insert into water_logs(date, amount) VALUES (?,?)",
                    [chuoiNgayThang, amount],
                    (tx, results) => {
                        console.log("Results", results.rowsAffected)
                    },
                )
            } else {
                tx.executeSql(
                    "UPDATE water_logs SET amount = ? WHERE date = ?",
                    [amount, chuoiNgayThang],
                    (tx, results) => {
                        console.log("Results", results.rowsAffected)
                    },
                )
            }
        })
    })
}