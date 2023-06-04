import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ExerciseModel = types
    .model("Exercise")
    .props({
        id: types.number,
        name: types.string,
        caloriesBurn: types.number,
        duration: types.number,
    });

export interface Exercise extends Instance<typeof ExerciseModel> { }
export interface ExerciseSnapshotOut extends SnapshotOut<typeof ExerciseModel> { }
export interface ExerciseSnapshotIn extends SnapshotIn<typeof ExerciseModel> { }

