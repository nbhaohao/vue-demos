<template>
  <div>
    <KForm :model="userInfo" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput placeholder="请输入123" v-model="userInfo.username" />
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput
          placeholder="请输入密码"
          v-model="userInfo.password"
          type="password"
        />
      </KFormItem>
      <KFormItem>
        <button @click="login">登录</button>
      </KFormItem>
    </KForm>
    <p>{{ userInfo }}</p>
  </div>
</template>

<script>
import KInput from "@/components/form/KInput.vue";
import KFormItem from "@/components/form/KFormItem.vue";
import KForm from "@/components/form/KForm.vue";

export default {
  data() {
    return {
      userInfo: {
        username: "tom",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名称" }],
        password: [{ required: true, message: "请输入密码" }]
      }
    };
  },
  components: {
    KInput,
    KFormItem,
    KForm
  },
  methods: {
    login() {
      this.$refs.loginForm.validate(isValid => {
        if (isValid) {
          console.log("request login");
        } else {
          alert("校验失败");
        }
      });
    }
  }
};
</script>

<style scoped></style>
