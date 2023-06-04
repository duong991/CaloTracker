/* eslint-disable @typescript-eslint/no-unused-vars */
import { FoodApi, MealApi, WaterLogApi, api } from "app/services/api";
import { DatabaseConnection } from "./database-connection"
import { GeneralApiProblem } from "app/services/api/apiProblem";

export type TableName = "user_foods" | "user_meals" | "water_logs" | "user_info";
export type TAction = "create" | "update" | "delete";
type TData = {
    id: number | null;
    record: object;
};
const db = DatabaseConnection.getConnection()
const foodApi = new FoodApi(api);
const mealApi = new MealApi(api);
const waterLogApi = new WaterLogApi(api);

const tableApiMap = {
    user_foods: {
        create: foodApi.createFood,
        update: foodApi.updateFood,
        delete: foodApi.deleteFood
    },
    user_meals: {
        create: mealApi.createMeal,
        update: mealApi.updateMeal,
        delete: mealApi.deleteMeal
    },
    water_logs: {
        create: waterLogApi.createWaterLog,
        update: waterLogApi.updateWaterLog,
        delete: waterLogApi.deleteWaterLog
    },
    user_info: {
        create: api.createUserInfo,
        update: api.updateUserInfo,
    }
};

function getApiByTableNameAndAction(
    tableName: TableName,
    action: TAction
): any {
    const tableApi = tableApiMap[tableName];

    if (!tableApi) {
        console.log('Bảng không hợp lệ');
        return undefined;
    }

    const api = tableApi[action];

    if (!api) {
        console.log('Hành động không hợp lệ');
        return undefined;
    }

    switch (tableName) {
        case "user_foods":
            return api.bind(foodApi);
        case "user_meals":
            return api.bind(mealApi);
        case "water_logs":
            return api.bind(waterLogApi);
        case "user_info":
            return api.bind(api);
        default:
            return api.bind(api);
    }
}

export const syncQueueData = () => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "SELECT * FROM SyncQueue",
            [],
            async (tx, results) => {
                if (results.rows.length === 0) return;
                for (let i = 0; i < results.rows.length; ++i) {
                    const item = results.rows.item(i);
                    // lấy ra tableName, action
                    const tableName: TableName = item.tableName;
                    const action: TAction = item.action;

                    // lấy ra record_ các sự thay đổi của bản ghi
                    const data = JSON.parse(item.data);
                    const record = data.record;
                    console.log("record: ", record);
                    const api = getApiByTableNameAndAction(tableName, action);

                    if (!api) {
                        console.log('Không tìm thấy api');
                        return;
                    }
                    let response: GeneralApiProblem | { kind: "ok"; data: string };
                    if (action === "create") {
                        response = await api(record);
                    } else if (action === "update") {
                        if (tableName === "user_info") {
                            response = await api(record);
                        } else {
                            const idServer = data.id;
                            response = await api(idServer, record);
                        }
                    } else if (action === "delete") {
                        const idServer = data.id;
                        response = await api(idServer);
                    } else {
                        console.log('Hành động không hợp lệ');
                        continue;
                    }
                    console.log("response: ", response);
                    if (response.kind === "ok") {
                        deleteSyncQueueData(item.id);
                        displaySyncQueueData();
                    }
                }
            }
        );
    });
};


export const deleteSyncQueueData = (id: number) => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "DELETE FROM SyncQueue WHERE id = ?",
            [id],
            async (tx, results) => {
                console.log('Xóa thành công');
            }
        )
    })
}

export const insertSyncQueueData = async (tableName: TableName, action: TAction, data: TData) => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "INSERT INTO SyncQueue (tableName, action, data) VALUES (?, ?, ?)",
            [tableName, action, JSON.stringify({ id: data.id, record: data.record })],
            async (tx, results) => {
                console.log('Thêm thành công');
            }
        )
    })
}

export const updateSyncQueueData = (id: number, tableName: string, action: TAction, data: Record<string, unknown>) => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "UPDATE SyncQueue SET tableName = ?, action = ?, data = ? WHERE id = ?",
            [tableName, action, JSON.stringify(data), id],
            async (tx, results) => {
                console.log('Cập nhật thành công');
            }
        )
    }
    )
}

export const displaySyncQueueData = () => {
    db.transaction(async (tx) => {
        await tx.executeSql(
            "SELECT * FROM SyncQueue",
            [],
            async (tx, results) => {
                console.log('Query completed');
                const len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    const row = results.rows.item(i);
                    console.log(`Id: ${row.id}, tableName: ${row.tableName}, action: ${row.action}, data: ${row.data}`);
                }
            }
        )
    })
}

export const getServerId = (tableName: TableName, id: number) => {
    return new Promise<number | undefined>((resolve, reject) => {
        db.transaction(async (tx) => {
            await tx.executeSql(
                "SELECT idServer FROM " + tableName + " WHERE id = ?",
                [id],
                async (tx, results) => {
                    if (results.rows.length === 0) {
                        resolve(undefined);
                    } else {
                        resolve(+results.rows.item(0).idServer);
                    }
                }
            )
        })
    })
}