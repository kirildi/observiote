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
    <button v-if="isInfoButtonShown" class="w-16 h-16 p-4 decoration-zinc-50 text-xl" value="Info" @click="emitInfoButton()">
      <em class="fa fa-info-circle"></em>
    </button>

    <div class="w-2/12 h-16 p-4 decoration-zinc-50 text-xl">
      <span class="">{{ user.username }}</span>
    </div>
    <button class="w-16 h-16 bg-purple-600 text-xl" @click="logout">
      <em class="fa fa-sign-out"></em>
    </button>
  </header>
</template>
<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, watchEffect, ref, inject } from "vue";
// import { useRoute } from "vue-router"

const emitter: any = inject("emitter");
const title = ref("");
const route = null;
// const route = useRoute()
const isInfoButtonShown = ref(false);
let mySideBar = null;
let viewContent = null;
let user = ref({ username: "User" });

function menuToggle() {
  // if (mySideBar.style.display === "block") {
  //   mySideBar.style.display = "none";
  // } else {
  //   mySideBar.style.display = "block";
  // }
}

function emitInfoButton() {
  emitter.emit("infoButton", true);
}

function logout(): any {
  emitter.emit("logout", true);
}

watchEffect(() => {
  const userCookie = Cookies.get("user");
  if (userCookie !== undefined) user = JSON.parse(userCookie);
  // title.value = route.meta.title;

  emitter.on("updateInfoButton", (e: any) => {
    isInfoButtonShown.value = e;
  });
});
onMounted(() => {
  mySideBar = document.getElementById("mySidebar");
  // eslint-disable-next-line prefer-destructuring
  viewContent = document.getElementsByClassName("view-content")[0];
});
</script>

<style scoped>
.nick-name {
  padding: 0.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}
</style>
