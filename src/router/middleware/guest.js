export default function guest({ next }) {
  // if (store) {
  //   return next({
  //     name: "index",
  //   });
  // }
  console.log("quest");
  return next();
}
