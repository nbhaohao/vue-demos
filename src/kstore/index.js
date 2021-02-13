import Vue from "vue";
import Vuex from "./kvuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter += 1;
    }
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    }
  },
  modules: {},
  getters: {
    testGetter(state) {
      return state.counter + "a";
    }
  }
});
