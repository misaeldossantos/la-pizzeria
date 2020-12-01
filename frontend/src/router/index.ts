import { route } from "quasar/wrappers";
import VueRouter from "vue-router";
import routes from "./routes";
import * as dayjs from 'dayjs'
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
// Custom parse (DD/MM/YYYY recognized)
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

// Localized format (for PT-BR)
require('dayjs/locale/pt-br')
dayjs.extend(localizedFormat as any)

// Min - max functions
const minMax = require('dayjs/plugin/minMax')
dayjs.extend(minMax)


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default route(function({ Vue }) {
  Vue.use(VueRouter);

  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    if(to.meta.public) {
      next()
      return;
    }

    let registered = window.localStorage["token"];

    if (!registered && to.fullPath !== "/login") {
      next("/login");
      return;
    }

    next();
  });

  return Router;
});
