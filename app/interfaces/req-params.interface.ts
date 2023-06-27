export interface UpdateInfoUserRequest {
    gender: boolean;
    weight: number;
    height: number;
    activityLevel: string;
    BMR: number;
    target: 'Giảm cân' | 'Tăng cân' | 'Giữ nguyên cân nặng';
    lastTimeToUpdate: string;
    protein: number;
    fat: number;
    carb: number;
}

export interface UpdateWeightRequest {
    weight: number;
    date: string;
}

export interface IDataRequestUserFood {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface IUserMealFood {
    foodId?: number;
    userFoodId?: number;
    servingSize: number;
}

export interface IDataRequestCreateUserMeal {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    userMealFood: IUserMealFood[];
}

interface IUpdateUserMealFood {
    id?: number;
    mealId: number;
    foodId?: number;
    userFoodId?: number;
    servingSize: number;
}

export interface IDataRequestUpdateUserMeal {
    name: string;
    description?: string;
    image?: Blob;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    userMealFood: IUpdateUserMealFood[];
}

export interface IDataRequestWaterLog {
    amount: number;
    date: Date;
}

export interface IDataRequestWeightLog {
    weight: number;
    date: Date;
}

// Interface của resquest daily calo
interface IFoodId {
    id: number;
    servingSize: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface IMealId {
    id: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export interface IDataRequestUpdateCaloIntake {
    date: string;
    foodId: IFoodId[] | null;
    mealId: number[] | null;
    userFoodId: IFoodId[] | null;
    userMealId: IMealId[] | null;
}

interface IExerciseId {
    id: number;
    duration: number;
}
export interface IDataRequestUpdateCaloConsumed {
    date: string;
    exerciseId: IExerciseId[] | null;
}

export interface IDataRequestDeleteCaloIntake {
    date: string;
    foodId: number[] | null;
    mealId: number[] | null;
    userFoodId: number[] | null;
    userMealId: number[] | null;
}

export interface IDataRequestDeleteCaloConsumed {
    date: string;
    exerciseId: number[] | null;
}