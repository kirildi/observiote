import { SensorTypeInterface } from "./SensorTypeInterface";

export interface SensorInterface {
  sensorId: string;
  sensorTypeId: SensorTypeInterface;
  sensorDescription: string;
  sensorCoordinates: string;
  sensorCoordinatesRange: string;
  deviceId: string;
}
