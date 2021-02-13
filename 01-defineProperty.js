// 对象响应式处理
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }
  Object.keys(obj).forEach(key => defineReactive(obj, key, obj[key]));
}

// 对象响应式原理
function defineReactive(obj, key, value) {
  // 解决递归嵌套问题
  observe(value);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", value);
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        console.log("set", newValue);
        observe(newValue);
        value = newValue;
      }
    }
  });
}

function set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 } };
// defineReactive(obj, "foo", "foo");
observe(obj);
console.log(obj.foo);
obj.foo = "fooooo";
console.log(obj.baz.a);
obj.baz = { a: "123" };
console.log(obj.baz.a);
