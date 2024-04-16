import {defineConfig} from 'astro/config';
import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    site: 'https://sinoptik93.github.io',
    base: 'rent-dodopizza-landing',
    integrations: [
        react(),
        tailwind(),
    ],
    vite: {
        plugins: [
            svgr(),
        ]
    }
});
