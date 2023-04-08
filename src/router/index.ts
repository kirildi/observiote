import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Cookies from "js-cookie";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "dashboard",
    props: true,
    meta: { requiresAuth: true, title: "Dashboard" },
    component: () => import("../pages/Device/Device.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { requiresAuth: false, title: "Login" },
    component: () => import("../pages/Login/Login.vue"),
  },
  {
    path: "/devices",
    name: "devices",
    props: true,
    meta: { requiresAuth: true, title: "Devices" },
    component: () => import("../pages/Device/Device.vue"),
  },
  {
    path: "/locations",
    name: "locations",
    meta: { requiresAuth: true, title: "Location" },
    component: () => {},
  },
  {
    path: "/logs",
    name: "logs",
    meta: { requiresAuth: true, title: "Logs" },
    component: () => {},
  },
  {
    path: "/configuration",
    name: "configuration",
    meta: { requiresAuth: true, title: "Configuration" },
    component: () => {},
  },
  {
    path: "/devices/:id",
    name: "device",
    meta: { requiresAuth: true, title: "" },
    props: true,
    component: () => import("../pages/SingleDevice/SingleDevice.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    meta: { requiresAuth: true },
    component: () => import("../pages/Login/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to) => {
  let isUser = false;
  const user = Cookies.get("user");

  if (user !== undefined) {
    isUser = JSON.parse(user).authState;
  }

  if (to.meta.requiresAuth && !isUser) {
    router.push({ name: "login" });
  }
  typeof to.meta.title === "string" ? (window.document.title = to.meta.title) : "ObservIoTe";
});

export default router;
