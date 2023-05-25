/**
 * These types indicate the shape of the data you expect to receive from your
 * API endpoint, assuming it's a JSON object like we have.
 */

import {
  UserInfoAttributes, UserFoodAttributes, UserMealFoodAttributes,
  UserMealMenuAttributes, UserMealAttributes, FoodAttributes,
  UserMenuAttributes, MealFoodAttributes, MealAttributes,
  MealMenuAttributes, MenuAttributes, ExerciseAttributes,
  UserExrAttributes, WaterLogAttributes, UserWeightHistoryAttributes,
  DailyCaloAttributes, DailyCaloFoodMappingAttributes
} from "../../interfaces/table-server.interface"

export interface ApiFetchDataResponse {
  userInfo: UserInfoAttributes | null;
  userFoods: UserFoodAttributes[] | [];
  userMealFoods: UserMealFoodAttributes[] | [];
  userMeals: UserMealAttributes[] | [];
  userMealMenus: UserMealMenuAttributes[] | [];
  userMenus: UserMenuAttributes[] | [];
  foods: FoodAttributes[];
  mealFoods: MealFoodAttributes[];
  meals: MealAttributes[];
  mealMenus: MealMenuAttributes[] | [];
  menus: MenuAttributes[] | [];
  exercises: ExerciseAttributes[];
  userExercise: UserExrAttributes[] | [];
  waterLogs: WaterLogAttributes[] | [];
  userWeightHistories: UserWeightHistoryAttributes[];
  dailyCalos: DailyCaloAttributes[] | [];
  dailyCaloFoodMapping: DailyCaloFoodMappingAttributes[] | [];
}


export interface EpisodeItem {
  title: string
  pubDate: string
  link: string
  guid: string
  author: string
  thumbnail: string
  description: string
  content: string
  enclosure: {
    link: string
    type: string
    length: number
    duration: number
    rating: { scheme: string; value: string }
  }
  categories: string[]
}

export interface ApiFeedResponse {
  status: string
  feed: {
    url: string
    title: string
    link: string
    author: string
    description: string
    image: string
  }
  items: EpisodeItem[]
}


export interface ApiResponseMessage {
  message: string;
}

export interface ApiLoginResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}


/**
 * The options used to configure apisauce.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}
