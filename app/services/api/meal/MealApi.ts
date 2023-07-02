import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import { IDataRequestCreateUserMeal, IDataRequestUpdateUserMeal, } from "../../../interfaces/req-params.interface";
import type { ApiResponseMessage, ApiGetMealResponse } from "../api.types"
import { MealSnapshotIn } from "../../../models/Meal"
import { FoodModelSnapshotIn } from "../../../models/MealDetails"
/**

Quản lý các yêu cầu API liên quan đến Meal.
*/


interface IResponseMealDetails {
    systemFood: FoodModelSnapshotIn[];
    userFood: FoodModelSnapshotIn[];
}
export class MealApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
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
            const response = await this.api.apisauce.post(`/meals/delete`, { mealId });
            if (response.ok) {
                return { kind: "ok" };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    * Lấy toàn bộ danh sách meal từ hệ thống
    */

    async getAllMealFromSystem(): Promise<{ kind: "ok", meals: MealSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetMealResponse> = await this.api.apisauce.get("/system/meal");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data

            // This is where we transform the data into the shape we expect for our MST model.
            const meals: MealSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
                id: "SYSTEMMEAL-" + raw.id.toString(),
                isUserCreated: false,
            }))


            return { kind: "ok", meals }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }

    }


    async getAllMealFromUser(): Promise<{ kind: "ok", meals: MealSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetMealResponse> = await this.api.apisauce.get("/meals/");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data

            // This is where we transform the data into the shape we expect for our MST model.
            const meals: MealSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
                id: "USERMEAL-" + raw.id.toString(),
                isUserCreated: true,
            }))
            return { kind: "ok", meals }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }

    }

    async getDetailUserMeal(mealId: number): Promise<{ kind: "ok", items: IResponseMealDetails } | GeneralApiProblem> {
        const response: ApiResponse<IResponseMealDetails> = await this.api.apisauce.get(`/meals/detail/${mealId}`);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            const rawData = response.data


            return {
                kind: "ok", items: {
                    systemFood: rawData.systemFood,
                    userFood: rawData.userFood,
                }
            }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }
    }
}

const mealApi = new MealApi(api)
export { mealApi }