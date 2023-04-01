export default function auth({ next, store }) {
  console.log(store, "auth");
  //   if (!store.getters.auth.loggedIn) {
  // if (!store) {
  //   return next({
  //     name: "auth.login",
  //   });
  // }

  return next();
}
