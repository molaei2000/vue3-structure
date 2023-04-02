export default function auth({ next, store }) {
  console.log(store.check, "auth");
  console.log(store.token, "auth");

  if (!store.check) {
    return next({
      name: "auth.login",
    });
  } else next();
}
