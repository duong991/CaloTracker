import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { mealApi } from "app/services/api";
import { withSetPropAction } from "./helpers/withSetPropAction"
export const FoodModel = types.model({
    id: types.number,
    servingSize: types.number,
});

export const DetailFoodListModel = types.model({
    id: types.number,
    servingSize: types.number,
    name: types.string,
    calories: types.number,
    protein: types.number,
    carbohydrates: types.number,
    fat: types.number,
})

export interface FoodModelSnapshotIn extends SnapshotIn<typeof FoodModel> { }

export const MealDetailModal = types
    .model("MealDetail")
    .props({
        systemFood: types.array(FoodModel),
        userFood: types.array(FoodModel),
        detailFoodList: types.array(DetailFoodListModel),
    })
    .views((store) => ({

        get getSystemFood() {
            return store.systemFood
        },
        get getUserFood() {
            return store.userFood
        },
        get getDetailFoodList() {
            return store.detailFoodList
        },
        get getTotalCalories() {
            const totalCalories = store.detailFoodList.reduce((total, item) => {
                return total + item.calories
            }, 0)
            return totalCalories
        },
        get getTotalProtein() {
            const totalProtein = store.detailFoodList.reduce((total, item) => {
                return total + item.protein
            }, 0)
            return totalProtein
        },
        get getTotalCarbohydrates() {
            const totalCarbohydrates = store.detailFoodList.reduce((total, item) => {
                return total + item.carbohydrates
            }, 0)
            return totalCarbohydrates
        },
        get getTotalFat() {
            const totalFat = store.detailFoodList.reduce((total, item) => {
                return total + item.fat
            }, 0)
            return totalFat
        }

    }))
    .actions(withSetPropAction)
    .actions((store) => ({
        async fetchDataUserMeal(id: number) {
            const res = await mealApi.getDetailUserMeal(id);
            if (res.kind === "ok") {
                store.setProp("systemFood", res.items.systemFood)
                store.setProp("userFood", res.items.userFood)
            }
        },
        addSystemFood(id: number, servingSize: number) {
            const isExits = store.systemFood.find((item) => item.id === id)
            if (isExits) {
                isExits.servingSize = servingSize
            } else {
                store.systemFood.push({ id, servingSize })
            }
        },
        removeSystemFood(id: number) {
            const index = store.systemFood.findIndex((item) => item.id === id)
            if (index !== -1) {
                store.systemFood.splice(index, 1)
            }
        },
        addUserFood(id: number, servingSize: number) {
            const isExits = store.userFood.find((item) => item.id === id)
            if (isExits) {
                isExits.servingSize = servingSize
            } else {
                store.userFood.push({ id, servingSize })
            }
        },
        removeUserFood(id: number) {
            const index = store.userFood.findIndex((item) => item.id === id)
            if (index !== -1) {
                store.userFood.splice(index, 1)
            }
        },
        clearData() {
            console.log("clear data");
            store.setProp("systemFood", [])
            store.setProp("userFood", [])
        },
        isSystemFoodHaveId(id: string) {
            const newId = +id.split("-")[1]
            const isExits = store.systemFood.find((item) => item.id === newId)
            return !!isExits;
        },
        isUserFoodHaveId(id: string) {
            const newId = +id.split("-")[1]
            const isExits = store.userFood.find((item) => item.id === newId)
            return !!isExits;
        },
        addNewRecordToDetailFoodList(id: number, servingSize: number, name: string, calories: number, protein: number, carbohydrates: number, fat: number) {
            const isExits = store.detailFoodList.find((item) => item.id === id)
            if (isExits) {
                isExits.servingSize = servingSize
            } else {
                store.detailFoodList.push({ id, servingSize, name, calories, protein, carbohydrates, fat })
            }

        },
        removeRecordFromDetailFoodList(id: number) {
            const index = store.detailFoodList.findIndex((item) => item.id === id)
            if (index !== -1) {
                store.detailFoodList.splice(index, 1)
            }
        },
        clearAllData() {
            store.setProp("systemFood", [])
            store.setProp("userFood", [])
            store.setProp("detailFoodList", [])
        }

    }));

export interface MealDetail extends Instance<typeof MealDetailModal> { }
export interface MealDetailSnapshotOut extends SnapshotOut<typeof MealDetailModal> { }
export interface MealDetailSnapshotIn extends SnapshotIn<typeof MealDetailModal> { }

