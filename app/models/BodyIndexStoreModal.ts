import { Instance, SnapshotOut, types } from "mobx-state-tree"
import * as calBodyIdx from "../utils/calculateBodyIndex"
import { TTarget } from "./UserInfoStoreModel"
import * as calculateMacro from "../utils/calculateMacro"
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
    gramOfProtein: types.optional(types.number, 0),
    gramOfCarb: types.optional(types.number, 0),
    gramOfFat: types.optional(types.number, 0),
  })
  .views((store) => ({
    getBodyIndex() {
      return {
        TDEE: store.TDEE,
        BMI: store.BMI,
        BMR: store.BMR,
        water: store.water,
        weightStatus: store.weightStatus,
        calorPerDay: store.calorPerDay,
        gramOfProtein: store.gramOfProtein,
        gramOfCarb: store.gramOfCarb,
        gramOfFat: store.gramOfFat,
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
    setMacro(calorPerDay: number, protein: number, fat: number, carb: number) {
      store.gramOfCarb = calculateMacro.gramOfCarb(calorPerDay, carb)
      store.gramOfFat = calculateMacro.gramOfFat(calorPerDay, fat)
      store.gramOfProtein = calculateMacro.gramOfProtein(calorPerDay, protein)
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
    setCaloPerDayByTarget(target: TTarget) {
      switch (target) {
        case "Giảm cân":
          store.calorPerDay = store.TDEE - 500;
          break;
        case "Tăng cân":
          store.calorPerDay = store.TDEE + 500;
          break;
        case "Giữ nguyên cân nặng":
          store.calorPerDay = store.TDEE;
          break;
        default:
          break;
      }
    },
    setBodyIndex(gender: boolean, height: number, weight: number, age: number, R: number, target: TTarget, protein: number, fat: number, carb: number) {
      this.setBMI(height, weight)
      this.setWeightStatus(store.BMI)
      this.setBMR(gender, height, weight, age)
      this.setTDEE(store.BMR, R)
      this.setCaloPerDayByTarget(target)
      this.setWater(weight)
      this.setMacro(store.calorPerDay, protein, fat, carb)
    },

  }))

export interface BodyIndexStore extends Instance<typeof BodyIndexStoreModal> { }
export interface BodyIndexStoreSnapshot extends SnapshotOut<typeof BodyIndexStoreModal> { }

