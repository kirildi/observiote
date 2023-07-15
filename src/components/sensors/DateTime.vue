<script setup lang="ts">
  import { onMounted, ref, watchEffect } from "vue";

  const props = defineProps<{
    id: number;
    type?: string;
    data: any[];
  }>();

  const dataNow = ref("");

  onMounted(() => {
    for (let i = 0; i < props.data.length; i += 1) {
      if (props.data[i].sensorId.sensorId === props.id) {
        dataNow.value = props.data[i].sensorData;
        break;
      }
    }
  });
  watchEffect(() => {
    for (let i = 0; i < props.data.length; i += 1) {
      if (props.data[i].sensorId.sensorId === props.id) {
        dataNow.value = props.data[i].sensorData;
        break;
      }
    }
  });
</script>
<template>
  <div class="date__time__container"></div>
</template>
<style scoped>
  .date-time-container {
    width: 100%;
    height: 100%;
  }
</style>
