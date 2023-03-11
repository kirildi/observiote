<script setup lang="ts">
import { useRouter } from "vue-router";
// import { useStore } from "vuex"
import Cookies from "js-cookie";

const router = useRouter();
// const store = useStore()

const store = null;
function logout() {
  // TODO may be could notify the server that user is logged out
  // store.commit("loginStore/unSetAuthState");

  Cookies.remove("user");
  Cookies.remove("token");
  router.replace({ name: "login" });
}
</script>

<template>
  <!-- Sidebar/menu -->
  <div id="mySidebar" class="absolute top-1/4">
    <ul>
      <router-link :to="{ name: 'devices' }">
        <li class="w-16 h-16 my-4 p-4 bg-zinc-700 hover:bg-zinc-800 rounded-r-xl">
          <em class="fa fa-server fa-fw text-2xl"> </em>
          <span class="hidden">Devices</span>
        </li>
      </router-link>
      <router-link :to="{ name: 'locations' }">
        <li class="w-16 h-16 my-4 p-4 bg-zinc-700 hover:bg-zinc-800 rounded-r-xl">
          <em class="fa fa-globe fa-fw text-2xl"> </em>
          <span class="hidden">Locations</span>
        </li>
      </router-link>
      <router-link :to="{ name: 'logs' }">
        <li class="w-16 h-16 my-4 p-4 bg-zinc-700 hover:bg-zinc-800 rounded-r-xl">
          <em class="fa fa-clone fa-fw text-2xl"> </em>
          <span class="hidden">Logs</span>
        </li>
      </router-link>
      <router-link :to="{ name: 'configuration' }">
        <li class="w-16 h-16 my-4 p-4 bg-zinc-700 hover:bg-zinc-800 rounded-r-xl">
          <em class="fa fa-cog fa-fw text-2xl"> </em>
          <span class="hidden">Configuration</span>
        </li>
      </router-link>
      <button class="w-16 h-16 mb-4 p-4 bg-purple-600 hover:bg-purple-800 rounded-r-xl" @click="logout">
        <em class="fa fa-sign-out text-2xl"></em>
      </button>
    </ul>
  </div>
</template>

<style scoped></style>
