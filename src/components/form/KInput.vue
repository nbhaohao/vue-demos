<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: "KInput",
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(event) {
      this.$emit("input", event.target.value);
      this.$parent.$emit("validate")
    }
  }
};
</script>

<style scoped lang="scss"></style>
