"use strict";

export default [
  {
    path: "/",
    name: "index",
    component: () => import("@/packages/admin/pages/AdminPage.vue"),
    meta: {
      title: "index",
    },
  },
];
