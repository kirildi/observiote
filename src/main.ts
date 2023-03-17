import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import axios from "axios";
import mitt from "mitt"; // Import mitt
import router from "./router";
import App from "./App.vue";

const emitter = mitt();
const pinia = createPinia();
const app = createApp(App);

app.use(router, axios);
app.use(pinia);
app.provide("emitter", emitter);
app.mount("#app");
