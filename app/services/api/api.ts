/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse, // @demo remove-current-line
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type {
  ApiConfig,
  ApiFeedResponse, // @demo remove-current-line
  ApiLoginResponse,
  ApiResponseMessage,
  ApiFetchDataResponse,
  ApiFetchDataUserInfoResponse
} from "./api.types"
import type { EpisodeSnapshotIn } from "../../models/Episode" // @demo remove-current-line
import { UpdateInfoUserRequest } from "../../interfaces/req-params.interface"


/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}


/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });

  }

  async setAuthToken(authToken: string) {
    this.apisauce.setHeader("Authorization", "Bearer " + authToken)
  }

  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: EpisodeSnapshotIn[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: EpisodeSnapshotIn[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  // @demo remove-block-end

  async register(email: string, password: string): Promise<{ kind: string; data: any } | GeneralApiProblem> {
    const response: ApiResponse<ApiResponseMessage> = await this.apisauce.post("/auth/register", { email, password });
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data }

  }

  async login(email: string, password: string) {
    const response: ApiResponse<ApiLoginResponse> = await this.apisauce.post("/auth/login", { email, password });
    console.log(response);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    this.apisauce.setHeader("Authorization", "Bearer " + response.data.accessToken)
    return { kind: "ok", data: response.data }
  }

  async fetchData(): Promise<{ kind: "ok", data: ApiFetchDataResponse } | GeneralApiProblem> {
    const response: ApiResponse<ApiFetchDataResponse> = await this.apisauce.get("/data");
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data }
  }

  async createUserInfo(data: UpdateInfoUserRequest): Promise<{ kind: "ok", data: string } | GeneralApiProblem> {
    const response: ApiResponse<ApiResponseMessage> = await this.apisauce.post("/users", data);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data.message }
  }

  async updateUserInfo(data: UpdateInfoUserRequest): Promise<{ kind: "ok", data: string } | GeneralApiProblem> {
    const response: ApiResponse<ApiResponseMessage> = await this.apisauce.put("/users", data);
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data.message }
  }

  async getUserInfo(): Promise<{ kind: "ok", data: ApiFetchDataUserInfoResponse } | GeneralApiProblem> {
    const response: ApiResponse<ApiFetchDataUserInfoResponse> = await this.apisauce.get("/users");
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }
    return { kind: "ok", data: response.data }
  }
}
// Singleton instance of the API for convenience
export const api = new Api()
