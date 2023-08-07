import { defineStore } from "pinia";
import { AlertStateInterface } from "../interfaces/AlertStateInterface";
import { GlobalAlertTypeEnum } from "../enums/GlobalAlertTypeEnum";
import { OIOTEResponseType } from "../types/OIOTEResponseType";

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
    setError(payload: OIOTEResponseType) {
      this.alertType = GlobalAlertTypeEnum.error;
      this.alertCode = payload.status;
      this.alertMessage = payload.statusText;
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
