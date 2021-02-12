import create from "@/utils/create";
import Notice from "@/components/Notice";

const NoticePlugin = {
  install(Vue) {
    Vue.prototype.$notice = props => {
      create(Notice, props).show();
    };
  }
};

export default NoticePlugin;
