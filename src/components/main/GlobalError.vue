<template>
  <div v-show="alertHidden" class="alert-container">
    <div :class="'w3-panel ' + alertProps.alertColor">
      <span>{{ alertProps.alertHeader }}[{{ alertProps.alertCode }}] - </span>
      <span v-for="message in alertProps.alertMessage" :key="message.id">
        {{ message }}
      </span>
    </div>
  </div>
</template>
<script>
import { reactive, ref, watchEffect } from "vue"
import { useStore } from "vuex"

export default {
  name: "GlobalError",
  props: {},
  setup() {
    const store = useStore()
    const alertHidden = ref(true)

    const alertProps = reactive({
      alertHeader: "ERROR",
      alertColor: "alert-error",
      alertCode: "0000",
      alertMessage: []
    })

    function handleAlert() {
      if (store.state.alertStore.alertType === "ERROR") {
        alertProps.alertHeader = "ERROR!"
        alertProps.alertColor = "alert-error"
      }
      if (store.state.alertStore.alertType === "WARNING") {
        alertProps.alertHeader = "WARNING!"
        alertProps.alertColor = "alert-warning"
      }
      alertProps.alertCode = store.state.alertStore.alertCode
      alertProps.alertMessage = store.state.alertStore.alertMessage
    }
    watchEffect(() => {
      if (store.state.alertStore.triggered) {
        handleAlert()

        alertHidden.value = true
      } else {
        alertHidden.value = false
      }
    })

    return {
      alertHidden,
      alertProps,
      handleAlert
    }
  }
}
</script>

<style scoped>
.alert-container {
  position: relative;
  top: 0;
  left: 0;
  margin: auto 4%;
  padding: 1%;
  width: 49%;
  height: auto;
  z-index: 1001;
  color: white;
}

.alert-error {
  color: #ff9090;
}
.alert-warning {
  color: #ffeb3b;
}
</style>
