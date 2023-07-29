<script setup lang="ts">
  import { Ref, onMounted, ref, watchEffect } from "vue";
  import { SensorDataValue } from "../../types/SensorDataType";

  const props = defineProps<{
    id: number | string;
    type?: string;
    data: SensorDataValue[];
  }>();
  const dataNow: Ref<SensorDataValue[]> = ref([]);
  function verifySensorData(dataObj: SensorDataValue[]): SensorDataValue[] {
    if (dataObj[0] === undefined) return [{ max: 0, min: 0, now: 0, stringVal: "0" }];
    return dataObj;
  }
  onMounted(() => {});
  watchEffect(() => {
    dataNow.value = verifySensorData(props.data);
  });
</script>
<template>
  <div class="date__time__container relative flex flex-row justify-center items-center h-24">
    <span class="text-2xl"> {{ dataNow[0]?.stringVal ?? 0 }}</span>
  </div>
</template>
<style scoped></style>
