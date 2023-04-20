<script setup lang="ts">
  import { ref } from "vue";

  const errorContent = ref("");

  const props = defineProps<{
    open: boolean;
    errorContent?: string;
  }>();

  errorContent.value = props.errorContent ?? "";

  // errorHidden.value = true;
  // if (err.response !== undefined) {
  //   formError.value = `*${err.response.status} ${err.response.statusText}`;
  // } else {
  //   formError.value = `*${err.message}`;
  // }
  // setTimeout(() => {
  //   errorHidden.value = false;
  //   formError.value = "";
  // }, 10000);
</script>
<template>
  <div v-show="open" class="w-full h-1/3 text-left mt-4 p-4 text-red-500 text-base">
    {{ errorContent }}
  </div>
</template>
<style scoped></style>
