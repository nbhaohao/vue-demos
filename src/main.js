import Vue from "vue";
import App from "./App.vue";
import NoticePlugin from "@/plugins/notice";
import router from './krouter'

Vue.config.productionTip = false;
Vue.use(NoticePlugin);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
