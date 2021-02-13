// 对象响应式原理
function defineReactive(obj, key, value) {
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", value);
    },
    set(newValue) {}
  });
}
