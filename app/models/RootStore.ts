import { Instance, SnapshotOut, types } from "mobx-state-tree"

import { SystemStoreModel } from "./SystemStore"

import { AuthenticationStoreModel } from "./AuthenticationStore"

import { UserInfoStoreModel } from "./UserInfoStoreModel"
import { BodyIndexStoreModal } from "./BodyIndexStoreModal"

import { DateStoreModel } from "./DateStoreModel"
import { EpisodeStoreModel } from "./EpisodeStore"
import { WeightLogStoreModel } from "./WeightLogStore"
import { ExerciseStoreModel } from "./ExerciseStore"
import { MealFoodStoreModel } from "./MealFoodStore"
import { DailyMealsModel } from "./DailyMealsModel"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  systemStore: types.optional(SystemStoreModel, {}),

  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  userInfoStore: types.optional(UserInfoStoreModel, {}),
  bodyIndexStore: types.optional(BodyIndexStoreModal, {}),
  dateStore: types.optional(DateStoreModel, {}),

  weightLogStore: types.optional(WeightLogStoreModel, {}),
  exerciseStore: types.optional(ExerciseStoreModel, {}),
  mealFoodStore: types.optional(MealFoodStoreModel, {}),
  dailyMealsModel: types.optional(DailyMealsModel, {}),
  episodeStore: types.optional(EpisodeStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
