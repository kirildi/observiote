import { defineStore } from "pinia";
import { DeviceInterface } from "../interfaces/DeviceInterface";
import RestClient from "../rest/RestClient";
import { OIOTEResponseType } from "../types/OIOTEResponseType";

export const useDeviceStore = defineStore("device", {
  state: () => ({
    deviceList: [] as DeviceInterface[],
    storageItem: "deviceList",
  }),

  actions: {
    fetch(): Promise<OIOTEResponseType> {
      return new Promise(async (resolve, reject) => {
        const restClient = new RestClient();
        try {
          const deviceRequest: OIOTEResponseType = await restClient.fetchDevices(this.storageItem);

          const storedDevices = sessionStorage.getItem(this.storageItem) ?? "";

          if (deviceRequest.status === "error" || !storedDevices) reject({ id: "error", status: "000", statusText: "No stored devices found. Try to reload page" });

          this.deviceList = JSON.parse(storedDevices);
          resolve(deviceRequest);
        } catch (err: any) {
          // invoked when, for example there is no network, or API service is down
          reject(err);
        }
      });
    },

    readByDeviceId(devId: string): DeviceInterface | undefined {
      const storedDevices = sessionStorage.getItem(this.storageItem) ?? "";

      if (this.deviceList.length === 0) {
        this.deviceList = JSON.parse(storedDevices);
      }

      return this.deviceList.find((entry) => entry.deviceId === devId) ?? undefined;
    },
  },
});
