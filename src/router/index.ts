import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        default: () => import("../views/viewHome.vue"),
      },
    },
    {
      path: "/design",
      name: "design",
      components: {
        default: () => import("../views/viewDesign.vue"),
      },
    },
    {
      path: "/test",
      name: "test",
      components: {
        default: () => import("../components/graph/graphTest.vue"),
      },
    },
  ],
});

export default router;
