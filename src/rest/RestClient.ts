import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { host, endpoint } from "../config";
import { LoginDataInterface } from "../interfaces/LoginDataInterface";
import { OIOTEResponseType } from "../types/OIOTEResponseType";
import { UserInterface } from "../interfaces/UserInterface";
import Cookies from "js-cookie";
// import bcrypt from "bcryptjs"

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
          let user: UserInterface = { username: payload.username, authState: this.#isUserAuthenticated, token: response.data.token };
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

  fetchDevices = (storageEntry: string): Promise<OIOTEResponseType> => {
    return new Promise((resolve, reject) => {
      let userCookie: UserInterface = JSON.parse(Cookies.get("user") ?? "");
      const noUserError = { id: "error", status: "*", statusTest: "No user is found! Try re-login again." };
      if (!userCookie) {
        reject(noUserError);
      }

      const actionPost = async () => {
        try {
          const requestBody = { authToken: userCookie.token }; //TODO this could be Device id to request for
          const response = await this.#axiosInstance.post(endpoint.deviceEndpoint, JSON.stringify(requestBody), {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${userCookie.token}`,
            },
          });
          this.#setSessionStore(storageEntry, response.data);

          const successType: OIOTEResponseType = { id: "success", status: response.status, statusText: response.statusText };
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
  #setSessionStore = (newStoreEntry: string, responseData: any) => {
    sessionStorage.setItem(newStoreEntry, JSON.stringify(responseData));
  };
}
