"use strict";
export default [
  {
    path: "/auth",
    name: "auth",
    redirect: { name: "auth.login" },
    component: () => import("../layouts/LayoutAuth.vue"),
    meta: {
      title: "index",
    },
    children: [
      {
        path: "login",
        name: "auth.login",
        component: () => import("../pages/PageAuth.vue"),
      },
    ],
  },
];
