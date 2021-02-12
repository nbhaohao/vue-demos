<template>
  <div class="hello">
    <FormDemo />
  </div>
</template>

<script>
import FormDemo from "@/components/form/FormDemo";
export default {
  name: "Index",
  props: {
    msg: String
  },
  components: {
    FormDemo
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
