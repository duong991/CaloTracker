import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const DateStoreModel = types
  .model("DateStore")
  .props({
    dateTime: types.optional(types.Date, new Date()),
  })
  .views((store) => ({
    getDateStore() {
      return {
        dateTime: store.dateTime,
      }
    },
  }))
  .actions((store) => ({
    setDateTime(value: Date) {
      store.dateTime = value
    },

  }))

export interface DateStore extends Instance<typeof DateStoreModel> { }
export interface DateStoreSnapshot extends SnapshotOut<typeof DateStoreModel> { }

