import Vue from "vue";
import App from "./App.vue";
import NoticePlugin from "@/plugins/notice";

Vue.config.productionTip = false;
Vue.use(NoticePlugin);
new Vue({
  render: h => h(App)
}).$mount("#app");
