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
                const exerciseData = response.exercises.map((exercise) => ({
                    ...exercise,
                    id: exercise.id,
                    name: exercise.name,
                    caloriesBurned: exercise.caloriesBurned || 0,
                    duration: exercise.duration || 0,
                }))
                exerciseData.sort((a, b) => {
                    const nameA = a.name.toUpperCase(); // Chuyển tên thành chữ hoa để so sánh
                    const nameB = b.name.toUpperCase();

                    if (nameA < nameB) {
                        return -1; // a đứng trước b trong sắp xếp
                    }
                    if (nameA > nameB) {
                        return 1; // a đứng sau b trong sắp xếp
                    }
                    return 0; // Tên bằng nhau
                });
                self.setProp("exercises", exerciseData)
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
    }))
    .views((store) => ({
        get exercisesForList() {
            return store.exercises
        },

    }))

export interface ExerciseStore extends Instance<typeof ExerciseStoreModel> { }
export interface ExerciseStoreSnapshot extends SnapshotOut<typeof ExerciseStoreModel> { }
