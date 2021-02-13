// 对象响应式处理
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  new Observer(obj);
}

// 对象响应式原理
function defineReactive(obj, key, value) {
  // 解决递归嵌套问题
  observe(value);
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", value);
      Dep.target && dep.addDep(Dep.target);
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        console.log("set", newValue);
        observe(newValue);
        value = newValue;
        dep.notify()
      }
    }
  });
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      }
    });
  });
}

class FakeVue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    observe(this.$data);
    proxy(this);

    new Compile("#app", this);
  }
}

class Observer {
  constructor(value) {
    this.value = value;
    this.walk(value);
  }

  walk(value) {
    Object.keys(value).forEach(key => defineReactive(value, key, value[key]));
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;

    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }
  compile(dom) {
    dom.childNodes.forEach(node => {
      if (this.isElement(node)) {
        console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        console.log("编译插值表达式", node.textContent);
        this.compileText(node);
      }
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }
  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      const attrName = attr.name;
      const exp = attr.value;
      if (this.isDirective(attrName)) {
        const directName = attrName.substring(2);
        this.update(node, exp, directName);
      }
    });
  }

  isDirective(attrName) {
    return attrName && /^v-.+/.test(attrName);
  }

  // html(node, exp) {
  //   this.update(node, exp, "html");
  // }
  //
  // text(node, exp) {
  //   this.update(node, exp, "text");
  // }

  update(node, exp, dir) {
    const fn = this[dir + "Updater"];
    fn && fn(node, this.$vm[exp]);

    new Watcher(this.$vm, exp, newValue => {
      fn && fn(node, newValue);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  htmlUpdater(node, value) {
    node.innerHTML = value;
  }

  compileText(node) {
    this.update(node, RegExp.$1, "text");
  }

  isElement(node) {
    return node.nodeType === 1;
  }
  isInter(node) {
    return node.nodeType === 3 && /{{(.*)}}/.test(node.textContent);
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;
    Dep.target = this;
    this.vm[this.key];
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
