import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import mitt from "mitt"; // Import mitt
import router from "./router";
import App from "./App.vue";
import { emitterKey } from "./globals/emitterKey";
import { Events } from "./types/Events";

const emitter = mitt<Events>();
const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.provide(emitterKey, emitter);
app.mount("#app");
