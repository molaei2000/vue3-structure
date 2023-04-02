async function middlewarePipeline(context, middleware, index) {
  if (!middleware[index]) return context.next;

  const nextMiddleware = (await import(`./middleware/${middleware[index]}.js`))
    .default;

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
