<<<<<<< HEAD
<template>
<div class="select-course-query-bar">
  <p style="font-size: 14px;font-weight: 200;text-align: left">
    <i class="el-icon-attract"></i>
    条件查询
  </p>

  <el-input :placeholder="selectStr[select]"
            size="mini"
            :disabled="select===0"
            v-model="queryContext"
            class="input-with-select">
    <el-select v-model="select"
               :collapse-tags="true"
               slot="prepend"
               @change="changeHandler"
               placeholder="请选择">
      <el-option label="全部课程" :value="0"></el-option>
      <el-option label="学院名" :value="1"></el-option>
      <el-option label="课程名" :value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="queryCourse"></el-button>
  </el-input>

  <el-button size="mini" @click="showMySelected">查看已选择的课程</el-button>
</div>
</template>

<script>
export default {
  name: "SelectCourseQueryBar",
  data(){
    return {
      select: 0,
      selectStr: ['查找全部课程','查找学院课程','课程名查找'],
      queryContext: ''
    }
  },
  methods:{
    changeHandler(cur){

      this.queryContext = ''
    },
    queryCourse(){
      this.$emit('queryCurrentCourse', {
        type: this.select,
        context: this.queryContext
      })
    },
    showMySelected(){
      this.$emit('showMySelected')
    }
  }
}
</script>

<style scoped>
.select-course-query-bar{
  padding-left: 12px;
  text-align: left;
}
.input-with-select{
  width: 400px;
}
</style>