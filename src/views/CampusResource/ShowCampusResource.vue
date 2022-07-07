<template>
  <div>
    <campusResource/>
  </div>

</template>

<script>
// import ShowInfo from "@/components/showinfo/ShowInfo";
import campusResource from "@/components/resource/campusResource";

export default {
  name: "HomeBody",
  components: {
    campusResource
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
  min-height: calc(100vh - 79px);
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
