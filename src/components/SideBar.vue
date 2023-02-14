<template>
  <!-- Sidebar/menu -->
  <div id="mySidebar" class="w3-sidebar">
    <div class="w3-row w3-xlarge w3-center sidebar-box">
      <ul>
        <li>
          <router-link :to="{ name: 'devices' }" class="w3-bar-item">
            <em class="fa fa-server fa-fw"> </em>
            <span class="link-text">Devices</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'locations' }" class="w3-bar-item"
            ><em class="fa fa-globe fa-fw"> </em>
            <span class="link-text">Locations</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'logs' }" class="w3-bar-item"
            ><em class="fa fa-clone fa-fw"> </em>
            <span class="link-text">Logs</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'configuration' }" class="w3-bar-item"
            ><em class="fa fa-cog fa-fw"> </em>
            <span class="link-text">Configuration</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from "vue-router"
// import { useStore } from "vuex"
import Cookies from "js-cookie";

// const router = useRouter()
// const store = useStore()
const router = null;
const store = null;

function logout() {
  // store.commit("loginStore/unSetAuthState");
  // Cookies.remove("user");
  // Cookies.remove("token");
  // router.replace({ name: "login" });
}
</script>

<style scoped>
#mySidebar {
  display: block;
  width: 4em;
  position: relative;
  top: 0;
  left: 0;
  background-color: #2b2b2b;
  color: #f4efde;
}

.sidebar-header {
  background-color: #353839;
  padding: 0.6rem;
  border-radius: 0 0 16px 16px;
}

.sidebar-logo {
  width: 32px;
  height: 32px;
  margin-bottom: 12%;
  text-align: center;
}

.logo-text {
}

.sidebar-box {
  position: relative;
  top: 1em;
}

.sidebar-box a {
  height: 3em;
}

.user-logout-button {
  width: 100%;
  height: 3em;
  position: relative;
  top: 2em;
  font-size: 1.2em;
  background-color: #6f2232;
  color: #f4efde;
  text-align: center;
  border: 0 solid #000;
}

.user-logout-button:hover {
  color: #aaaaad;
  cursor: pointer;
}
.link-text {
  display: none;
  padding-left: 10px;
  text-align: center;
}
@media only screen and (max-width: 601px) {
  #mySidebar {
    display: none;
    position: relative !important;
    width: 100%;
    height: auto;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    margin-bottom: 0;
  }

  .logo-text {
    font-size: 21px;
  }

  .link-text {
    display: inline-block;
  }

  .sidebar-header {
    padding: 1em;
    background-color: #3e3e3e;
  }
  .sidebar-box {
    top: 0.4em;
    background-color: #3e3e3e;
  }

  .sidebar-box a {
    text-align: center;
    height: 2.6em;
    font-size: 0.8em;
    padding: 0.4em;
  }

  .user-logout-button {
    top: 0;
    width: 100%;
    height: 2em;
    font-size: 1.2em;
    border: 0 solid #000;
    margin-top: 12px;
  }
}

@media only screen and (min-width: 601px) and (max-width: 993px) {
  #mySidebar {
    display: none;
    position: relative !important;
    width: 100%;
    height: auto;
  }

  .sidebar-logo {
    width: 32px;
    height: 32px;
    margin-bottom: 0;
  }

  .link-text {
    display: inline-block;
  }

  .logo-text {
    font-size: 21px;
  }

  .sidebar-header {
    padding: 1em;
    background-color: #3e3e3e;
  }
  .sidebar-box {
    top: 0.4em;
    background-color: #3e3e3e;
  }

  .sidebar-box a {
    text-align: center;
    height: 2.6em;
    font-size: 0.8em;
    padding: 0.4em;
  }

  .user-logout-button {
    top: 0;
    width: 100%;
    height: 2em;
    font-size: 1.2em;
    border: 0 solid #000;
    margin-top: 12px;
  }
}
</style>
