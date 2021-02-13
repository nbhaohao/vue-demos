import Vue from "vue";
import App from "./App.vue";
import NoticePlugin from "@/plugins/notice";
import router from "./krouter";
import store from "./kstore";

Vue.config.productionTip = false;
Vue.use(NoticePlugin);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
