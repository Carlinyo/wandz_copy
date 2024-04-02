import { createRouter, createWebHistory } from 'vue-router';

import { ROUTER_CONFIG } from '@/router/routeConfig';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...ROUTER_CONFIG],
});

export default router;
