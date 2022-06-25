<template>
  <div >
    <el-row>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8" class="login-col">
        <div class="grid-content bg-white">
          <el-row>
            <el-col :span="8">
              <div class="grid-content"></div>
            </el-col>
            <el-col :span="8">
              <p class="login-title">欢迎登录智慧校园服务平台</p>
              <LoginIcon/>
            </el-col>
            <el-col :span="8">
              <div class="grid-content"></div>
            </el-col>
          </el-row>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="login-form">
            <el-form-item  prop="userNum">
              <el-input type="text" v-model="ruleForm2.userNum" placeholder="学号"></el-input>
            </el-form-item>
            <el-form-item  prop="userPass">
              <el-input type="password" v-model="ruleForm2.userPass" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')" class="login-but">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginIcon from "@/views/Login/LoginIcon";

export default {
  name: "LoginIndex",
  components: {
    LoginIcon
  },
  data() {
    var validateUserNum = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    var validateUserPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        userNum: '',
        userPass: '',
      },
      rules2: {
        userNum: [
          {validator: validateUserNum, trigger: 'blur'}
        ],
        userPass: [
          {validator: validateUserPass, trigger: 'blur'}
        ],

      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          });
          this.$router.push("/");
        } else {
          this.$message({
            showClose: true,
            message: '登录失败，请检查学号或密码',
            type: 'error'
          });
        }
      });
    },
  },
  beforeCreate () {
    this.$nextTick(()=>{
      document.body.setAttribute('style', 'background:#99a9bf')
    })
  },

  beforeDestroy () {
    document.body.removeAttribute('style')
  }
}
</script>

<style lang="less" scoped>
@h: 40px;
@w: 160px;

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-white {
  background: #f9fafc;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.login-col {
  padding: 20px;
  text-align: center;
  margin-top: 100px;
  background-color: #f9fafc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .256), 0 0 6px rgba(0, 0, 0, .04);
}

.login-but {
  margin-left: 5px;
  height: @h;
  width: @w;
}

.login-title {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-block;
  color: #2c3e50;
}

</style>