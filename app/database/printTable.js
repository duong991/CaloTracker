// // import { DatabaseConnection } from "./database-connection"

// // const db = DatabaseConnection.getConnection()

// // const printTableData = () => {
// //     try {
// //         const tables = [
// //             "Foods",
// //             "exercises",
// //             "user_foods",
// //             "meals",
// //             "user_meals",
// //             "Menus",
// //             "user_menus",
// //             "meal_foods",
// //             "meal_menus",
// //             "user_meal_foods",
// //             "user_meal_menus",
// //             "user_weight_histories",
// //             "water_logs",
// //             "user_exercises",
// //             "daily_calos",
// //             "daily_calo_food_mappings",
// //             "SyncQueue"
// //         ]

// //         for (let i = 0; i < tables.length; i++) {
// //             const query = `SELECT * FROM ${tables[i]}`
// //             // eslint-disable-next-line @typescript-eslint/no-unused-vars
// //             db.transaction((tx) => {
// //                 tx.executeSql(
// //                     query,
// //                     [],
// //                     (tx, results) => {
// //                         console.log(`${tables[i]}:`, results, query);
// //                         if (results.rows.length > 0) {
// //                             console.log(`Dữ liệu trong bảng ${tables[i]}:`)
// //                             console.log(results.rows._array)
// //                         } else {
// //                             console.log(`Bảng ${tables[i]} không có dữ liệu.`)
// //                         }
// //                     },
// //                     (error): any => (error)
// //                 );
// //             });
// //         }
// //         // if (results.rows.length > 0) {
// //         //     console.log(`Dữ liệu trong bảng ${tables[i]}:`)
// //         //     console.log(results.rows._array)
// //         // } else {
// //         //     console.log(`Bảng ${tables[i]} không có dữ liệu.`)
// //         // }
// //     } catch (error) {
// //         console.log("Lỗi khi truy vấn dữ liệu:", error)
// //     }
// // }

// // export default printTableData;

// import { DatabaseConnection } from "./database-connection"

// const db = DatabaseConnection.getConnection()

// const printTableData = async () => {
//   try {
//     const tables = [
//       "exercises",
//       "Foods",
//       "user_foods",
//       "meals",
//       "user_meals",
//       "Menus",
//       "user_menus",
//       "meal_foods",
//       "meal_menus",
//       "user_meal_foods",
//       "user_meal_menus",
//       "user_weight_histories",
//       "water_logs",
//       "user_exercises",
//       "daily_calos",
//       "daily_calo_food_mappings",
//       "SyncQueue",
//     ]

//     const queryTable = async (table) => {
//       const query = `SELECT * FROM ${table}`
//       return new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             query,
//             [],
//             (_, results) => resolve(results),
//             (error) => reject(error),
//           )
//         })
//       })
//     }

//     const printData = async () => {
//       if (tables.length > 0) {
//         const table = tables.shift()
//         console.log(`${table}:`)
//         try {
//           const results = await queryTable(table)
//           if (results.rows.length > 0) {
//             console.log(`Dữ liệu trong bảng ${table}:`)
//             console.log(results.rows._array)
//           } else {
//             console.log(`Bảng ${table} không có dữ liệu.`)
//           }
//         } catch (error) {
//           console.log(`Lỗi khi truy vấn dữ liệu từ bảng ${table}:`, error)
//         }
//         await printData()
//       }
//     }

//     await printData()
//   } catch (error) {
//     console.log("Lỗi khi truy vấn dữ liệu:", error)
//   }
// }

// export default printTableData
