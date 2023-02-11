import { createApp } from 'vue'
import './style.css'
 import axios from "axios"
import mitt from "mitt" // Import mitt
import router from "./router"
// import store from "./store"
import App from "./App.vue"
// import GlobalError from "./components/main/GlobalError.vue"

const emitter = mitt()
createApp(App)
  .use(router, axios)
//   .use(store)
//   .component("GlobalError", GlobalError)
  .provide("emitter", emitter)
  .mount("#app")

