<script setup lang="ts">
import { ref } from "vue";
import SideBar from "../../components/main/SideBar.vue";
import TabNav from "../../components/main/TabNav.vue";

const isLoggedIn = ref(true);
</script>
<template>
  <!-- PAGE CONTENT! -->
  <div v-if="!isLoggedIn" class="view-container">
    <router-view />
  </div>

  <div v-else class="view-container">
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
