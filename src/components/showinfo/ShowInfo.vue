<template>
  <el-form label-width="80px" :model="infoForm" style="text-align: left; width: 500px" :rules="rules" ref="infoForm">
    <el-form-item label="学号" >
      <span>{{infoForm.idNumber}}</span>
    </el-form-item>
    <el-form-item label="姓名" >
      <span>{{infoForm.trueName}}</span>
    </el-form-item>
    <el-form-item label="学生类别" >
      <span>{{infoForm.ebg}}</span>
    </el-form-item>
    <el-form-item label="身份证号" >
      <span>{{infoForm.chinaid}}</span>
    </el-form-item>
    <el-form-item label="电子邮箱" prop="email">
      <el-input v-model="infoForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="infoForm.phone"></el-input>
    </el-form-item>
    <el-form-item label="家庭住址" prop="homeAddress">
      <el-input v-model="infoForm.homeAddress"></el-input>
    </el-form-item>
    <el-form-item label="宿舍" >
      <span>{{infoForm.dormitory}}</span>
    </el-form-item>
    <el-form-item label="专业">
      <span>{{infoForm.major.name}}</span>
    </el-form-item>
    <el-form-item label="所属学院">
      <span>{{infoForm.collage.name}}</span>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-edit" @click="submitForm">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {queryUserInfoNetwork} from "@/network/user";

export default {
  name: "ShowInfo",
  data() {
    let validateEmail = (rule, value, callback) => {
      let regEmail = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.(.[a-z\.]{2,6})$/;
      if (value === '') {
        callback(new Error('请输入电子邮箱地址'));
      } else {
        if (!regEmail.test(value)) {
          callback(new Error('电子邮箱地址格式错误'));
        }
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      let regPhone = /^((\+?86))?(1[3|4|5|6|7|8|9][0123456789][0-9]{8})$/;
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else {
        if (!regPhone.test(value)) {
          callback(new Error('手机号格式错误'));
        }
        callback();
      }
    };
    let validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入家庭住址'));
      } else {
        callback();
      }
    };
    return {
      infoForm: {
        idNumber: '48916',
        trueName: 'Nagisa',
        ebg: '使徒',
        chinaid: '491632',
        email: '13456@56.com',
        phone: '13245678910',
        homeAddress: '月球',
        dormitory: '墓地'
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ],
        homeAddress: [
          { validator: validateAddress, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs["infoForm"].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          alert('error!');
          return false;
        }
      });
    },
  },

  created() {
    var loginUser = this.$store.getters.getLoginUser;
    queryUserInfoNetwork(loginUser.id).then(res=>{
      if(res.success){
        this.infoForm = res.data
        console.log(this.infoForm)
      }else{
        this.$message.error('查询用户信息失败')
      }
    })
  }
}
</script>

<style scoped>

</style>