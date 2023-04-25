<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  import RestClient from "../../rest/RestClient";
  import LineAlert from "../../components/alerts/LineAlert.vue";
  import { LoginDataInterface } from "../../interfaces/LoginDataInterface";
  import { OIOTEResponseType } from "../../types/OIOTEResponseType";

  const restClient = new RestClient();
  const router = useRouter();

  const open = ref(false);
  const errorContent = ref("");

  const username = ref("");
  const password = ref("");

  function createPayload(): LoginDataInterface {
    return { username: username.value, password: password.value };
  }

  function login() {
    const loginPayload = createPayload();

    const authRequest: Promise<OIOTEResponseType> = restClient.loginRequest(loginPayload);

    authRequest
      .then((res) => {
        router.replace("/devices");
      })
      .catch((err) => {
        open.value = true;
        errorContent.value = `*${err.status}: ${err.statusText}`;
      });
  }
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <form class="login w-5/6 h-3/6 md:w-4/6 xl:w-4/12 p-8 rounded-xl" action="/login" @submit.prevent="login">
      <div class="w-full h-1/5 text-center text-2xl font-semibold">
        <h2>ObservIoTe Login</h2>
      </div>
      <div class="w-full h-3/5">
        <div class="w-full h-2/3">
          <input id="username" v-model="username" type="text" placeholder="Username" class="w-full h-1/2 mb-4 p-4 rounded-xl bg-zinc-800 focus:outline-none focus:outline-zinc-400" required="true" />
          <input id="pass" v-model="password" type="password" placeholder="Password" class="w-full h-1/2 mb-4 p-4 rounded-xl bg-zinc-800 focus:outline-none focus:outline-zinc-400" required="true" />
        </div>
        <line-alert :open="open" :error-content="errorContent" />
      </div>
      <div class="w-full h-1/5 text-center">
        <input class="h-16 px-12 py-1 bg-green-800 rounded-xl text-xl" type="submit" value="Enter" @submit="login" />
      </div>
    </form>
  </div>
</template>

<style scoped>
  .login {
    color: #f4efde;
    background-color: #303030;
  }
</style>
