import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { host, endpoint } from "../config";
import { LoginDataInterface } from "../interfaces/LoginDataInterface";
import { OIOTEResponseType } from "../types/OIOTEResponseType";
import { UserInterface } from "../interfaces/UserInterface";
import Cookies from "js-cookie";

export default class RestClient {
  constructor() {
    this.#axiosInstance = axios.create({
      baseURL: host.uri,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }
  loginRequest = (payload: LoginDataInterface): Promise<OIOTEResponseType> => {
    return new Promise((resolve, reject) => {
      const actionPost = async () => {
        try {
          const response = await this.#axiosInstance.post(endpoint.loginEndpoint, JSON.stringify(payload));
          const successType: OIOTEResponseType = { id: "success", status: response.status, statusText: response.statusText };

          this.#isUserAuthenticated = true;
          let user: UserInterface = { username: response.data.username, authState: this.#isUserAuthenticated, token: response.data.token };
          let userCookie = Cookies.get("user");

          if (userCookie === undefined) {
            Cookies.set("user", JSON.stringify(user), {
              sameSite: "strict",
              secure: false,
              expires: 1,
            });
          }

          resolve(successType);
        } catch (error: any) {
          const errorType: OIOTEResponseType = { id: "error", status: error.response.status, statusText: error.response.statusText };
          reject(errorType);
        }
      };

      actionPost();
    });
  };

  #axiosInstance: AxiosInstance;
  #isUserAuthenticated = false;
}
