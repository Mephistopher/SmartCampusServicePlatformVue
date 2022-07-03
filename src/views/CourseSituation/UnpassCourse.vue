<template>
<div>
  <show-window>
    <div slot="title">
      <i class="el-icon-s-finance"></i>
      <span>课程情况</span>
      <i class="el-icon-arrow-right"></i>
      <span>未通过课程</span>
    </div>

    <div slot="main">
      <el-table
          :data="unPassCourse"
          :height="600"
          border
          style="width: 100%;overflow:auto;">
        <el-table-column
            prop="courseId"
            label="课程号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="courseName"
            label="课程名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="semester"
            label="学期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="score"
            width="180"
            label="分数">
        </el-table-column>
        <el-table-column
            align="right">
          <template slot="header" slot-scope="scope">
            <el-input
                size="mini"
                placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="totalInfo(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </show-window>

  <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
    <CourseInfoCard :course-info="courseInfoMem[currentCourse]" :test-info="testMem[currentCourse]"/>

    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import CourseInfoCard from "@/views/CourseSituation/child/courseinfocardchild/CourseInfoCard";
import {queryUnPassCourseNetwork, queryCourseTotalInfoByIdsNetwork} from "@/network/course";
import {queryTestByUserIdAndCourseIdNetwork} from "@/network/test";

export default {
  name: "UnpassCourse",
  components: {ShowWindow,CourseInfoCard},
  data(){
    return{
      unPassCourse:[],
      dialogVisible: false,
      courseInfoMem: {},
      currentCourse: null,

      testMem:{}
    }

  },
  methods:{
    totalInfo(index, scope){
      let courseId = scope.courseId
      let userId = this.$store.getters.getLoginUser.id
      if(courseId === this.currentCourse) {
        this.dialogVisible = true
        return
      }
      try{
        //请求课程详细详细
        if(this.courseInfoMem[courseId] === undefined){
          queryCourseTotalInfoByIdsNetwork([courseId]).then(res =>{
            if(!res.success){
              this.$message.error('查询详细信息失败'+res.errorMsg)
              return
            }
            this.dialogVisible = true
            this.currentCourse = courseId
            this.courseInfoMem[courseId] = res.data
          })
        }else {
          this.currentCourse = courseId
          this.dialogVisible = true
        }
      }finally {
        if(this.testMem[courseId] === undefined){
          //请求课程考试信息
          queryTestByUserIdAndCourseIdNetwork(userId, courseId).then(res =>{
            if(!res.success){
              this.$message.error('查询考试信息失败'+res.errorMsg)
              return
            }
            this.testMem[courseId] = res.data.records
          })
        }
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    }
  },
  mounted() {
    let userId = this.$store.getters.getLoginUser.id
    queryUnPassCourseNetwork(userId).then(res=>{
      if(!res.success){
        this.$message.error('查询不及格课程失败,'+res.errorMsg)
        return
      }
      this.unPassCourse = res.data
    })
  }
}
</script>

<style scoped>

</style>