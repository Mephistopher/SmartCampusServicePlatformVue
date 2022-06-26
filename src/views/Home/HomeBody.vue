<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <HomeAside/>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeAside from "@/views/Home/HomeAside";
export default {
  name: "HomeBody",
  components: {
    HomeAside
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}



.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  height: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>