<template>
  <div>
    <el-row>
      <el-col :span="8">
        <div class="grid-content"></div>
      </el-col>
      <el-col :span="8" class="login-col">
        <div class="grid-content bg-white">
          <el-row>
            <p class="login-title">欢迎登录智慧校园服务平台</p>
            <LoginIcon/>
          </el-row>
          <div style="position: absolute;left: 50%;transform: translate(-50%,-50%);bottom: -60px">
            <LoginForm @userlogin="login"/>
          </div>
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
import LoginForm from "@/components/loginfrom/LoginForm";

export default {
  name: "LoginIndex",
  components: {
    LoginIcon,
    LoginForm
  },methods:{
    login(form) {
      let userName = form.username
      let userPwd = form.password
      this.$router.push('./home')
      // const loading = this.$loading({
      //   lock: true,
      //   text: '正在登录',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      //
      // loginNetwork(userName, userPwd).then(data =>{
      //   if(data.code === 200){
      //     let userIfo = data.result
      //     this.$store.commit(LOGINSUCCESS, userIfo)
      //     this.$message.success('登录成功，即将进入系统')
      //     setTimeout(()=>{
      //       findUserByUserIdStr(userIfo.userIdStr).then((data)=>{
      //         if(data.code === 200){
      //           let user = data.result
      //
      //           this.$store.commit(CHECKSUCCESS, {loginUser: user})
      //         }else {
      //           this.$message('验证用户失败')
      //         }
      //       })
      //     }, 1500)
      //   }else{
      //     //登录失败
      //    this.$message.error('登录失败, '+data.msg)
      //   }
      //
      // }).catch(e => {
      //   this.$message.error('出错拉,检查网络试试或联系管理员')
      // }).finally(()=>{
      //   loading.close()
      // })
    },
  },
  beforeCreate() {
    this.$nextTick(() => {
      document.body.setAttribute('style', 'background:#99a9bf')
    })
  },
  beforeDestroy() {
    document.body.removeAttribute('style')
  }

}
</script>

<style lang="less" scoped>
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
  position: relative;
  height: 600px;
}

.login-col {

  padding: 20px;
  text-align: center;
  margin-top: 100px;
  background-color: #f9fafc;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .256), 0 0 6px rgba(0, 0, 0, .04);
}

.login-title {
  font-size: 30px;
  font-weight: 800;
  color: rgba(0, 0, 0, 0.1) !important;
  -webkit-text-stroke: 1px rgba(0, 0, 150, 0.7);
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  text-align: center;
  width: 100%;
  margin: 20px 0;
}
</style>