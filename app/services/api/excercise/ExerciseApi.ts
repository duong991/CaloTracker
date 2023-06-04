import { Api, api } from "../api";
import { GeneralApiProblem, getGeneralApiProblem } from "../apiProblem";
import { ApiResponse } from "apisauce";
import { ExerciseSnapshotIn } from "../../../models/Exercise"
import { ApiGetExerciseResponse } from "../api.types"
/**

Quản lý các yêu cầu API liên quan đến Exercise.
*/
export class ExerciseApi {
    private api: Api;

    constructor(api: Api) {
        this.api = api;
    }

    /**
    
    Lấy danh sách các bài tập của hệ thống
    */

    async getExercises(): Promise<{ kind: "ok", exercises: ExerciseSnapshotIn[] } | GeneralApiProblem> {
        const response: ApiResponse<ApiGetExerciseResponse> = await this.api.apisauce.get("/system/exercise");
        if (!response.ok) {
            const problem = getGeneralApiProblem(response)
            if (problem) return problem
        }

        try {
            const rawData = response.data

            // This is where we transform the data into the shape we expect for our MST model.
            const exercises: ExerciseSnapshotIn[] = rawData.items.map((raw) => ({
                ...raw,
            }))

            return { kind: "ok", exercises }
        } catch (e) {
            if (__DEV__) {
                console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
            }
            return { kind: "bad-data" }
        }

    }
}

export const exerciseApi = new ExerciseApi(api)