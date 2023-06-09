import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { UserFoodAttributes } from "../../../interfaces/table-server.interface";
import { IDataRequestUserFood } from "../../../interfaces/req-params.interface";
import { ApiResponse } from "apisauce";
import type { ApiResponseMessage, ApiGetFoodResponse } from "../api.types"
import { FoodSnapshotIn } from "app/models/Food";

/**
 * Quản lý các yêu cầu API liên quan đến Food.
 */
export class FoodApi {
    private api: Api

    constructor(api: Api) {
        this.api = api
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
    async updateFood(data: UserFoodAttributes): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put("/foods/update", { data })
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
            const response = await this.api.apisauce.post("/foods/delete", { foodId })
            if (response.ok) {
                return { kind: "ok" }
            } else {
                return { kind: "bad-data" }
            }
        } catch (error) {
            return { kind: "bad-data" }
        }
    }

    /**
    * Lấy toàn bộ danh sách food từ hệ thống
    */

    async getAllFoodsFromSystem(): Promise<{ kind: "ok", foods: FoodSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetFoodResponse> = await this.api.apisauce.get("/system/food");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data

            const foods: FoodSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
                id: "SYSTEMFOOD-" + raw.id.toString()
            }))

            return { kind: "ok", foods }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }

    }

    async getAllFoodsFromUser(): Promise<{ kind: "ok", foods: FoodSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetFoodResponse> = await this.api.apisauce.get("/foods/");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data

            // This is where we transform the data into the shape we expect for our MST model.
            const foods: FoodSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
                id: "USERFOOD-" + raw.id.toString()
            }))

            return { kind: "ok", foods }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }

    }
}

const foodApi = new FoodApi(api);
export { foodApi }