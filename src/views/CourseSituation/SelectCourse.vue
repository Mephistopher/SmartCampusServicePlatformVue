<template>
<div class="retake-course">
  <show-window>
    <div slot="title">
      <i class="el-icon-s-finance"></i>
      <span>课程情况</span>
      <i class="el-icon-arrow-right"></i>
      <span>选课</span>
    </div>
    <div slot="main">

      <select-course-query-bar @queryCurrentCourse="queryCurrentCourse"/>

      <el-divider></el-divider>

      <select-course-context ref="context"
                             @selectBatch="selectBatch"
                             @selectcourse="selectcourse"
                             :used-time="usedTime"
                             :course-list="courseList"/>
    </div>

  </show-window>



  <el-dialog
      title="选课结果"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">

    <div class="select-course-result-card">
      <select-course-result v-for="item in courses" :course="item"/>
    </div>

    <el-button type="info" @click="dialogVisible = false">确 定</el-button>
  </el-dialog>

</div>
</template>

<script>
import {selectCourseNetwork, queryCurSemesterCourseNetwork, queryUsedTimeNetwork} from "@/network/course";
import SelectCourseQueryBar from "@/views/CourseSituation/child/selectcoursechild/SelectCourseQueryBar";
import ShowWindow from "@/components/showwindow/ShowWindow";
import SelectCourseContext from "@/views/CourseSituation/child/selectcoursechild/select-course-context";
import SelectCourseResult from "@/views/CourseSituation/child/selectcoursechild/SelectCourseResult";

export default {
  name: "ReTakeCourse",
  components: {SelectCourseResult, SelectCourseContext, ShowWindow, SelectCourseQueryBar},
  data(){
    return {
      courseList:[],
      dialogVisible: false,
      courses: [],

      usedTime:[]
    }
  },
  methods:{
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    queryCurrentCourse(query){
      queryCurSemesterCourseNetwork(query).then(res=>{
        if(!res.success){
          this.$message.error('查询失败，'+res.errorMsg)
          return
        }
        this.courseList = res.data
        this.$refs.context.currentPage = 1
      })
    },

    // 选一节课
    selectcourse(params){
      selectCourseNetwork(params.courseId, params.userId).then(res=>{
        if(res.success){
          this.$message.success('选课成功，选课单号：'+res.data)
        }else{
          this.$alert('选课失败,'+res.errorMsg, '选课结果', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    //选一堆课
    selectBatch(courses){
      this.dialogVisible = true
      this.courses = courses
    }
  },
  mounted() {
    let userId = this.$store.getters.getLoginUser.id
    queryUsedTimeNetwork(userId).then(res=>{
      if(!res.success){
        return
      }
      this.usedTime = res.data
    })
  }
}
</script>

<style scoped>
.select-course-result-card{
  min-height: 300px;
}
</style>