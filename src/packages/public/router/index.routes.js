"use strict";

export default [
  {
    path: "/",
    name: "index",
    component: () => import("@/packages/public/pages/IndexPages.vue"),
    meta: {
      title: "index",
    },
  },
];
