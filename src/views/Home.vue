<template>
  <div class="home">
    test
    <p>{{ $store.getters.testGetter }}</p>
    <p @click="$store.commit('add')">counter: {{ $store.state.counter }}</p>
    <p @click="$store.dispatch('add')">
      async counter: {{ $store.state.counter }}
    </p>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {}
};
</script>
