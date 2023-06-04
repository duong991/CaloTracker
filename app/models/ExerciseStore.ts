import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { ExerciseModel } from "./Exercise";
import { exerciseApi } from "app/services/api";
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ExerciseStoreModel = types
    .model("ExerciseStore")
    .props({
        exercises: types.array(ExerciseModel),
        selectedExercises: types.array(types.reference(ExerciseModel)),
    })
    .actions(withSetPropAction)
    .actions((self) => ({
        async fetchExercises() {
            const response = await exerciseApi.getExercises()
            if (response.kind === "ok") {
                self.setProp("exercises", response.exercises)
            } else {
                console.tron.error(`Error fetching exercises: ${JSON.stringify(response)}`, [])
            }
        },
        addExercise(exercise) {
            self.selectedExercises.push(exercise);
        },
        removeExercise(exercise) {
            self.selectedExercises.remove(exercise);
        },
    }));

export interface ExerciseStore extends Instance<typeof ExerciseStoreModel> { }
export interface ExerciseStoreSnapshot extends SnapshotOut<typeof ExerciseStoreModel> { }
