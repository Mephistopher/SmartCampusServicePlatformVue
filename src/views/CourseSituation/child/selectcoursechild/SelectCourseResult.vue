<template>
<div class="select-course-result">
  <span class="select-course-result-name">{{course.courseName}}</span>
  <el-tooltip class="item" effect="light" :content="msg" placement="right">
      <span class="select-course-result-icon">
        <i v-if="result === 0" class="el-icon-loading"/>
        <i v-else-if="result === 1" class="el-icon-success" style="color:#67C23A"/>
        <i v-else class="el-icon-error" style="color:#F56C6C"/>
      </span>
  </el-tooltip>
</div>
</template>

<script>
import {selectCourseNetwork} from "@/network/course";

export default {
  name: "SelectCourseResult",
  props:{
    course:{
      type: Object,
      default: {
        courseId: null,
        courseName: ''
      },
    }
  },
  data(){
    return {
      result: 0,
      msg: '获取选课结果中'
    }
  },
  mounted() {
    selectCourseNetwork(this.course.courseId, this.$store.getters.getLoginUser.id).then(res=>{
      if(res.success){
        this.msg = '选课成功'
        this.result = 1
      }else{
        this.msg = '选课失败，'+res.errorMsg
        this.result = -1
      }
    }).catch(e=>{
      this.msg = '未知的错误'
    })
  }
}
</script>

<style scoped>
.select-course-result{
  padding: 5px 10px;
  font-size: 24px;
}
.select-course-result-name{
  display: inline-block;
  width: 65%;
  text-align: left;
}
.select-course-result-icon{
  margin-left: 4px;
}
</style>