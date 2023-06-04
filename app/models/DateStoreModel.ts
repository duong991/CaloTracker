import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { waterLogApi } from "app/services/api"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { convertDateBeforeInsertOrUpdate } from "app/utils/convertDate"
export const DateStoreModel = types
  .model("DateStore")
  .props({
    dateTime: types.optional(types.Date, new Date()),
    amount: types.optional(types.number, 0),
  })
  .views((store) => ({
    getDateStore() {
      return {
        dateTime: store.dateTime,
      }
    },
  }))
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchData() {
      const response = await
        waterLogApi.
          getWaterLogByDate(
            convertDateBeforeInsertOrUpdate(
              store.dateTime))
      if (response.kind === "ok") {
        store.setProp("amount", response.data.amount)
      } else {
        console.tron.error(`Error fetching water log : ${JSON.stringify(response)}`, [])
      }
    },
    setDateTime(value: Date) {
      store.dateTime = value
      this.fetchData()
    },
    setAmount(value: number) {
      store.amount = value
    }

  }))

export interface DateStore extends Instance<typeof DateStoreModel> { }
export interface DateStoreSnapshot extends SnapshotOut<typeof DateStoreModel> { }

