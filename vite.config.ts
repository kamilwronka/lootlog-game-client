import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import monkey, { cdn } from "vite-plugin-monkey";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "localhost",
    hmr: {
      port: 3000,
      protocol: "ws",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        icon: "https://vitejs.dev/logo.svg",
        namespace: "npm/vite-plugin-monkey",
        match: ["https://gordion.margonem.pl"],
      },
      build: {
        // externalGlobals: {
        //   react: cdn.jsdelivr("React", "umd/react.production.min.js"),
        //   "react-dom": cdn.jsdelivr(
        //     "ReactDOM",
        //     "umd/react-dom.production.min.js"
        //   ),
        // },
      },
    }),
  ],
});
