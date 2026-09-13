import { defineConfig } from "vite";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
	base: "/",
	server: {
	    port: 3000,
	},
	plugins: [
		eslint({
			cache: false,
			include: ['../src/**/*.js'],
		    exclude: ['../config/**/*.js'],
		})
	],
	build: {
		outDir: "./tmp",
		target: "esnext",
		minify: "terser",
		cssCodeSplit: false,
		terserOptions: {
			keep_classnames: false,
			keep_fnames: false,
			mangle:{
				properties: false,
				toplevel: true
			}
		},
		rollupOptions: {
			input: "src/js/main.js",
			output: {
				inlineDynamicImports: true,
				format: "iife",
				name: "TBD",
				entryFileNames: `[name].js`,
				assetFileNames: `[name][extname]`,
			},
		}
	}
});