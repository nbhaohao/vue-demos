import { createApp } from "@/main";

const { app, router } = createApp();

router.onReady(() => {
  // 注水
  app.$mount("#app");
});
