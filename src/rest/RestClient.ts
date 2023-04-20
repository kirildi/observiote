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
  loginRequest = (payload: LoginDataInterface) => {
    const actionPost = async () => {
      return await this.#axiosInstance.post(endpoint.loginEndpoint, JSON.stringify(payload));
    };

    //TODO should return interface or type describing the response data, also handles the error
    actionPost()
      .then((response: any) => {
        return response;
      })
      .catch((err: any) => {
        return err;
      });
  };

  #axiosInstance: AxiosInstance;
}
