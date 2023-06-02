import NetInfo from "@react-native-community/netinfo"
import { syncQueueData, displaySyncQueueData } from "../database/processSyncQueue"
// import { Alert } from "react-native";

let syncInterval
const scheduleSyncQueueTask = () => {
    const interval = 0.5 * 60 * 1000; // 15 phút expressed in milliseconds
    syncInterval = setInterval(() => {
        syncQueueData();
    }, interval);
};

export const checkNetworkAndSchedule = () => {
    displaySyncQueueData();
    NetInfo.fetch().then((state) => {
        if (state.isConnected) {
            // Xử lý khi có kết nối mạng
            console.log("Lập lịch đồng bộ dữ liệu");
            scheduleSyncQueueTask();
        } else {
            // Xử lý khi không có kết nối mạng
            console.log("Không có kết nối mạng");
        }
    });
};

export const cancelSyncQueueTask = () => {
    clearInterval(syncInterval);
};
