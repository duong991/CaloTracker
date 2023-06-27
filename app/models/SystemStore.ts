import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import deleteTables from "../database/deleteTables"

export const SystemStoreModel = types
    .model("SystemStore")
    .props({
        isOverlayVisible: false,
        isShowList: false,
    })
    .views((store) => ({
        get getIsOverlayVisible() {
            return store.isOverlayVisible
        },
    }))
    .actions((store) => ({
        toggleIsOverlayVisible() {
            store.isOverlayVisible = !store.isOverlayVisible
        },
        setOverLayVisible(value: boolean) {
            store.isOverlayVisible = value
        },
        toggleIsShowList() {
            store.isShowList = !store.isShowList
        },
        setIsShowList(value: boolean) {
            store.isShowList = value
        },


    }))

export interface AuthenticationStore extends Instance<typeof SystemStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof SystemStoreModel> { }

// @demo remove-file
