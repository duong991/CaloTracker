import checkInternetConnection from "./checkInternetConnection";
import { insertSyncQueueData, displaySyncQueueData, TableName, TAction, getServerId } from "../database/processSyncQueue";
import { checkNetworkAndSchedule } from "./schedule";
export interface ISyncToServer {
    databaseName: TableName;
    id: number;
    action: TAction;
    data: {
        id: number | null;
        record: object | null;
    };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const syncToServer = async (dataSync: ISyncToServer, funcCallApi) => {
    try {
        const isConnected = await checkInternetConnection();
        let response

        if (dataSync.databaseName !== "user_info") {
            dataSync.data.id = await getServerId(dataSync.databaseName, dataSync.id)
        }

        if (!isConnected) {
            insertSyncQueueData(dataSync.databaseName, dataSync.action, dataSync.data);
            checkNetworkAndSchedule();
            displaySyncQueueData();
            console.log("Không có kết nối internet");
            return;
        }

        if (dataSync.data.id === null && dataSync.data.record === null) {
            console.log('Hành động không hợp lệ');
            return;
        }

        if (dataSync.data.id === null) {
            response = await funcCallApi(dataSync.data.record);
        } else if (dataSync.data.record === null) {
            response = await funcCallApi(dataSync.data.id);
        } else {
            response = await funcCallApi(dataSync.data.id, dataSync.data.record);
        }

        console.log(response)

        if (response?.kind === "ok") {
            console.log("Đồng bộ dữ liệu lên server thành công");
        } else {
            insertSyncQueueData(dataSync.databaseName, dataSync.action, dataSync.data);
            displaySyncQueueData();
            console.log("Lỗi khi đồng bộ dữ liệu lên server");
        }
    } catch (error) {
        console.log("Lỗi xảy ra trong quá trình đồng bộ dữ liệu:", error);
    }
};

export default syncToServer;

