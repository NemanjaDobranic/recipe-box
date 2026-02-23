import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "node:path";

const isGhPages = process.env.GH_PAGES === "true";
const repoName = "recipe-box";

export default defineConfig({
    base: isGhPages ? `/${repoName}/` : "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});