import { createRouter, createWebHistory } from "vue-router";

const baseRoutes = [];
// const requiredAuthRoutes = [];
// const requiredAdminRoutes = [];
// Import all of the resource routes files.
const context = import.meta.glob("@/packages/**/router/*.js");
console.log(Object.keys(context), "context");

for (const path in context) {
  const module = await import(path);
  console.log(module.default);
}
// const loadRoutes = () => {
//   const context = import.meta.glob("@/packages/**/router/*.js");
//   return Object.keys(context).map(async (path) => {
//     const module = await import(path);
//     return module.default;
//   }); // get `default` export from each resolved module
// };
const loadRoutes = () => {
  const context = import.meta.glob("@/packages/**/router/*.js");
  Object.values(context).map((value) => {
    console.log(value);
  });
};
//
// function loadRoutes() {
//
//   // const context = require.context("@/packages", true, /routes.js$/i);
//   return context
//     .keys()
//     .map(context) // import module
//     .map((m) => m.default); // get `default` export from each resolved module
// }
const resourceRoutes = loadRoutes();
// resourceRoutes.forEach((route) => {
//   for (let i = 0; i < route.length; i++) {
//     if (route[i].meta.requiresGuest) baseRoutes.push(route[i]);
//     // else if (route[i].meta.requiresAuth) requiredAuthRoutes.push(route[i]);
//     // else if (route[i].meta.requiresAdmin) requiredAdminRoutes.push(route[i]);
//     else baseRoutes.push(route[i]);
//   }
// });
console.log(resourceRoutes, "routes");

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [...baseRoutes],
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: "smooth" };
  },
});

export default router;
