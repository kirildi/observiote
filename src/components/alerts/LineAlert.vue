<script setup lang="ts">
  import { ref, watchEffect } from "vue";

  const errorContent = ref("");
  const isOpen = ref(false);

  const props = defineProps<{
    open: boolean;
    errorContent?: string;
  }>();

  watchEffect(() => {
    isOpen.value = props.open;
    errorContent.value = props.errorContent ?? "";
    setTimeout(() => {
      isOpen.value = false;
      errorContent.value = "";
    }, 10000);
  });
</script>
<template>
  <div v-show="isOpen" class="w-full h-1/3 text-left mt-4 p-4 text-red-500 text-base">
    {{ errorContent }}
  </div>
</template>
<style scoped></style>
