<script setup lang="ts">
  import { reactive, ref, watchEffect } from "vue";
  import { useAlertsStore } from "../../stores/globalAlertStore";
  import { GlobalAlertTypeEnum } from "../../enums/GlobalAlertTypeEnum";

  const store = useAlertsStore();
  const isAlertVisible = ref(true);

  const alertProps = reactive({
    alertHeader: `${GlobalAlertTypeEnum.error}`,
    alertColor: "alert-error",
    alertCode: "0000",
    alertMessage: "",
  });

  function handleAlert() {
    if (store.alertType === GlobalAlertTypeEnum.warning) {
      alertProps.alertHeader = `${GlobalAlertTypeEnum.error}: `;
      alertProps.alertColor = "alert-warning";
    }
    alertProps.alertCode = store.alertCode.toString();
    alertProps.alertMessage = store.alertMessage;
  }
  watchEffect(() => {
    if (store.triggered) {
      handleAlert();
      isAlertVisible.value = true;
    } else {
      isAlertVisible.value = false;
    }
  });
</script>
<template>
  <div v-show="isAlertVisible" class="container relative p-4">
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
