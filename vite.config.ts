import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  const conf = {
    envPrefix: "OIOTE",
    server: {
      port: parseInt(env.OIOTE_SERVER_PORT, 10),
      host: true,
      proxy: {
        [`/${env.OIOTE_API_BASE_ENDPOINT}`]: `http://localhost:${env.OIOTE_API_PORT}`,
      },
    },
    plugins: [vue()],
  };

  return conf;
});
