import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const ExerciseModel = types
    .model("Exercise")
    .props({
        id: types.number,
        name: types.string,
        caloriesBurned: types.number,
        duration: types.number,
    })
    .views((exercise) => ({
        get caloriesBurnPerMinute() {
            return exercise.caloriesBurned / exercise.duration;
        },
        get nameEx() {
            return exercise.name;
        },
        get detailEx() {
            return exercise.caloriesBurned + " Kcal - " + exercise.duration + " phút";
        }
    }))


export interface Exercise extends Instance<typeof ExerciseModel> { }
export interface ExerciseSnapshotOut extends SnapshotOut<typeof ExerciseModel> { }
export interface ExerciseSnapshotIn extends SnapshotIn<typeof ExerciseModel> { }

