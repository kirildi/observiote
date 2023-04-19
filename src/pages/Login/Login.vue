<script setup lang="ts">
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  // import bcrypt from "bcryptjs"
  import Cookies from "js-cookie";
  import RestClient from "../../rest/RestClient";
  import { LoginDataInterface } from "../../interfaces/LoginDataInterface";

  const restClient = new RestClient();
  const router = useRouter();

  const errorHidden = ref(false);
  const formError = ref("");

  const username = ref("");
  const password = ref("");

  let isAuthenticated = false;

  // async function hashPassword(pass) {
  //   const saltRounds = 10
  //   const hashed = await bcrypt.hash(pass, saltRounds)
  //   return hashed
  // }

  function createPayload(): LoginDataInterface {
    const payload: LoginDataInterface = { username: username.value, password: password.value };
    return payload;
  }

  async function login() {
    const isUserNameValid = false;
    const isPasswordValid = false;

    const loginPayload = createPayload();

    const authRequest: any = restClient.login(loginPayload).catch((err) => {
      //TODO move inline error as separate component
      errorHidden.value = true;
      if (err.response !== undefined) {
        formError.value = `*${err.response.status} ${err.response.statusText}`;
      } else {
        formError.value = `*${err.message}`;
      }
      setTimeout(() => {
        errorHidden.value = false;
        formError.value = "";
      }, 10000);
    });

    //TODO fix this: temporary fix then() should be handled by restClient
    authRequest.then((res: any) => {
      if (res.status === 200) {
        isAuthenticated = true;

        // isUserNameValid = JSON.parse(authRequest.data.username)
        // isPasswordValid = JSON.parse(authRequest.data.password)

        //if (!isUserNameValid && !isPasswordValid) {}

        const userCookie = Cookies.get("user");

        const user: any = {
          username: res.data.username,
          authState: isAuthenticated,
        };

        if (userCookie === undefined) {
          Cookies.set("user", JSON.stringify(user), {
            sameSite: "strict",
            secure: false,
            expires: 1,
          });
        }

        Cookies.set("token", res.data.token);
        router.replace("/devices");
        // }
        // if (!isUserNameValid) {
        //   const e = Error("Wrong username");
        //   throw e.message;
        // }
        // if (!isPasswordValid) {
        //   const e = Error("Wrong password");
        //   throw e.message;
        // }
        // if (!isUserNameValid && !isPasswordValid) {
        //   const e = Error("Wrong username and password");
        //   throw e.message;
        // }
      }
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
        <div v-show="errorHidden" class="w-full h-1/3 text-left mt-4 p-4 text-red-500 text-base">
          {{ formError }}
        </div>
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
