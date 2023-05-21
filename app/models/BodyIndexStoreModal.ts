import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as calBodyIdx from "../utils/calculateBodyIndex"
type TWeightStatus = "Thiếu cân" | "Cân đối" | "Thừa cân" | "Béo phì" | "Béo phì nguy hiểm"

export const BodyIndexStoreModal = types
  .model("BodyIndexStore")
  .props({
    TDEE: types.optional(types.number, 0),
    BMI: types.optional(types.number, 0),
    BMR: types.optional(types.number, 0),
    water: types.optional(types.number, 0),
    weightStatus: types.maybe(types.enumeration<TWeightStatus>(["Thiếu cân", "Cân đối", "Thừa cân", "Béo phì", "Béo phì nguy hiểm"])),
    calorPerDay: types.optional(types.number, 0),

  })
  .views((store) => ({
    getBodyIndex() {
      return {
        TDEE: store.TDEE,
        BMI: store.BMI,
        BMR: store.BMR,
        water: store.water,
        weightStatus: store.weightStatus,
        calorPerDay: store.calorPerDay
      }
    },
    get getCalorPerDay() {
      return store.calorPerDay
    }

  }))
  .actions((store) => ({
    setTDEE(BMR: number, R: number) {
      store.TDEE = calBodyIdx.TDEE(BMR, R)
    },
    setBMR(gender: boolean, height: number, weight: number, age: number) {
      if (gender) {
        store.BMR = calBodyIdx.BMR_MALE(weight, height, age)
      } else {
        store.BMR = calBodyIdx.BMR_FEMALE(weight, height, age)
      }
    },
    setBMI(height: number, weight: number) {
      store.BMI = calBodyIdx.BMI(weight, height)
    },
    setWater(weight: number) {
      store.water = calBodyIdx.water(weight)
    },
    setWeightStatus(BMI: number) {
      if (BMI < 18.5) {
        store.weightStatus = "Thiếu cân"
      } else if (BMI < 24.9) {
        store.weightStatus = "Cân đối"
      } else if (BMI < 29.9) {
        store.weightStatus = "Thừa cân"
      } else if (BMI < 34.9) {
        store.weightStatus = "Béo phì"
      } else {
        store.weightStatus = "Béo phì nguy hiểm"
      }
    },
    setCalorPerDay(calor: number) {
      store.calorPerDay = calor
    },
    setBodyIndex(gender: boolean, height: number, weight: number, age: number, R: number) {
      this.setBMI(height, weight)
      this.setWeightStatus(store.BMI)
      this.setBMR(gender, height, weight, age)
      this.setTDEE(store.BMR, R)
      this.setWater(weight)
    },

  }))

export interface BodyIndexStore extends Instance<typeof BodyIndexStoreModal> { }
export interface BodyIndexStoreSnapshot extends SnapshotOut<typeof BodyIndexStoreModal> { }

