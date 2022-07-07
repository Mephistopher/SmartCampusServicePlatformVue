<template>
<div class="show-window"
     v-if="isClose">
  <el-row class="show-window-title">
    <el-col :span="16">
      <div class="hidden-sm-and-down" style="text-align: left">
        <slot name="title"></slot>
      </div>
    </el-col>

    <el-col class="show-window-button" :span="4">
      <div @click="reload" class="el-icon-refresh"></div>
      <div @click="close" class="el-icon-close"></div>
    </el-col>
  </el-row>

  <el-row>
    <el-col :span="24">
      <div class="show-window-main">

        <div style="position: relative; border-radius: 20px;padding: 10px 0">
          <slot name="main">

          </slot>
        </div>
      </div>
    </el-col>
  </el-row>


</div>
</template>

<script>

export default {
  name: "ShowWindow",
  computed: {

  },
  methods: {
    close(){
      this.isClose = false
    },
    reload(){
      this.$forceUpdate()
    }
  },
  data() {
    return {
      lightType: 0,
      isClose: true
    }
  },
  activated() {
  }
}
</script>

<style scoped>
.show-window{
  width: calc(100% - 14px);
  border: 2px solid rgba(100,100,100,0.5);
  background-color: #ffffff;
  margin-top: 5px;
  margin-left: 8px;
  border-radius: 12px;
}
.show-window-title{
  /*background-color: rgba(100,100,100,0.5);*/
  background-color: transparent;
  line-height: 35px;
  height: 35px;
  position: relative;
  padding-left: 10px;
  border-bottom: 1px rgba(100,100,100,0.5) solid;
}
.show-window-button{
  overflow: visible;
}
.show-window-button>div[class='el-icon-close']{
  position: absolute;
  font-size: 20px;
  line-height: 35px;
  right: 15px;
}
.show-window-button>div[class='el-icon-close']:hover{
  cursor: pointer;
}
.show-window-button>div[class='el-icon-refresh']{
  position: absolute;
  font-size: 20px;
  line-height: 35px;
  right: 50px;
}
.show-window-button>div[class='el-icon-refresh']:hover{
  cursor: pointer;
}


.show-window-main{
  position: relative;
}
.light-tool{
  margin-right: 5px;
  margin-left: 4px;
}
</style>