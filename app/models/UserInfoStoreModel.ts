import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { formatDateToString } from "../utils/formatDateToString"
import { UserInfoAttributes } from "../interfaces/table-server.interface"
import { UpdateInfoUserRequest } from "../interfaces/req-params.interface"
type TActiveLevel = "Rất ít hoạt động" | "Ít hoạt động" | "Hoạt động vừa phải" | "Hoạt động nhiều" | "Hoạt động tích cực"
type TR = 1.2 | 1.377 | 1.55 | 1.725 | 1.9;
export type TTarget = "Giảm cân" | "Tăng cân" | "Giữ nguyên cân nặng"

interface userInfo {
  activeLevel: TActiveLevel,
  gender: boolean,
  height: number,
  weight: number,
  dateForUpdateWeight: string,
  age: number,
  R: TR,
  target: TTarget,
  protein: number,
  fat: number,
  carb
}

const activeLevelToRMap = {
  "Rất ít hoạt động": 1.2,
  "Ít hoạt động": 1.377,
  "Hoạt động vừa phải": 1.55,
  "Hoạt động nhiều": 1.725,
  "Hoạt động tích cực": 1.9
};

export const UserInfoStoreModel = types
  .model("UserInfoStore")
  .props({
    activeLevel: types.maybe(types.enumeration<TActiveLevel>(["Rất ít hoạt động", "Ít hoạt động", "Hoạt động vừa phải", "Hoạt động nhiều", "Hoạt động tích cực"])),
    gender: types.optional(types.boolean, true),
    height: types.optional(types.number, 0),
    weight: types.optional(types.number, 0),
    fat: types.optional(types.number, 0),
    protein: types.optional(types.number, 0),
    carb: types.optional(types.number, 0),
    dateForUpdateWeight: types.optional(types.string, ""),
    age: types.optional(types.number, 0),
    R: types.maybe(types.union(types.literal<TR>(1.2), types.literal<TR>(1.377), types.literal<TR>(1.55),
      types.literal<TR>(1.725), types.literal<TR>(1.9))),
    target: types.maybe(types.enumeration<TTarget>(["Giảm cân", "Tăng cân", "Giữ nguyên cân nặng"])),
  })
  .views((store) => ({
    getUserInfo(): userInfo {
      return {
        activeLevel: store.activeLevel,
        gender: store.gender,
        height: store.height,
        weight: store.weight,
        dateForUpdateWeight: store.dateForUpdateWeight,
        age: store.age,
        R: store.R,
        target: store.target,
        protein: store.protein,
        fat: store.fat,
        carb: store.carb
      }
    },
    getUserInfoForUpdate(): UpdateInfoUserRequest {
      return {
        weight: store.weight,
        height: store.height,
        gender: store.gender,
        activityLevel: store.activeLevel as string,
        BMR: store.R as number,
        target: store.target,
        lastTimeToUpdate: store.dateForUpdateWeight,
        protein: store.protein,
        fat: store.fat,
        carb: store.carb
      }
    }

  }))
  .actions((store) => ({
    setActiveLevel(minute: number, day: number) {
      const averageUptime = (Number(minute) * Number(day)) / 7;
      const activeLevel = this.calculateActiveLevel(averageUptime);
      store.activeLevel = activeLevel;
      store.R = activeLevelToRMap[activeLevel] as TR;
    },
    calculateActiveLevel(averageUptime: number): TActiveLevel {
      if (averageUptime < 10) {
        return "Rất ít hoạt động";
      } else if (averageUptime < 29) {
        return "Ít hoạt động";
      } else if (averageUptime < 59) {
        return "Hoạt động vừa phải";
      } else if (averageUptime < 89) {
        return "Hoạt động nhiều";
      } else {
        return "Hoạt động tích cực";
      }
    },
    setR(activeLevel: TActiveLevel) {
      store.R = activeLevelToRMap[activeLevel] as TR;
    },
    setGender(value: boolean) {
      store.gender = value
    },
    setHeight(value: number) {
      store.height = value
    },
    setDate(value: string) {
      store.dateForUpdateWeight = value
    },
    setWeight(value: number) {
      store.weight = value
      const date = new Date();
      this.setDate(formatDateToString(date))
    },
    setAge(value: number) {
      store.age = value
    },
    setTarget(value: TTarget) {
      store.target = value
    },
    setMacro(type: number) {
      if (type === 1) {
        store.protein = .3
        store.fat = .35
        store.carb = .35
      } else if (type === 2) {
        store.protein = 0.4
        store.fat = .3
        store.carb = .3
      } else if (type === 3) {
        store.protein = 0.3
        store.fat = .2
        store.carb = .5
      }
    },
    setUserInfo(userInfo: UserInfoAttributes) {
      store.activeLevel = userInfo.activityLevel
      store.gender = userInfo.gender
      store.height = userInfo.height
      store.weight = userInfo.weight
      store.target = userInfo.target
      store.age = userInfo.age
      store.dateForUpdateWeight = userInfo.lastTimeToUpdate
      store.protein = userInfo.protein
      store.fat = userInfo.fat
      store.carb = userInfo.carb
      this.setR(userInfo.activityLevel)
    },
    clearUserInfo() {
      store.activeLevel = undefined
      store.R = undefined
      store.dateForUpdateWeight = ""
      store.age = 0
      store.weight = 0
      store.height = 0
      store.target = undefined
      store.gender = true
      store.protein = 0
      store.fat = 0
      store.carb = 0
    }
  }))

export interface UserInfoStore extends Instance<typeof UserInfoStoreModel> { }
export interface UserInfoStoreSnapshot extends SnapshotOut<typeof UserInfoStoreModel> { }

