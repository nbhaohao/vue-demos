<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";

export default {
  inheritAttrs: false,
  name: "KInput",
  mixins: [emitter],
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
      this.dispatch("KFormItem", "validate");
    }
  }
};
</script>

<style scoped lang="scss"></style>
