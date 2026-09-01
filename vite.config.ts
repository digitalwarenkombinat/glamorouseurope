import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/glamorouseurope/",
  build: {
    assetsDir: "",
  },
  plugins: [react()],
});
