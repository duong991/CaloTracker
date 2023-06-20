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
  DailyCaloAttributes, CaloIntakeMappingAttributes, CaloConsumedMappingAttributes
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
  dailyCaloFoodMapping: CaloIntakeMappingAttributes[] | [];
}

export interface ApiFetchDataUserInfoResponse {
  userInfo: UserInfoAttributes | null;
};


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

export interface WeightLogItem {
  date: Date
  weight: number
}
export interface ApiGetAllWeightLogResponse {
  items: WeightLogItem[]
}

export interface ExerciseItem {
  id: number;
  name: string;
  caloriesBurned: number;
  duration: number;
}
export interface ApiGetExerciseResponse {
  items: ExerciseItem[]
}

export interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
}

export interface ApiGetFoodResponse {
  items: FoodItem[]
}


export interface mealFoodItem {
  id: number
  mealId: number
  foodId: number
  servingSize: number
  food: FoodItem | null
}

export interface MealItem {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  mealFoods: mealFoodItem[];
}

export interface ApiGetMealResponse {
  items: MealItem[]
}

/**
  Interface of ApiGetUserMealResponse
 *  
 * */

export interface UserMealFoodItem {
  id: number
  servingSize: number
  food: FoodItem | null
  userFood: FoodItem | null
}
export interface UserMealItem {
  id: number;
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  userMealFoods: mealFoodItem[];
}

export interface ApiGetUserMealResponse {
  items: MealItem[]
}

export interface ApiResponseMessage {
  message: string;
}

export interface ApiLoginResponse {
  accessToken?: string;
  refreshToken?: string;
  message?: string;
}

export interface ApiResponseWaterLog {
  amount: number;
}

export interface ApiResponseWeightLogByDate {
  weight: number;
}

export interface ApiResponseDailyCaloByDate {
  id: number;
  date: Date;
  caloIntakeMappings: CaloIntakeMappingAttributes[] | null;
  caloConsumedMappings: CaloConsumedMappingAttributes[] | null;
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
