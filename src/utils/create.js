import Vue from "vue";
//
// export default function create(component, props) {
//   const vm = new Vue({
//     render(createElement) {
//       return createElement(component, { props });
//     }
//   }).$mount();
//   document.body.appendChild(vm.$el);
//   const rootComponent = vm.$children[0];
//   rootComponent.remove = () => {
//     document.body.removeChild(vm.$el);
//     vm.$destroy();
//   };
//   return rootComponent;
// }

export default function create(component, props) {
  const Component = Vue.extend(component);
  console.log(props);
  const vm = new Component();
  for (const key in props) {
    vm[key] = props[key];
  }
  vm.$mount();
  document.body.appendChild(vm.$el);
  vm.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return vm;
}
