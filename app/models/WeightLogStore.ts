import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { weightLogApi } from "../services/api"
import { WeightLogModel } from "./WeightLog";


export const WeightLogStoreModel = types
    .model("WeightLogStore", {
        weightLogs: types.array(WeightLogModel),
    })
    .actions(withSetPropAction)
    .actions(self => ({
        addWeightLog(weight: number, date: string) {
            const newWeightLog = WeightLogModel.create({ weight, date });
            self.weightLogs.push(newWeightLog);
        },
        removeWeightLog(index: number) {
            self.weightLogs.splice(index, 1);
        },
        updateWeightLog(index: number, weight: number, date: string) {
            self.weightLogs[index].setWeight(weight);
            self.weightLogs[index].setDate(date);
        },
        async fetchWeightLogs() {
            const response = await weightLogApi.getWeightLogAll()
            if (response.kind === "ok") {
                self.setProp("weightLogs", response.weightLogs)
            } else {
                console.tron.error(`Error fetching weightLogs: ${JSON.stringify(response)}`, [])
            }
        },
    }));

export interface WeightLogStore extends Instance<typeof WeightLogStoreModel> { }
export interface EpisodeStoreSnapshot extends SnapshotOut<typeof WeightLogStoreModel> { }