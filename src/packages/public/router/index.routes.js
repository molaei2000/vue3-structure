"use strict";

export default [
  {
    path: "/landing",
    name: "index",
    component: () => import("../pages/IndexPage.vue"),
    meta: {
      title: "landing",
    },
  },
];
