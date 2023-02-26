import axios, { AxiosInstance } from "axios";
 

let path = ""

if ( import.meta.env.PROD) {
  
  path = "http://192.168.0.100:8285"
} else {
  path = "http://localhost:8285"
}

export const HTTP: AxiosInstance = axios.create({
  baseURL: path,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json"
  }
})

 