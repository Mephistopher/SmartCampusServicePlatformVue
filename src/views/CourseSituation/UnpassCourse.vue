<<<<<<< HEAD
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
          :data="tables"
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
                v-model="search"
                placeholder="输入关键词搜索"/>
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
  computed:{
    tables () {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.unPassCourse.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.unPassCourse
    }
  },
  data(){
    return{
      unPassCourse:[],
      dialogVisible: false,
      courseInfoMem: {},
      currentCourse: null,

      testMem:{},
      search:''
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

=======
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
          :data="tables"
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
                v-model="search"
                placeholder="输入关键词搜索"/>
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
  computed:{
    tables () {
      const search = this.search
      if (search) {
        // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        // 注意： filter() 不会对空数组进行检测。
        // 注意： filter() 不会改变原始数组。
        return this.unPassCourse.filter(data => {
          // some() 方法用于检测数组中的元素是否满足指定条件;
          // some() 方法会依次执行数组的每个元素：
          // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
          // 如果没有满足条件的元素，则返回false。
          // 注意： some() 不会对空数组进行检测。
          // 注意： some() 不会改变原始数组。
          return Object.keys(data).some(key => {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
            // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
            return String(data[key]).toLowerCase().indexOf(search) > -1
          })
        })
      }
      return this.unPassCourse
    }
  },
  data(){
    return{
      unPassCourse:[],
      dialogVisible: false,
      courseInfoMem: {},
      currentCourse: null,

      testMem:{},
      search:''
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

>>>>>>> yhy
</style>