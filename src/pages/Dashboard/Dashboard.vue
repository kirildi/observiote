<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import SideBar from "../../components/SideBar.vue";
import TabNav from "../../components/TabNav.vue";

const isLoggedIn = ref(false);
const route = useRoute();

watchEffect(() => {
  if (route.fullPath !== "/login") {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }
});
</script>
<template>
  <!-- PAGE CONTENT! -->
  <div v-if="!isLoggedIn" class="container h-screen">
    <router-view />
  </div>

  <div v-else class="container h-screen">
    <tab-nav />
    <side-bar />
    <!-- CONTENT -->
    <div class="view-content pl-24">
      <!-- <global-error /> -->
      <router-view />
    </div>
  </div>
</template>
<style scoped></style>
