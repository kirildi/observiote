<script setup lang="ts">
import { ref } from "vue";
//import { useRouter } from "vue-router"
// import bcrypt from "bcryptjs"
//import Cookies from "js-cookie";
//import { HTTP } from "../components/httpObject.js"
//const router = useRouter()

const errorHidden = ref(false);
const formError = ref("");

const username = ref("");
const password = ref("");

const loginData = {
  username,
  password,
};

// async function hashPassword(pass) {
//   const saltRounds = 10
//   const hashed = await bcrypt.hash(pass, saltRounds)
//   return hashed
// }

function createHttpBody() {
  return `{
        "username":"",
        "password":""
      }`;
}

async function login() {
  const isUserNameValid = false;
  const isPasswordValid = false;
  //loginData.username = username.value
  //loginData.password = password.value

  //const authData = createHttpBody(loginData);

  // const authRequest = await HTTP.post(
  //   "/iotpp/rest/auth_service",
  //   authData
  // ).catch(() => {
  //   errorHidden.value = true;
  //   if (err.response !== undefined) {
  //     formError.value = `*${err.response.status} ${err.response.statusText}`;
  //   } else {
  //     formError.value = `*${err.message}`;
  //   }
  //   setTimeout(() => {
  //     errorHidden.value = false;
  //     formError.value = "";
  //   }, 10000);
  // });
  /*
  if (authRequest.statusText === "OK") {
    // isUserNameValid = JSON.parse(authRequest.data.username)
    // isPasswordValid = JSON.parse(authRequest.data.password)

    if (!isUserNameValid && !isPasswordValid) {
      // store.commit("loginStore/setAuthState");

      const userCookie = Cookies.get("user");
      const user = {
        username: loginData.username,
        //authState: store.state.loginStore.isAuthenticated,
      };
      if (userCookie === undefined) {
        Cookies.set("user", user, {
          sameSite: "strict",
          secure: false,
          expires: 1,
        });
      }
      // Cookies.set("token", authRequest.data.token)

      Cookies.set("token", authRequest.data.token);
      //router.replace("/devices");
    }
    if (!isUserNameValid) {
      const e = Error("Wrong username");
      throw e.message;
    }
    if (!isPasswordValid) {
      const e = Error("Wrong password");
      throw e.message;
    }
    if (!isUserNameValid && !isPasswordValid) {
      const e = Error("Wrong username and password");
      throw e.message;
    }*/
  // store.commit("loginStore/unSetAuthState")
}
</script>

<template>
  <div class="login">
    <div class="login-header">
      <h2 style="">ObservIoTe</h2>
    </div>

    <form class="w3-row login-form" action="/login" @submit.prevent="login">
      <div class="w3-row">
        <input
          id="username"
          v-model="username"
          type="text"
          placeholder="Username"
          class="w3-align-left input-field"
          required="true"
        />
        <input
          id="pass"
          v-model="password"
          type="password"
          placeholder="Password"
          class="w3-align-left input-field"
          required="true"
        />
      </div>
      <div
        v-show="errorHidden"
        class="w3-row"
        style="color: #f55; font-size=1em; text-align: left; padding: 1em"
      >
        {{ formError }}
      </div>

      <div class="w3-row">
        <input
          class="login-button"
          type="submit"
          value="Enter"
          style=""
          @submit="login"
        />
      </div>
    </form>
  </div>
</template>

<style scoped>
.login {
  width: 30vw;
  height: auto;
  margin: 25vh auto;
  padding: 1em;
  border-radius: 1em;
  color: #f4efde;
  background-color: #3a3a3a;
}

.login-header {
  font-size: 3em;
}
.login-form {
  height: 86%;
}

.input-field {
  width: 90%;
  height: 3.9em;
  margin: 0.6em;
  padding: 1em;
  border-radius: 0.4em;
}

.login-button {
  width: 12em;
  height: 4em;
  margin-top: 2em;
  background-color: #1a803d;
  color: #f4efde;
  border-radius: 0.4em;
  border: none;
}

@media only screen and (max-width: 601px) {
  .login {
    width: 90%;
    height: auto;
    margin-top: 10%;
  }
}

@media only screen and (min-width: 601px) and (max-width: 993px) {
  .login {
    width: 50%;
    height: auto;
  }
}

@media only screen and (min-width: 993px) {
}
</style>
