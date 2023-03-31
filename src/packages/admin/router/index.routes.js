"use strict";
const AdminPage = () =>
  import(/* webpackChunkName: "admin" */ "../pages/AdminPage.vue");
export default [
  {
    path: "/admin",
    name: "admin.main",
    component: AdminPage,
    meta: {
      title: "index",
    },
  },
];
