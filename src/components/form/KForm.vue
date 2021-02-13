<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  componentName: "KForm",
  name: "KForm",
  provide() {
    return {
      form: this
    };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: Object
  },
  data() {
    return {};
  },
  created() {
    this.fields = [];
    this.$on("form.addField", child => {
      this.fields.push(child);
    });
    this.$on("form.removeField", child => {
      this.fields = this.fields.filter(item => item !== child);
    });
  },
  methods: {
    validate(cb) {
      Promise.all(this.fields.map(item => item.validate()))
        .then(() => {
          cb(true);
        })
        .catch(() => {
          cb(false);
        });
    }
  }
};
</script>

<style scoped></style>
