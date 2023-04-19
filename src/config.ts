import { ApiHostInterface } from "./interfaces/ApiHostInterface";
import { ApiEndpointInterface } from "./interfaces/ApiEndpointInterface";

const HOST_URL = import.meta.env.PROD ? import.meta.env.OIOTE_API_HOST : "localhost";

export const host: ApiHostInterface = { uri: `http://${HOST_URL}:${import.meta.env.OIOTE_API_PORT}/${import.meta.env.OIOTE_API_BASE_ENDPOINT}` };

export const endpoint: ApiEndpointInterface = {
  loginEndpoint: "auth_service",
  deviceEndpoint: "device_service",
  sensorEndpoint: "sensor_service",
};
