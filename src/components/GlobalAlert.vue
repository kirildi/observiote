<script setup lang="ts">
import { reactive, ref, watchEffect } from "vue";
import { useAlertsStore } from "../stores/globalAlertStore";

const store = useAlertsStore();
const alertHidden = ref(true);

const alertProps = reactive({
  alertHeader: "ERROR",
  alertColor: "alert-error",
  alertCode: "0000",
  alertMessage: "",
});

function handleAlert() {
  if (store.alertType === "ERROR") {
    alertProps.alertHeader = "ERROR: ";
    alertProps.alertColor = "alert-error";
  }
  if (store.alertType === "WARNING") {
    alertProps.alertHeader = "WARNING: ";
    alertProps.alertColor = "alert-warning";
  }
  alertProps.alertCode = store.alertCode;
  alertProps.alertMessage = store.alertMessage;
}
watchEffect(() => {
  if (store.triggered) {
    handleAlert();
    alertHidden.value = true;
  } else {
    alertHidden.value = false;
  }
});
</script>
<template>
  <div v-show="alertHidden" class="container relative p-4">
    <div :class="alertProps.alertColor">
      <span>{{ alertProps.alertHeader }}[{{ alertProps.alertCode }}]: </span>
      <span>{{ alertProps.alertMessage }}</span>
    </div>
  </div>
</template>
<style scoped>
.alert-error {
  color: #ff9090;
}
.alert-warning {
  color: #ffeb3b;
}
</style>
