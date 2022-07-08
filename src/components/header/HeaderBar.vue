<template>
  <div>
    <div style="position: absolute; left: 15px">
      <span slot="title">
        <span style="display: inline-block;
              font-size: 26px;
              font-weight: bold;
              width: 100%;text-align: center;
              color: rgba(0, 0, 0, 0) !important;
              -webkit-text-stroke: 1px rgba(255,255,255, 0);
              -webkit-text-fill-color: rgba(25,137,250, 0.7);
              -webkit-background-clip: text;">
          智慧校园服务平台
        </span>
      </span>
    </div>
    <div style="position: absolute; right: 200px; margin-bottom: 2px">
      <el-button icon="el-icon-date" type="primary"
                 style="height: 59px; border-radius: 0px;bottom: -60px;margin-right: 50px" @click="showScheduleImage">
        查看作息时间
      </el-button>
    </div>
    <div>
      <el-avatar shape="circle" :size="50" :src="imgsrc2"
                 style="position: absolute; left: 89%; margin-top: 5px;"></el-avatar>
    </div>
    <div
        style="position: absolute; right: 0; width: 180px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <span>{{ this.Name }}</span><i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-fold" command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        title="作息时间表"
        :visible.sync="dialogVisible"
        width="50%"
        center>
      <el-image :src="imgsrc1" fit="contain"></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import img1 from '@/assets/schedule.png'
import img2 from '@/assets/defaultAvatar.jpg'
import {delCookie} from "@/util/cookie";
import {logoutNetwork} from "@/network/user";

export default {
  name: "HeaderBar",
  data() {
    return {
      imgsrc1: img1,
      imgsrc2: img2,
      dialogVisible: false,
      Name: this.$store.getters.getLoginUser.trueName
    }
  },
  methods: {
    showScheduleImage() {
      this.dialogVisible = true;
    },
    handleCommand(command) {
      if (command==="exit") {
        this.$confirm('确定要退出吗？若如此做将返回登录界面', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.$store.commit('setLoginUser', undefined)

              logoutNetwork()
              delCookie('token')
              this.$router.push("/")
              done();
            } else {
              done();
            }
          }
        }).then(action => {

        });
      }
    }
  },
  beforeCreate() {
    if(this.$store.getters.getLoginUser === undefined) {
      this.$router.push("/")
      this.$message({
        message: '请先登录',
        type: 'warning'
      });
    }
  }
}
</script>

<style scoped>

</style>