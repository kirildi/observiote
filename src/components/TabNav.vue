<script setup lang="ts">
  import Cookies from "js-cookie";
  import { onMounted, watchEffect, ref, inject } from "vue";
  import { emitterKey } from "../globals/emitterKey";

  const emitter = inject(emitterKey);
  const title = ref("");

  const isInfoButtonShown = ref(false);
  let mySideBar = null;
  let viewContent = null;
  let user = ref({ username: "User" });

  function emitInfoButton() {
    emitter?.emit("infoButtonState", true);
  }

  watchEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie !== undefined) user = JSON.parse(userCookie);
    // title.value = route.meta.title;

    emitter?.on("updateInfoButton", (e: boolean) => {
      isInfoButtonShown.value = e;
    });
  });
  onMounted(() => {
    mySideBar = document.getElementById("mySidebar");
    viewContent = document.getElementsByClassName("view-content")[0];
  });
</script>

<template>
  <!-- NAV -->
  <header id="tab-nav" class="container flex h-16 bg-zinc-800">
    <div class="w-16 h-16 p-1 text-center">
      <!-- <div class="w-16 h-8">
        <img src="../../assets/logo.png" alt="img" class="" />
      </div> -->
      <div class="w-16 h-6">
        <span>OIOTe</span>
      </div>
    </div>

    <div class="w-10/12 h-16 p-4 decoration-zinc-50 text-xl">
      <span class="tabs">{{ title }}</span>
    </div>
    <button v-if="isInfoButtonShown" class="w-16 h-16 p-4 bg-zinc-600 decoration-zinc-50 text-xl" value="Info" @click="emitInfoButton()">
      <em class="fa fa-info-circle"></em>
    </button>

    <div class="w-2/12 h-16 p-4 bg-zinc-700 decoration-zinc-50 text-xl overflow-hidden whitespace-nowrap text-ellipsis">
      <span class="">{{ user.username }}</span>
    </div>
  </header>
</template>

<style scoped>
  .nick-name {
    padding: 0.6em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
</style>
