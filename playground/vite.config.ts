import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
// @ts-ignore: the plugin should not be checked in the playground
import VueRouter from '../src/vite'
import {
  getFileBasedRouteName,
  getPascalCaseRouteName,
  VueRouterExports,
  RuntimeExports,
} from '../src'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  clearScreen: false,
  build: {
    sourcemap: true,
  },
  // optimizeDeps: {
  //   exclude: ['ufo', 'mlly', 'magic-string', 'fsevents'],
  // },

  plugins: [
    Vue({}),
    VueRouter({
      dataFetching: true,
      routesFolder: [
        // can add multiple routes folders
        {
          src: 'src/pages',
          // can even add params
          // path: ':lang/',
        },
        {
          src: 'src/features/**/routes',
        },
        {
          src: 'src/docs',
          path: 'docs/:lang/',
        },
      ],
      logs: true,
      // getRouteName: getPascalCaseRouteName,
      exclude: [
        'ignored',
        '**/__*',
        '**/__**/*',
        // resolve(__dirname, './src/pages/ignored'),
        //
        // './src/pages/**/*.spec.ts',
      ],
    }),
    AutoImport({
      imports: [
        {
          'vue-router/auto': VueRouterExports,
          // 'unplugin-vue-router/runtime': RuntimeExports,
        },
      ],
    }),
    Inspect(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
