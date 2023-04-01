import { createRouter, createWebHistory } from "vue-router";
import pageNotFoundRoutes from "./routes/pageNotFound.routes";
import middlewarePipeline from "./middlewarePipeline";

const context = import.meta.glob("@/packages/**/router/*.js", {
  import: "default",
  eager: true,
});
const baseRoutes = [];
const requiredAuthRoutes = [];
for (const path in context) {
  context[path].forEach((route) => {
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
    children: [...baseRoutes, ...pageNotFoundRoutes],
  },
  {
    path: "/panel",
    name: "panel",
    redirect: { name: "admin.main" },
    component: () => import("@/layouts/LayoutPanel.vue"),
    children: [...requiredAuthRoutes, ...pageNotFoundRoutes],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  // sensitive: true,
  // strict: true,
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 500);
      })
    );
  },
});
// router.beforeEach((to) => {
//   // instead of having to check every route record with
//   // to.matched.some(record => record.meta.requiresAuth)
//   if (to.meta.requiresAuth /*&& !auth.isLoggedIn()*/) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     return {
//       name: "auth.login",
//       // save the location we were at to come back later
//       query: { redirect: to.fullPath },
//     };
//   }
// });
router.beforeEach(async (to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware = to.meta.middleware;

  const context = {
    to,
    from,
    next,
    // store,
  };
  // await middlewarePipeline(context, middleware, 0).then((ctx) => {
  //   console.log(ctx);
  // })
  const module = await import(`./middleware/${middleware[0]}.js`);
  return module.default({
    ...context,
    next: await middlewarePipeline(context, middleware, 1),
  });
});

export default router;
