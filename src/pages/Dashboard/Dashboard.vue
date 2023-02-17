<script setup lang="ts">
import { ref, watchEffect, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from "js-cookie";
import SideBar from "../../components/SideBar.vue";
import TabNav from "../../components/TabNav.vue";

const isLoggedIn = ref(false);
const emitter: any = inject("emitter");
const router = useRouter();
const route = useRoute();

watchEffect(() => {
  if (route.fullPath !== "/login") {
    isLoggedIn.value = true;
  } else {
    isLoggedIn.value = false;
  }

  emitter.on("logout", () => {
    logout();
  });
});

function logout() {
  // TODO may be should notify the server that user is logged out
  Cookies.remove("user");
  Cookies.remove("token");
  router.replace({ name: "login" });
}
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
