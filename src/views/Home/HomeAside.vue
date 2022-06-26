<template>
  <el-aside width="220px">
    <SideBar/>
<!--    <div >-->
<!--      <el-menu class="sidebarMenu">-->
<!--        <el-submenu index="1">-->
<!--          <template slot="title"><i class="el-icon-message"></i>首页</template>-->
<!--          <el-menu-item-group>-->
<!--            <el-menu-item index="1-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="1-2">选项2</el-menu-item>-->
<!--            <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-submenu index="1-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-submenu>-->
<!--        <el-submenu index="2">-->
<!--          <template slot="title"><i class="el-icon-menu"></i>导航二</template>-->
<!--          <el-menu-item-group>-->
<!--            <template slot="title">分组一</template>-->
<!--            <el-menu-item index="2-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="2-2">选项2</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-menu-item-group title="分组2">-->
<!--            <el-menu-item index="2-3">选项3</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-submenu index="2-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="2-4-1">选项4-1</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-submenu>-->
<!--        <el-submenu index="3">-->
<!--          <template slot="title"><i class="el-icon-setting"></i>导航三</template>-->
<!--          <el-menu-item-group>-->
<!--            <template slot="title">分组一</template>-->
<!--            <el-menu-item index="3-1">选项1</el-menu-item>-->
<!--            <el-menu-item index="3-2">选项2</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-menu-item-group title="分组2">-->
<!--            <el-menu-item index="3-3">选项3</el-menu-item>-->
<!--          </el-menu-item-group>-->
<!--          <el-submenu index="3-4">-->
<!--            <template slot="title">选项4</template>-->
<!--            <el-menu-item index="3-4-1">选项4-1</el-menu-item>-->
<!--          </el-submenu>-->
<!--        </el-submenu>-->
<!--      </el-menu>-->
<!--    </div>-->

  </el-aside>
</template>

<script>
import SideBar from "@/components/sidebar/SideBar";
export default {
  name: "HomeAside",
  components: {
    SideBar
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #fff;
  color: #fff;
  border-style: solid;
  border-color: #ccc;
  border-width: 0 1px 0 0;
  text-align: center;
  height: calc(100vh - 76px);
}

.sidebarMenu{
  bottom: 150px;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>