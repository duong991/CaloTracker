interface DailyCaloAttributes {
    id?: number;
    userId: number;
    totalCalo?: number;
    date: Date;
}

interface DailyCaloFoodMappingAttributes {
    id?: number;
    dailyCaloId: number;
    foodId?: number;
    userFoodId?: number;
    mealId?: number;
    userMealId?: number;
    menuId?: number;
    userMenuId?: number;
    servingSize?: number;
}
interface ExerciseAttributes {
    id?: number;
    name: string;
    caloriesBurned: number;
    duration: number;
}

interface FoodAttributes {
    id?: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface UserFoodAttributes {
    id?: number;
    userId: number;
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
}

interface MealAttributes {
    id?: number;
    name: string;
    description?: string;
    image?: Buffer;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface MenuAttributes {
    id?: number;
    name: string;
    description?: string;
}

interface MealFoodAttributes {
    id?: number;
    mealId: number;
    foodId: number;
    servingSize: number;
}
interface UserMealFoodAttributes {
    id?: number;
    mealId: number;
    foodId?: number;
    userFoodId?: number;
    servingSize: number;
}

interface MealMenuAttributes {
    id?: number;
    menuId: number;
    mealId?: number;
}

interface UserMealMenuAttributes {
    id?: number;
    menuId: number;
    mealId?: number;
    userMealId?: number;
}

interface UserAttributes {
    id?: number;
    username: string;
    password: string;
    role: boolean;
}

interface UserExrAttributes {
    id?: number;
    userId: number;
    exerciseId: number;
    date: Date;
    duration: number;
}
interface UserInfoAttributes {
    id?: number;
    userId: number;
    gender: boolean;
    age: number;
    weight: number;
    height: number;
    activityLevel: "Rất ít hoạt động" | "Ít hoạt động" | "Hoạt động vừa phải" | "Hoạt động nhiều" | "Hoạt động tích cực";
    BMR: number;
    target: "Giảm cân" | "Tăng cân" | "Giữ nguyên cân nặng";

}
interface UserMealAttributes {
    id?: number;
    userId: number;
    name: string;
    description?: string;
    image?: Buffer;
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snacks';
}

interface UserMenuAttributes {
    id?: number;
    userId: number;
    name: string;
    description?: string;
}

interface UserWeightHistoryAttributes {
    id?: number;
    userId: number;
    date: Date;
    weight: number;
}
interface WaterLogAttributes {
    id?: number;
    userId: number;
    date: string;
    amount: number;
}

export {
    DailyCaloAttributes,
    DailyCaloFoodMappingAttributes,
    ExerciseAttributes,
    FoodAttributes,
    UserFoodAttributes,
    MealAttributes,
    UserMealAttributes,
    MenuAttributes,
    UserMenuAttributes,
    MealFoodAttributes,
    UserMealFoodAttributes,
    MealMenuAttributes,
    UserMealMenuAttributes,
    UserAttributes,
    UserExrAttributes,
    UserInfoAttributes,
    UserWeightHistoryAttributes,
    WaterLogAttributes,
};
