import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: "/usuarios", component: () => import("pages/usuarios/Index.vue") },
      { path: "/mesas", component: () => import("pages/mesas/Index.vue") },
      { path: "/produtos", component: () => import("pages/produtos/Index.vue") },
      { path: "/comandas", component: () => import("pages/comandas/Index.vue") },
      { path: "/comanda/:id", component: () => import("pages/comandas/ComandaPage.vue") },
      { path: "/caixa", component: () => import("pages/caixa/Index.vue") },
    ]
  },

  {
    path: '/login',
    component: () => import("pages/login/Index.vue")
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
