import axios, { AxiosInstance } from "axios";
import { host, endpoint } from "../config";
import { LoginDataInterface } from "../interfaces/LoginDataInterface";

export default class RestClient {
  constructor() {
    console.log(host);

    this.#axiosInstance = axios.create({
      baseURL: host.uri,
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  }
  login = async (payload: LoginDataInterface) => {
    await this.#axiosInstance.post(endpoint.loginEndpoint, JSON.stringify(payload));
  };
  #axiosInstance: AxiosInstance;
}
