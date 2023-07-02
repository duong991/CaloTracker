import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import type { ApiSearchAllFoodResponse, FoodItem } from "../api.types"
/**

Quản lý các yêu cầu API liên quan đến WeightLog.
*/
export class SearchApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    async getDataSearchAllFood(keyword: string): Promise<{ kind: "ok", items: { foods: FoodItem[], userFoods: FoodItem[] } } | GeneralApiProblem> {
        const response: ApiResponse<ApiSearchAllFoodResponse> = await this.api.apisauce.get(`/search/foods-and-user-foods?keyword=${keyword}`);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            const rawData = response.data.items

            // This is where we transform the data into the shape we expect for our MST model.


            return { kind: "ok", items: rawData }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }

    }
}

export const searchApi = new SearchApi(api);