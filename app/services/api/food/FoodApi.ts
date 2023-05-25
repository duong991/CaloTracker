import { Api } from "../api";
import { GeneralApiProblem } from "../apiProblem";
import { UserFoodAttributes } from "../../../interfaces/table-server.interface";
import { IDataRequestUserFood } from "../../../interfaces/req-params.interface";
import { ApiResponse } from "apisauce";
import type { ApiResponseMessage } from "../api.types"

/**
 * Quản lý các yêu cầu API liên quan đến Food.
 */
export class FoodApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
    }

    /**
     * Lấy danh sách các món ăn.
     */
    async getFoods(): Promise<{ kind: "ok"; data: UserFoodAttributes[] | null } | GeneralApiProblem> {
        try {
            const response: ApiResponse<UserFoodAttributes[] | null> = await this.api.apisauce.get("/foods")
            if (response.ok) {
                const foods = response.data
                return { kind: "ok", data: foods }
            } else {
                return { kind: "bad-data" }
            }
        } catch (error) {
            return { kind: "bad-data" }
        }
    }

    /**
     * Tạo một món ăn mới.
     */
    async createFood(food: IDataRequestUserFood): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/foods", food)
            if (response.ok) {
                return { kind: "ok", data: response.data.message }
            } else {
                return { kind: "bad-data" }
            }
        } catch (error) {
            return { kind: "bad-data" }
        }
    }

    /**
     * Cập nhật thông tin một món ăn.
     */
    async updateFood(foodId: number, updatedFood: UserFoodAttributes): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put(`/foods/${foodId}`, updatedFood)
            if (response.ok) {
                return { kind: "ok", data: response.data.message }
            } else {
                return { kind: "bad-data" }
            }
        } catch (error) {
            return { kind: "bad-data" }
        }
    }

    /**
     * Xóa một món ăn.
     */
    async deleteFood(foodId: number): Promise<{ kind: "ok" } | GeneralApiProblem> {
        try {
            const response = await this.api.apisauce.delete(`/foods/${foodId}`)
            if (response.ok) {
                return { kind: "ok" }
            } else {
                return { kind: "bad-data" }
            }
        } catch (error) {
            return { kind: "bad-data" }
        }
    }
}