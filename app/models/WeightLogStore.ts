import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { weightLogApi } from "../services/api"
import { WeightLogModel } from "./WeightLog";


export const WeightLogStoreModel = types
    .model("WeightLogStore", {
        weightLogs: types.array(WeightLogModel),
        dates: types.array(types.Date),
        weights: types.array(types.number),
    })
    .views(self => ({
        get weightLogCount() {
            return self.weightLogs.length;
        },
        get weightLogList() {
            return self.weightLogs;
        },
        get weightLogDates() {
            return self.dates.map(date => {
                const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
                return formattedDate;
            });
        },
        get weightLogWeights() {
            return self.weights;
        }

    }))
    .actions(withSetPropAction)
    .actions(self => ({
        addWeightLog(weight: number, date: Date) {
            const newWeightLog = WeightLogModel.create({ weight, date });
            self.weightLogs.push(newWeightLog);
        },
        removeWeightLog(index: number) {
            self.weightLogs.splice(index, 1);
        },
        updateWeightLog(index: number, weight: number, date: Date) {
            self.weightLogs[index].setWeight(weight);
            self.weightLogs[index].setDate(date);
        },
        async fetchWeightLogs() {
            const response = await weightLogApi.getWeightLogAll()
            if (response.kind === "ok") {
                const transformedWeightLogs = response.weightLogs.map((log) => ({
                    ...log,
                    date: new Date(log.date), // Chuyển đổi trường date thành kiểu Date
                }));
                const sortedWeightLogs = transformedWeightLogs.sort((a, b) => a.date.getTime() - b.date.getTime());
                self.setProp("weightLogs", sortedWeightLogs)
                self.setProp("dates", sortedWeightLogs.map(log => log.date))
                self.setProp("weights", sortedWeightLogs.map(log => log.weight))
            } else {
                console.tron.error(`Error fetching weightLogs: ${JSON.stringify(response)}`, [])
            }
        },
    }));

export interface WeightLogStore extends Instance<typeof WeightLogStoreModel> { }
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof WeightLogStoreModel> { }