import { Api } from "../api";
import { GeneralApiProblem } from "../apiProblem";
import { UserMealAttributes } from "../../../interfaces/table-server.interface";
import { ApiResponse } from "apisauce";
import { IDataRequestCreateUserMeal, IDataRequestUpdateUserMeal } from "../../../interfaces/req-params.interface";
import type { ApiResponseMessage } from "../api.types"

/**

Quản lý các yêu cầu API liên quan đến Meal.
*/
export class MealApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    /**
    
    Lấy danh sách các bữa ăn.
    */
    async getMeals(): Promise<{ kind: "ok"; data: UserMealAttributes[] | null } | GeneralApiProblem> {
        try {
            const response: ApiResponse<UserMealAttributes[]> = await this.api.apisauce.get("/meals");
            if (response.ok) {
                const meals = response.data;
                return { kind: "ok", data: meals };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    
    Tạo một bữa ăn mới.
    */
    async createMeal(meal: IDataRequestCreateUserMeal): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/meals", meal);
            if (response.ok) {
                return { kind: "ok", data: response.data.message };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    
    Cập nhật thông tin một bữa ăn.
    */
    async updateMeal(mealId: number, updatedMeal: IDataRequestUpdateUserMeal): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put(`/meals/${mealId}`, updatedMeal);
            if (response.ok) {
                return { kind: "ok", data: response.data.message };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    
    Xóa một bữa ăn.
    */
    async deleteMeal(mealId: number): Promise<{ kind: "ok" } | GeneralApiProblem> {
        try {
            const response = await this.api.apisauce.delete(`/meals/${mealId}`);
            if (response.ok) {
                return { kind: "ok" };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }
}