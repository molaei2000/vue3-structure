"use strict";
export default [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404/PageNotFound.vue"),
  },
];
