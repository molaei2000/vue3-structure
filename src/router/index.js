import { createRouter, createWebHistory } from "vue-router";
import pageNotFoundRoutes from "./routes/pageNotFound.routes";
import middlewarePipeline from "./middlewarePipeline";
import app from "@/tools/App.js"

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
  scrollBehavior(to, from, savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 500);
      })
    );
  },
});

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
  const module = await import(`./middleware/${middleware[0]}.js`);
  return module.default({
    ...context,
    next: await middlewarePipeline(context, middleware, 1),
  });
});
// This callback runs before every route change, including on page load.
router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.headTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle)
    document.title = nearestWithTitle.meta.title + " | " + app.app_name;

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next();

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.headTags
    .map((tagDef) => {
      let tag_name = tagDef["tag_name"] ? tagDef["tag_name"] : "meta";
      if (tagDef["tag_name"]) delete tagDef.tag_name;

      const tag = document.createElement(tag_name);

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })

    // Add the meta tags to the document head.
    .forEach((tag) => document.head.appendChild(tag));

  // Set lang
  // document.getElementsByTagName("html")[0].setAttribute("lang", Lang.locale());
  next();
});

export default router;
