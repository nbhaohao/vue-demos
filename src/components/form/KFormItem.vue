<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <p v-if="error" class="error">{{ error }}</p>
    <p>{{ form.model[prop] }}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/mixins/emitter";

export default {
  inject: ["form"],
  name: "KFormItem",
  componentName: "KFormItem",
  mixins: [emitter],
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();
    });
    if (this.prop) {
      this.dispatch("KForm", "form.addField", [this]);
    }
  },
  beforeDestroy() {
    this.dispatch("KForm", "form.removeField", [this]);
  },
  data() {
    return {
      error: ""
    };
  },
  methods: {
    validate() {
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];
      const schema = new Schema({ [this.prop]: rules });
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          this.error = "";
        }
      });
    }
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
