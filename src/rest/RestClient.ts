import axios, { AxiosInstance } from "axios";
import { host, endpoint } from "../config";
import { LoginDataInterface } from "../interfaces/LoginDataInterface";

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
  login = async (payload: LoginDataInterface) => {
    //TODO should return iterface or type describing the response data, also handles the error
    return await this.#axiosInstance.post(endpoint.loginEndpoint, JSON.stringify(payload));
  };

  #axiosInstance: AxiosInstance;
}
