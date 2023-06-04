import { Api, api } from "../api";
import { GeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import { IDataRequestWaterLog } from "../../../interfaces/req-params.interface";
import type { ApiResponseMessage, ApiResponseWaterLog } from "../api.types"

/**

Quản lý các yêu cầu API liên quan đến WaterLog.
*/
export class WaterLogApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    /**
    
    Tạo một mới.
    */
    async createWaterLog(data: IDataRequestWaterLog): Promise<{ kind: "ok"; data: string } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.post("/water-log", data);
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
    async updateWaterLog(data: IDataRequestWaterLog): Promise<{ kind: "ok"; data: string, status: number } | { kind: "bad-data", status: number } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseMessage> = await this.api.apisauce.put("/water-log", data);
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
    async deleteWaterLog(id: number): Promise<{ kind: "ok" } | GeneralApiProblem> {
        try {
            const response = await this.api.apisauce.delete(`/water-log/${id}`);
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
    
    lấy thông tin lượng nước uống trong ngày.
    */
    async getWaterLogByDate(date: string): Promise<{ kind: "ok", data: ApiResponseWaterLog } | GeneralApiProblem> {
        try {
            const response: ApiResponse<ApiResponseWaterLog> = await this.api.apisauce.get(`/water-log/?date=${date}`);
            if (response.ok) {
                return { kind: "ok", data: response.data };
            } else {
                return { kind: "bad-data" };
            }
        } catch (error) {
            return { kind: "bad-data" };
        }
    }
}

export const waterLogApi = new WaterLogApi(api);