<template>
  <!-- NAV -->
  <div id="tab-nav" class="w3-row">
    <div class="w3-col s2 m1 w3-hide-large">
      <button class="w3-center menu-button" @click="menuToggle()">
        <em class="fa fa-bars" style="font-size: 1.6em"></em>
      </button>
    </div>
    <div class="w3-col s5 m5 l4 tabs">
      <span class="">{{ title }}</span>
    </div>
    <button
      v-if="isInfoButtonShown"
      class="w3-col s1 m1 l1"
      style="border: 0 solid; width: 3em; height: 3em; background-color: #3e3e3e; font-size: 1em; color: #f4defe"
      value="Info"
      @click="emitInfoButton()"
    >
      <em class="fa fa-info-circle"></em>
    </button>

    <div class="w3-col s3 m5 l7 nick-name">
      <span class="">{{ user.username }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Cookies from "js-cookie";
import { onMounted, watchEffect, ref, inject } from "vue";
// import { useRoute } from "vue-router"

const emitter = inject("emitter");
const title = ref("");
const route = null;
// const route = useRoute()
const isInfoButtonShown = ref(false);
let mySideBar = null;
let viewContent = null;
let user = ref({});

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

watchEffect(() => {
  const userCookie = Cookies.get("user");
  if (userCookie !== undefined) user = JSON.parse(userCookie);
  // title.value = route.meta.title;

  emitter.on("updateInfoButton", (e) => {
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
#tab-nav {
  height: 3em;
  margin-left: 4em;
  color: #f4efde;
  background-color: #2b2b2b;
}

.menu-button {
  width: 100%;
  height: 0.6em;
  color: #f4efde;
  background-color: #2b2b2b;
  border: none;
}

.tabs {
  height: 3em;
  padding: 0.6em;
}

.nick-name {
  padding: 0.6em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: right;
}

@media only screen and (max-width: 601px) {
  #tab-nav {
    height: 3em;
    margin: 0;
  }

  .menu-button {
    height: 3em;
    background-color: #3e3e3e;
  }

  .tabs {
    display: block;
    height: 3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

@media only screen and (min-width: 601px) and (max-width: 993px) {
  #tab-nav {
    height: 3em;
    margin: 0;
  }

  .menu-button {
    height: 3em;
    background-color: #3e3e3e;
  }

  .tabs {
    display: block;
    height: 3em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .nick-name {
    padding: 0.6em;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: right;
  }
}

@media screen and (min-width: 993px) {
  .menu-button {
    display: none !important;
  }
}
</style>
