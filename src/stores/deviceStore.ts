import { defineStore } from "pinia";
import { DeviceInterface } from "../interfaces/DeviceInterface";

export const useDeviceStore = defineStore("device", {
  state: () => ({
    deviceList: [] as DeviceInterface[],
  }),

  actions: {
    add(deviceItem: DeviceInterface) {
      this.deviceList.push(deviceItem);
    },
    read(devId: string): DeviceInterface | undefined {
      return this.deviceList.find((entry) => entry.deviceId === devId) ?? undefined;
    },
    updateStore(deviceData: DeviceInterface[]): void {
      this.deviceList = [...deviceData];
    },
  },
});
