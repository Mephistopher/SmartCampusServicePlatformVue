<template>
  <div>
    <div class="login-form">
      <el-form :model="form" status-icon :rules="rules" ref="loginForm">
        <div class="login-form-item">
          <label for="username">
            学号
          </label>
          <el-form-item prop="username">
            <el-input id="username" placeholder="请输入用户名" v-model="form.username" size="small"></el-input>
          </el-form-item>
        </div>
        <div class="login-form-item">
          <label for="password" style="position: relative">
            密码
            <el-link style="position: absolute; right: 2px" type="danger">忘记密码？</el-link>
          </label>
          <el-form-item prop="password">
            <el-input id="password" placeholder="请输入密码" v-model="form.password" size="small" show-password></el-input>
          </el-form-item>
        </div>
        <div class="login-form-item">
          <el-button style="width: 100%" @click="login" type="primary" round>登录</el-button>
        </div>
      </el-form>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginFrom",
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 24, message: '长度在 6 到 24 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$emit('userlogin', this.form)
        } else {
          return false;
        }
      })
    },
  }
}
</script>

<style scoped>
.login-form {
  text-align: right;
  padding: 20px 20px;
}

.login-form-item {
  font-size: 14px;
  text-align: left;
  font-weight: 400;
}

.login-form-item > label {
  display: block;
  width: 100%;
  margin-bottom: 7px;
}
</style>