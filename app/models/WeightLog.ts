import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const WeightLogModel = types
    .model("WeightLog", {
        weight: types.number,
        date: types.string,
    })
    .actions(self => ({
        setWeight(weight: number) {
            self.weight = weight;
        },
        setDate(date: string) {
            self.date = date;
        },
    }));

export interface WeightLog extends Instance<typeof WeightLogModel> { }
export interface WeightLogSnapshotOut extends SnapshotOut<typeof WeightLogModel> { }
export interface WeightLogSnapshotIn extends SnapshotIn<typeof WeightLogModel> { }
