import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import { IDataRequestWeightLog } from "../../../interfaces/req-params.interface";
import type { ApiGetAllWeightLogResponse, ApiResponseMessage, ApiResponseWeightLogByDate } from "../api.types"
import { WeightLogSnapshotIn } from "../../../models/WeightLog"
/**

Quản lý các yêu cầu API liên quan đến WeightLog.
*/
export class WeightLogApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    /**
    
    Tạo một mới.
    */
    async createWeightLog(data: IDataRequestWeightLog): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/weight-log", data);
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
    
    Cập nhật thông tin một.
    */
    async updateWeightLog(data: IDataRequestWeightLog): Promise<{ kind: "ok"; data: string, status: number } | { kind: "bad-data", status: number } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put("/weight-log", data);
            if (response.ok) {
                return { kind: "ok", status: response.status, data: response.data.message };
            } else {
                return { kind: "bad-data", status: response.status };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    
    Xóa một.
    */
    async deleteWeightLog(id: number): Promise<{ kind: "ok" } | GeneralApiProblem> {
        try {
            const response = await this.api.apisauce.delete(`/weight-log/${id}`);
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
    
    lấy thông tin lịch sử cân nặng theo ngày.
    */
    async getWeightLogByDate(date: string): Promise<{ kind: "ok", data: ApiResponseWeightLogByDate } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseWeightLogByDate> = await this.api.apisauce.get(`/weight-log/?date=${date}`);
            if (response.ok) {
                return { kind: "ok", data: response.data };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }

    /**
    
    lấy tất cả thông tin lịch sử cân nặng.
    */

    async getWeightLogAll(): Promise<{ kind: "ok", weightLogs: WeightLogSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetAllWeightLogResponse> = await this.api.apisauce.get("/weight-log/");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            const rawData = response.data

            // This is where we transform the data into the shape we expect for our MST model.
            const weightLogs: WeightLogSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
            }))

            return { kind: "ok", weightLogs }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }

    }
}

export const weightLogApi = new WeightLogApi(api);