<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
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
  methods: {
    validate(cb) {
      Promise.all(
        this.$children.filter(item => item.prop).map(item => item.validate())
      )
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
