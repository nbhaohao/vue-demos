const Observer = {
  defineReactive: (obj, key, value) => {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target);
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          value = newValue;
          dep.notify()
        }
      }
    });
  },
  walk(obj) {
    Object.keys(obj).forEach(key => this.defineReactive(obj, key, obj[key]));
  },
  observe(obj) {
    if (typeof obj !== "object" || obj === null) {
      return;
    }
    this.walk(obj);
  }
};
class FakeVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    Observer.observe(this.$data);
    this.proxy();
    new Compile(this.$options.el, this);
  }
  proxy() {
    Object.keys(this.$data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(v) {
          this.$data[key] = v;
        }
      });
    });
  }
}

class Compile {
  static TEMPLATE_SYNTAX_REGX = /{{(.*)}}/;
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);
    if (this.$el) {
      this.compile(this.$el);
    }
  }
  compile(dom) {
    dom.childNodes.forEach(node => {
      if (this.isTemplateSyntax(node)) {
        // 正则表达式解析的分组结果，会保存到全局的 RegExp 上
        this.update(node, RegExp.$1);
      }
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }
  update(node, key) {
    this.textUpdater(node, this.$vm[key]);
    new Watcher(this.$vm, key, newValue => {
      this.textUpdater(node, this.$vm[key]);
    });
  }
  textUpdater(node, value) {
    node.textContent = value;
  }
  isTemplateSyntax(node) {
    return (
      node.nodeType === 3 && Compile.TEMPLATE_SYNTAX_REGX.test(node.textContent)
    );
  }
}
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    // 每次创建 Watcher 的时候，往 Dep 类上临时存放一下
    Dep.target = this;
    // 访问一次数据，触发 getter
    this.vm[this.key];
    // 清除临时存放的 watcher 对象
    Dep.target = null;
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}
class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(watcher) {
    this.deps.push(watcher);
  }

  notify() {
    this.deps.forEach(watcher => watcher.update());
  }
}
