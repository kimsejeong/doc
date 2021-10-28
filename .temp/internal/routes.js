/**
 * Generated by "@vuepress/internal-routes"
 */

import { injectComponentOption, ensureAsyncComponentsLoaded } from '@app/util'
import rootMixins from '@internal/root-mixins'
import GlobalLayout from "C:\\Users\\zhangtianqi\\Desktop\\docs\\node_modules\\@vuepress\\core\\lib\\client\\components\\GlobalLayout.vue"

injectComponentOption(GlobalLayout, 'mixins', rootMixins)
export const routes = [
  {
    name: "v-72ef0c49",
    path: "/pages/flutter/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-72ef0c49").then(next)
    },
  },
  {
    path: "/pages/flutter/index.html",
    redirect: "/pages/flutter/"
  },
  {
    name: "v-0f5d5851",
    path: "/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-0f5d5851").then(next)
    },
  },
  {
    path: "/index.html",
    redirect: "/"
  },
  {
    name: "v-e8ca3cae",
    path: "/pages/react/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-e8ca3cae").then(next)
    },
  },
  {
    path: "/pages/react/index.html",
    redirect: "/pages/react/"
  },
  {
    name: "v-21308f0a",
    path: "/pages/vue/diff.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-21308f0a").then(next)
    },
  },
  {
    name: "v-5fea49ee",
    path: "/pages/vue/",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-5fea49ee").then(next)
    },
  },
  {
    path: "/pages/vue/index.html",
    redirect: "/pages/vue/"
  },
  {
    name: "v-6b6ec7a0",
    path: "/pages/vue/react.html",
    component: GlobalLayout,
    beforeEnter: (to, from, next) => {
      ensureAsyncComponentsLoaded("Layout", "v-6b6ec7a0").then(next)
    },
  },
  {
    path: '*',
    component: GlobalLayout
  }
]