import { createRouter, createWebHistory } from "vue-router";

const context = import.meta.glob("@/packages/**/router/*.js", {
  import: "default",
  eager: true,
});
const baseRoutes = [];
const requiredAuthRoutes = [];
console.log(context);
for (const path in context) {
  context[path].forEach((route) => {
    console.log(route);
    if (route.meta.requiresGuest) baseRoutes.push(route);
    else if (route.meta.requiresAuth) requiredAuthRoutes.push(route);
    else baseRoutes.push(route);
  });
}
const routes = [
  {
    path: "/",
    redirect: { name: "index" },
    component: () => import("../layouts/LayoutDefault.vue"),
    children: [...baseRoutes],
  },
  {
    path: "/panel",
    name: "panel",
    redirect: { name: "admin.main" },
    component: () => import("@/layouts/LayoutPanel.vue"),
    children: [...requiredAuthRoutes],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  // sensitive: true,
  // strict: true,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

export default router;
