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
          :unique-opened="true">
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
            <el-menu-item index="3-1" >查看课表</el-menu-item>
            <el-menu-item index="3-2">课程信息查询</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>课程情况</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="toTakeCourse" >修读总揽</el-menu-item>
            <el-menu-item @click="toUnpassCourse">不及格课程</el-menu-item>
            <el-menu-item @click="selectCourse">选课</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>我的成绩</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="5-1">成绩查询</el-menu-item>
            <el-menu-item index="5-2">补考重修成绩</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-s-platform"></i>
            <span>登录助手</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="6-1" >登录教务系统</el-menu-item>
            <el-menu-item index="6-2" >登录迎新系统</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


        <el-menu-item index="7">
          <div style="height: 100%;width: 100%">
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
      showInfoPath: '/showinfo',
      homePath: '/noticeandnews',
      takeCoursePath: '/takecourse',
      unpassCoursePath: '/unpassCourse',
      reTakeCoursePath: '/selectcourse',
      isShowAnnounce: true,
    }
  },
  methods: {

    showInfo() {
      this.$router.push(this.showInfoPath)
    },
    toHome() {
      this.$router.push(this.homePath)
    },
    toTakeCourse(){
      this.$router.push(this.takeCoursePath)
    },
    toUnpassCourse(){
      this.$router.push(this.unpassCoursePath)
    },
    selectCourse(){
      this.$router.push(this.reTakeCoursePath)
    }
  }
}
</script>

<style scoped>
#sidebar {
  height: calc(100vh - 79px);
  overflow: hidden;
  position: relative;
  border-bottom: 0;
  border-top: 3px solid #409EFF;
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