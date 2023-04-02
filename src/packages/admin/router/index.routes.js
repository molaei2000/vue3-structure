"use strict";
const AdminPage = () =>
  import(/* webpackChunkName: "admin" */ "../pages/AdminPage.vue");
export default [
  {
    path: "/admin",
    name: "admin.main",
    component: AdminPage,
    beforeEnter: (to) => {
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
      middleware: ["auth", "guest", "isSubscribed"],
    },
  },
];
