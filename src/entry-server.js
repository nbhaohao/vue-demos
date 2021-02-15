import { createApp } from "@/main";

export default context => {
  const { app, router } = createApp(context);

  return new Promise((resolve, reject) => {
    router.push(context.url);
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
};
