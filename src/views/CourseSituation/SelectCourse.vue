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

      <select-course-query-bar @queryCurrentCourse="queryCurrentCourse"
                               @showMySelected="showMySelected"/>

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


  <el-drawer
      title="已选择的课程"
      :visible.sync="drawer"
      direction="rtl"
      :before-close="handleClose">
    <el-collapse style="padding: 0 20px" accordion>

      <el-collapse-item
          v-for="(course, index) in selectedCourse"
          :name="index">
        <template slot="title">
          <span class="select-course-selected-title">{{course.courseName}}</span>
          <span>{{course.credit}}</span>学分
        </template>
          <el-descriptions title="课程详情" :column="1">
            <template slot="extra">
                <el-button @click="cancelSelectCourse(course.id)"
                           size="mini" type="warning">
                  取消选课
                </el-button>
            </template>
            <el-descriptions-item label="课程号">{{course.id}}</el-descriptions-item>
            <el-descriptions-item label="课程名">{{ course.courseName }}</el-descriptions-item>
            <el-descriptions-item label="学期">{{ course.semester }}</el-descriptions-item>
            <el-descriptions-item label="备注">{{course.detail}}</el-descriptions-item>
            <el-descriptions-item label="上课地址">{{course.location}}</el-descriptions-item>
            <el-descriptions-item>
              <div slot="label" style="margin: auto">上课时间</div>
              <span>第{{course.startWeek}}周～{{course.endWeek}}周</span>
              <el-tag v-for="time in course.courseTimeList"
                      style="margin: 10px"
                      size="mini">
                星期{{time.day}}第{{time.id%12}}节
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="上课老师">
              <div slot="label" style="margin: auto">上课老师</div>
              <div>
                <el-tag type="success" v-for="teacher in course.teacherList">{{teacher.trueName}}</el-tag>
              </div>
            </el-descriptions-item>
          </el-descriptions>
      </el-collapse-item>
    </el-collapse>
  </el-drawer>
</div>
</template>

<script>
import {
  selectCourseNetwork,
  queryCurSemesterCourseNetwork,
  queryUsedTimeNetwork,
  queryNowSelectedCourseNetwork,
  queryCourseTotalInfoByIdsNetwork, cancelSelectCourseNetwork
} from "@/network/course";
import SelectCourseQueryBar from "@/views/CourseSituation/child/selectcoursechild/SelectCourseQueryBar";
import ShowWindow from "@/components/showwindow/ShowWindow";
import SelectCourseContext from "@/views/CourseSituation/child/selectcoursechild/select-course-context";
import SelectCourseResult from "@/views/CourseSituation/child/selectcoursechild/SelectCourseResult";

export default {
  name: "ReTakeCourse",
  components: {SelectCourseResult, SelectCourseContext, ShowWindow, SelectCourseQueryBar},
  data(){
    return {
      dialogVisible: false,
      drawer: false,

      courseList:[],
      courses: [],
      usedTime:[],

      selectedCourse: []
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
    },
    cancelSelectCourse(courseId){
      this.$confirm('确定取消课选课？')
        .then(_ => {
          let userId = this.$store.getters.getLoginUser.id
          cancelSelectCourseNetwork(courseId, userId).then(res=>{
            if(res.success){
              this.$message.success('取消选课成功')
            }else {
              this.$message.error('取消选课失败,'+res.errorMsg)
            }
          })
          done()
        })
        .catch(_ => {})
    },
    showMySelected(){
      this.drawer = true
      let userId = this.$store.getters.getLoginUser.id
      queryNowSelectedCourseNetwork(userId).then(res=>{
        if(!res.success){
          this.$message.error('查询已选课程失败')
          return
        }
        let arr = res.data
        let courseIds = []
        for (let a of arr) {
          courseIds.push(a.courseId)
        }
        return queryCourseTotalInfoByIdsNetwork(courseIds)
      }).then(res=>{
        if(!res.success) {
          this.$message.error('查询已选课程失败')
          return
        }
        this.selectedCourse = res.data
      })
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

.select-course-selected-title{
  display: inline-block;
  width: 60%;
  font-weight: 900;
}
</style>