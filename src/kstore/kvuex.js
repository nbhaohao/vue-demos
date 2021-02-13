let VueTemp;
class Store {
  constructor(options) {
    this.$options = options;
    this._getters = {};
    Object.keys(options.getters || {}).forEach(key => {
      Object.defineProperty(this._getters, key, {
        value: () => {
          return options.getters[key](this.state);
        }
      });
    });
    this._vm = new VueTemp({
      data: {
        // 故意做个封装隐藏
        $$state: options.state
      },
      computed: this._getters
    });
    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  get getters() {
    return this._vm;
  }

  get state() {
    return this._vm._data.$$state;
  }

  commit(action) {
    this.$options.mutations[action](this.state);
  }
  dispatch(action) {
    return this.$options.actions[action](this);
  }
}

function install(Vue) {
  VueTemp = Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default {
  install,
  Store
};
