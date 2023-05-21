import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthenticationStoreModel } from "./AuthenticationStore" // @demo remove-current-line
import { EpisodeStoreModel } from "./EpisodeStore" // @demo remove-current-line
import { UserInfoStoreModel } from "./UserInfoStoreModel"
import { BodyIndexStoreModal } from "./BodyIndexStoreModal"
import { DateStoreModel } from "./DateStoreModel"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  authenticationStore: types.optional(AuthenticationStoreModel, {}), // @demo remove-current-line
  userInfoStore: types.optional(UserInfoStoreModel, {}), // @demo remove-current-line
  bodyIndexStore: types.optional(BodyIndexStoreModal, {}), // @demo remove-current-line
  dateStore: types.optional(DateStoreModel, {}), // @demo remove-current-line

  episodeStore: types.optional(EpisodeStoreModel, {}), // @demo remove-current-line
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
