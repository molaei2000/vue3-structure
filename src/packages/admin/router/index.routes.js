"use strict";
// import guest from "@/router/middleware/guest.js";
// import auth from "@/router/middleware/auth.js";
// import isSubscribed from "@/router/middleware/isSubscribed.js";
const AdminPage = () =>
  import(/* webpackChunkName: "admin" */ "../pages/AdminPage.vue");
export default [
  {
    path: "/admin",
    name: "admin.main",
    component: AdminPage,
    beforeEnter: (to) => {
      // console.log(to, from);
      const data = true;
      if (!data)
        return {
          name: "NotFound",
          params: { pathMatch: to.path.split("/").slice(1) },
          query: to.query,
          hash: to.hash,
        };
    },
    meta: {
      title: "Admin",
      // requiresAuth: true,//1
      middleware: ["auth", "guest", "isSubscribed"],
      // middleware: ['auth'],
    },
  },
];
