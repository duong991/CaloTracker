import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import {
    IDataRequestUpdateCaloIntake,
    IDataRequestUpdateCaloConsumed,
    IDataRequestDeleteCaloIntake,
    IDataRequestDeleteCaloConsumed
} from "../../../interfaces/req-params.interface";
import type { ApiResponseMessage, ApiResponseDailyCaloByDate } from "../api.types"

/**

Quản lý các yêu cầu API liên quan đến Meal.
*/
export class DailyCaloApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }


    /**
     * Update calo intake
     * @param data
     *
     * @returns {Promise<ApiResponseMessage>}
    **/

    async updateCaloIntake(data: IDataRequestUpdateCaloIntake): Promise<{ kind: "ok", data: ApiResponseMessage } | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put("/daily-calo/calo-intake/", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data
            return { kind: "ok", data: rawData }

        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            console.log(e);
            return { kind: "bad-data" }
        }
    }

    /**
     * Update calo consumed
     * @param data
     * 
     * @returns {Promise<ApiResponseMessage>}
     **/
    async updateCaloConsumed(data: IDataRequestUpdateCaloConsumed): Promise<{ kind: "ok", data: ApiResponseMessage } | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put("/daily-calo/calo-consumed/", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data
            return { kind: "ok", data: rawData }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" };
        }
    }

    /**
     * Delete calo intake
     * @param data
     * 
     * @returns {Promise<ApiResponseMessage>}
     * */
    async deleteCaloIntake(data: IDataRequestDeleteCaloIntake): Promise<ApiResponseMessage | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.delete("/daily-calo/calo-intake/", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data
            return rawData
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { message: "Bad data" }
        }
    }

    /**
     * Delete calo consumed
     * @param data
     * 
     * @returns {Promise<ApiResponseMessage>}
     * */
    async deleteCaloConsumed(data: IDataRequestDeleteCaloConsumed): Promise<ApiResponseMessage | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/daily-calo/calo-consumed/", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data
            return rawData
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { message: "Bad data" }
        }
    }

    /**
     * Get daily calo by date
     * @param date
     * 
     *  @returns {Promise<ApiResponseMessage>}
        * */

    async getDailyCaloByDate(date: string): Promise<{ kind: "ok", data: ApiResponseDailyCaloByDate } | GeneralApiProblem> {

        const response: ApiResponse<ApiResponseDailyCaloByDate> = await this.api.apisauce.get(`/daily-calo/by-date/?date=${date}`);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        try {
            const rawData = response.data
            return { kind: "ok", data: rawData }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" };
        }
    }

    async delete_Item_CaloIntake(data: {
        id: number,
        date: Date,
        type: 'food' | 'userFood' | 'meal' | 'userMeal'
    }): Promise<{ kind: 'ok' } | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/daily-calo/delete-item-calo-intake", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        return { kind: 'ok' }
    }

    async delete_Item_CaloConsumed(data: {
        id: number,
        date: Date,
    }): Promise<{ kind: 'ok' } | GeneralApiProblem> {
        const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/daily-calo/delete-item-calo-consumed", data);
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }
        return { kind: 'ok' }
    }
}
const dailyCaloApi = new DailyCaloApi(api)
export { dailyCaloApi }