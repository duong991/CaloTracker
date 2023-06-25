import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

// interface FoodItem {
//     id: number;
//     name: string;
//     calories: number;
//     protein: number;
//     carbohydrates: number;
//     fat: number;
// }
// interface IMealFood {
//     id: number
//     mealId: number
//     foodId: number
//     servingSize: number
//     food: FoodItem | null
// }
type mealType = "breakfast" | "lunch" | "dinner" | "snack"
export const MealModel = types
    .model("Meal")
    .props({
        id: types.identifier,
        name: types.string,
        description: types.string,
        calories: types.number,
        protein: types.number,
        carbohydrates: types.number,
        fat: types.number,
        mealType: types.enumeration<mealType>("mealType", ["breakfast", "lunch", "dinner", "snack"]),
        isUserCreated: types.boolean,
        // mealFoods: types.array(types.frozen<IMealFood>()),
    })
    .views((store) => ({
        get nameMeal() {
            return store.name;
        },
    }))


export interface Meal extends Instance<typeof MealModel> { }
export interface MealSnapshotOut extends SnapshotOut<typeof MealModel> { }
export interface MealSnapshotIn extends SnapshotIn<typeof MealModel> { }

