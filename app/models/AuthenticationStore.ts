import { Instance, SnapshotOut, types } from "mobx-state-tree"
// import deleteTables from "../database/deleteTables"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    availInfo: types.optional(types.boolean, true),
    authToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
    authEmail: "",
  })
  .views((store) => ({
    get isFirstTime() {
      return store.availInfo
    },
    get isAuthenticated() {
      return !!store.authToken
    },
    get authTokenHeader() {
      return store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    setFirstTime(value: boolean) {
      store.availInfo = value
    },
    setAuthToken(value?: string) {
      store.authToken = value
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    setRefreshToken(value?: string) {
      store.refreshToken = value
    },
    logout() {
      store.refreshToken = undefined
      store.authToken = undefined
      store.authEmail = ""
      store.availInfo = true
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }

// @demo remove-file
