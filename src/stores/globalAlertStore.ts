import { defineStore } from "pinia";
import { AlertStateInterface } from "../interfaces/AlertStateInterface";
import { GlobalAlertTypeEnum } from "../enums/GlobalAlertTypeEnum";

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
      this.alertType = GlobalAlertTypeEnum.error;
      this.alertCode = payload.alertCode;
      this.alertMessage = payload.alertMessage;
      this.triggered = true;
    },
    clearAlert() {
      this.alertType = "";
      this.alertCode = "";
      this.alertMessage = "";
      this.triggered = false;
    },
  },
});
