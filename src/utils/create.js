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
  const vm = new Component({ propsData: props });
  vm.$mount();
  document.body.appendChild(vm.$el);
  vm.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };
  return vm;
}
