<script setup lang="ts">
import { ref } from "vue";
import SideBar from "../../components/SideBar.vue";
import TabNav from "../../components/TabNav.vue";

const isLoggedIn = ref(true);
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
    <div class="view-content">
      <!-- <global-error /> -->
      <router-view />
    </div>
  </div>
</template>
<style scoped></style>
