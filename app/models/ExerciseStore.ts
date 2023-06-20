import { types, Instance, SnapshotOut } from "mobx-state-tree";
import { ExerciseModel, Exercise } from "./Exercise";
import { exerciseApi } from "app/services/api";
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ExerciseStoreModel = types
    .model("ExerciseStore")
    .props({
        exercises: types.array(ExerciseModel),
        selectedExercises: types.array(types.reference(ExerciseModel)),
    })
    .views((store) => ({
        get exercisesForList() {
            return store.exercises
        },

        get exercisesSelectedForList() {
            return store.selectedExercises
        },
        get totalCaloriesBurn() {
            return store.selectedExercises.reduce((total, exercise) => total + exercise.caloriesBurned, 0)
        },

        hasSelected(exercise: Exercise) {
            return store.selectedExercises.includes(exercise)
        },

    }))
    .actions(withSetPropAction)
    .actions((store) => ({
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
                store.setProp("exercises", exerciseData)
            } else {
                console.tron.error(`Error fetching exercises: ${JSON.stringify(response)}`, [])
            }
        },
        addExercise(exercise: Exercise) {
            if (store.selectedExercises.find((f) => f.id === exercise.id)) {
                return
            }
            store.selectedExercises.push(exercise);
        },
        removeExercise(exercise: Exercise) {
            store.selectedExercises.remove(exercise);
        },
        clearExercise() {
            store.selectedExercises.clear();
        }

    }))
    .actions((store) => ({
        toggleSelected(exercise: Exercise) {
            if (store.hasSelected(exercise)) {
                store.removeExercise(exercise)
            } else {
                store.addExercise(exercise)
            }
        },
    }))


export interface ExerciseStore extends Instance<typeof ExerciseStoreModel> { }
export interface ExerciseStoreSnapshot extends SnapshotOut<typeof ExerciseStoreModel> { }
