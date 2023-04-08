import { defineStore } from "pinia";
import { AlertState } from "../interfaces/AlertState";

export const useAlertsStore = defineStore("alerts", {
  state: (): AlertState => {
    return {
      triggered: false,
      alertType: "",
      alertCode: "",
      alertMessage: "",
    };
  },

  actions: {
    setError(payload: AlertState) {
      this.alertType = payload.alertType;
      this.alertCode = payload.alertCode;
      this.alertMessage = payload.alertMessage;
      this.triggered = true;
    },
    removeError() {
      this.alertType = "";
      this.alertCode = "";
      this.alertMessage = "";
      this.triggered = false;
    },
  },
});
