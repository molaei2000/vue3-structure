export default function auth({ next, store, to, from }) {
  console.log(store, "auth");
  console.log(to);
  console.log(from);
  //   if (!store.getters.auth.loggedIn) {
  // if (!store) {
  //   return next({
  //     name: "auth.login",
  //   });
  // }

  return next();
}
