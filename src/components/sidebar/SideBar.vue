<template>
  <div id="sidebar">
    <div class="sidebar-menu" :style="collapseStyle">
      <el-menu
          :collapse="isCollapse"
          default-active="1"
          class="el-menu-vertical-demo"
          text-color="#333333"
          background-color="#FFFFFF"
          active-text-color="#409EFF"
          :unique-opened="true"
          @open="handleOpen"
          @close="handleClose">
        <el-menu-item index="1" @click="toHome">
            <i class="el-icon-s-home"></i>
            <span>首页公告</span>
        </el-menu-item>

        <el-menu-item index="2" @click="showInfo">
            <i class="el-icon-s-custom"></i>
            <span>个人信息</span>
        </el-menu-item>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-grid"></i>
            <span>课程表</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1" @click="createAnnounce">查看课表</el-menu-item>
            <el-menu-item index="3-2" @click="showAnnounce">课程信息查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>课程情况</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1" @click="createTask">已修读学分</el-menu-item>
            <el-menu-item index="4-2" @click="showTask">不及格课程情况</el-menu-item>
            <el-menu-item index="4-3" @click="myTaskSubmitRecord">查看选课情况</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>我的成绩</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1" @click="createProject">成绩查询</el-menu-item>
            <el-menu-item index="5-2" @click="projectList">补考重修成绩</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>登录助手</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" @click="createProject">登录教务系统</el-menu-item>
            <el-menu-item index="6-2" @click="projectList">登录迎新系统</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-menu-item index="7">
          <div style="height: 100%;width: 100%"
               @click="toConferenceModel">
            <i class="el-icon-s-opportunity"></i>
            <span>校内资源访问</span>
          </div>
        </el-menu-item>
      </el-menu>
    </div>

  </div>

</template>

<script>

export default {
  name: "Sidebar",
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object,
      default() {
        return {userName: 'zhangsan', trueName: '张三'}
      }
    }
  },
  computed: {
    collapseStyle() {
      if (this.isCollapse) return {'overflowY': 'hidden'}
      return {'overflowY': 'scroll'}
    }
  },
  data() {
    return {
      showInfoPath: '/home/showinfo',
      homePath: '/home/noticeandnews',
      isShowAnnounce: true,

      createGroupPath: '/index/creategroup',
      joinInGroupPath: '/index/joiningroup',
      joinedGroupPath: '/index/joinedgroup',
      myGroupPath: '/index/mygroup',

      createTaskPath: '/index/createtask',
      showTaskPath: '/index/showtask',
      myTaskSubmitRecordPath: '/index/mytasksubmitrecord',

      createProjectPath: '/index/createproject',
      projectListPath: '/index/projectlist',

      createAnnouncePath: '/index/createannounce',
      showAnnouncePath: '/index/showannounce'
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showInfo() {
      this.$router.push(this.showInfoPath)
    },
    toHome() {
      this.$router.push(this.homePath)
    },
    createGroup() {
      this.$router.push(this.createGroupPath)
    },
    joinInGroup() {
      this.$router.push(this.joinInGroupPath)
    },
    joinedGroup() {
      this.$router.push(this.joinedGroupPath)
    },
    myGroup() {
      this.$router.push(this.myGroupPath)
    },
    createTask() {
      this.$router.push(this.createTaskPath)
    },
    showTask() {
      this.$router.push(this.showTaskPath)
    },

    myTaskSubmitRecord() {
      this.$router.push(this.myTaskSubmitRecordPath)
    },
    createProject() {
      this.$router.push(this.createProjectPath)
    },
    projectList() {
      this.$router.push(this.projectListPath)
    },

    createAnnounce() {
      this.$router.push(this.createAnnouncePath)
    },
    showAnnounce() {
      this.$router.push(this.showAnnouncePath)
    },
    toConferenceModel() {
      window.location.href = 'http://www.ylxteach.net/XM06/wumaojun/conference_index.html'
      // window.location.href = 'http://localhost:9000/XM06/wumaojun/conference_index.html'
    },
    toWeatherModel() {
      window.location.href = 'http://www.ylxteach.net/XM06/wumaojun/weather.html'
      // window.location.href = 'http://localhost:9000/XM06/wumaojun/weather.html'
    },
    toDeviceModel() {
      window.location.href = 'http://www.ylxteach.net/XM06/wumaojun/device_index.html'
      // window.location.href = 'http://localhost:9000/XM06/wumaojun/device_index.html'
    },
  }
}
</script>

<style scoped>
#sidebar {
  height: calc(100vh - 79px);
  overflow: hidden;
  position: relative;
  border-bottom: 0;
  border-top: 2px solid #409EFF;
  border-right: 1px solid rgba(100, 100, 100, 0.7);
}

.sidebar-menu {
  text-align: left;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: hidden;
  overflow-x: hidden;
}
.sidebar-menu::-webkit-scrollbar {
  display: none;
}
</style>