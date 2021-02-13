let _VueTemp;
class KVueRouter {
  constructor(options) {
    this.$options = options;
    // Vue 隐藏的 API
    const initRoutePath = window.location.hash.slice(1) || "/";
    _VueTemp.util.defineReactive(this, "current", initRoutePath);
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }
  onHashChange() {
    this.current = window.location.hash.slice(1);
  }
}

KVueRouter.install = function(Vue) {
  _VueTemp = Vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      // return <a href={`#${this.to}`}>{this.$slots.default}</a>
      return h(
        "a",
        {
          attrs: {
            href: `#${this.to}`
          }
        },
        this.$slots.default
      );
    }
  });
  Vue.component("router-view", {
    render(h) {
      const {
        $options: { routes },
        current
      } = this.$router;
      const route = routes.find(routeItem => routeItem.path === current);
      const component = route ? route.component : null;
      return h(component);
    }
  });
};

export default KVueRouter;
