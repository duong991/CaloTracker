import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { formatDateToString } from "../utils/formatDateToString"
import { UserInfoAttributes } from "../interfaces/table-server.interface"
type TActiveLevel = "Rất ít hoạt động" | "Ít hoạt động" | "Hoạt động vừa phải" | "Hoạt động nhiều" | "Hoạt động tích cực"
type TR = 1.2 | 1.377 | 1.55 | 1.725 | 1.9;
type TTarget = "Giảm cân" | "Tăng cân" | "Giữ nguyên cân nặng"
interface userInfo {
  activeLevel: TActiveLevel,
  gender: boolean,
  height: number,
  weight: number,
  dateForUpdateWeight: string,
  age: number,
  R: TR,
  target: TTarget
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
        target: store.target
      }
    },

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
    setUserInfo(userInfo: UserInfoAttributes) {
      store.activeLevel = userInfo.activityLevel
      this.setR(userInfo.activityLevel)
      store.gender = userInfo.gender
      store.height = userInfo.height
      store.weight = userInfo.weight
      store.target = userInfo.target
      store.age = userInfo.age
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
    }
  }))

export interface UserInfoStore extends Instance<typeof UserInfoStoreModel> { }
export interface UserInfoStoreSnapshot extends SnapshotOut<typeof UserInfoStoreModel> { }

