import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"

interface FoodItem {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}
interface IMealFood {
    id: number
    servingSize: number
    food: FoodItem | null
    userFood: FoodItem | null
}
type mealType = "breakfast" | "lunch" | "dinner" | "snack"
export const UserMealModel = types
    .model("UserMealModel")
    .props({
        id: types.identifierNumber,
        name: types.string,
        description: types.string,
        calories: types.number,
        protein: types.number,
        carbohydrates: types.number,
        fat: types.number,
        mealType: types.enumeration<mealType>("mealType", ["breakfast", "lunch", "dinner", "snack"]),
        userMealFoods: types.array(types.frozen<IMealFood>())
    })
    .views((store) => ({
        get nameMeal() {
            return store.name;
        },
    }))


export interface UserMeal extends Instance<typeof UserMealModel> { }
export interface UserMealSnapshotOut extends SnapshotOut<typeof UserMealModel> { }
export interface UserMealSnapshotIn extends SnapshotIn<typeof UserMealModel> { }

