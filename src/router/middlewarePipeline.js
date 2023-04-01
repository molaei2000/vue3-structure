async function middlewarePipeline(context, middleware, index) {
  if (!middleware[index]) return context.next;

  const module = await import(`./middleware/${middleware[index]}.js`);
  const nextMiddleware = module.default;
  // console.log(module.default, "module");
  // console.log(index);
  // console.log(middleware);
  if (!nextMiddleware) {
    return context.next;
  }

  return async () => {
    const nextPipeline = await middlewarePipeline(
      context,
      middleware,
      index + 1
    );

    nextMiddleware({ ...context, next: nextPipeline });
  };
}

export default middlewarePipeline;
