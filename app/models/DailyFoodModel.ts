import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
export const DailyFoodModel = types
    .model("DailyFood")
    .props({
        id: types.identifier,
        name: types.string,
        calories: types.number,
        protein: types.number,
        carbohydrates: types.number,
        fat: types.number,
        servingSize: types.number,
        isUserCreated: types.boolean,
    })
    .views((store) => ({
        get nameFood() {
            return store.name;
        },

        get caloriesPerServing() {
            return store.calories / 100 * store.servingSize;
        },
        get proteinPerServing() {
            return store.protein / 100 * store.servingSize;
        },
        get carbohydratesPerServing() {
            return store.carbohydrates / 100 * store.servingSize;
        },
        get fatPerServing() {
            return store.fat / 100 * store.servingSize;
        }
    }))


export interface DailyFood extends Instance<typeof DailyFoodModel> { }
export interface FoodSnapshotOut extends SnapshotOut<typeof DailyFoodModel> { }
export interface FoodSnapshotIn extends SnapshotIn<typeof DailyFoodModel> { }

