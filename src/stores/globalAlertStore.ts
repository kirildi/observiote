import { defineStore } from "pinia";
import { AlertStateInterface } from "../interfaces/AlertStateInterface";

export const useAlertsStore = defineStore("alerts", {
  state: (): AlertStateInterface => {
    return {
      triggered: false,
      alertType: "",
      alertCode: "",
      alertMessage: "",
    };
  },

  actions: {
    setError(payload: AlertStateInterface) {
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
