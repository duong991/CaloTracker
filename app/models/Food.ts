import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

export const FoodModel = types
    .model("Food")
    .props({
        id: types.identifierNumber,
        name: types.string,
        calories: types.number,
        protein: types.number,
        carbohydrates: types.number,
        fat: types.number,
    })
    .views((store) => ({
        get nameFood() {
            return store.name;
        },
    }))


export interface Food extends Instance<typeof FoodModel> { }
export interface FoodSnapshotOut extends SnapshotOut<typeof FoodModel> { }
export interface FoodSnapshotIn extends SnapshotIn<typeof FoodModel> { }

