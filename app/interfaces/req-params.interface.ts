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

export interface IDataRequestUserFood {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface IUserMealFood {
    mealId: number;
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
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
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
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
    userMealFood: IUpdateUserMealFood[];
}

export interface IDataRequestWaterLog {
    amount: number;
    date: string;
}

export interface IDataRequestWeightLog {
    weight: number;
    date: string;
}
