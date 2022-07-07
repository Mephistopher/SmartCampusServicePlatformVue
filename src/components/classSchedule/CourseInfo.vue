<template>
  <div class="hello">
<!--    <h1>element-ui表格</h1>-->
    <el-row class="table-grid-content">
      <el-col :span="18" class="grid">
        <el-input v-model="input" placeholder="请输入课程号，课程名，学期或专业号"></el-input>
      </el-col>
      <el-col :span="3" class="grid" :gutter="1">
        <el-button type="success" icon="el-icon-search" @click="queryAllCourses()">搜索</el-button>
      </el-col>
<!--      <el-col :span="2" class="grid" :gutter="15">-->
<!--        <el-button type="primary" @click="addMembers()">增加</el-button>-->
<!--      </el-col>-->
    </el-row>

    <el-table :data="tables.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              :stripe="true" :border="true" width="100%">
      <el-table-column label="课程号" prop="id" ></el-table-column>
      <el-table-column label="课程名" prop="courseName"></el-table-column>
      <el-table-column label="学期" prop="semester"></el-table-column>
      <el-table-column label="专业号" prop="majorId"></el-table-column>
      <el-table-column label="学分" prop="credit"></el-table-column>

        <el-table-column label="教师详情"  >
          <template slot-scope="scope">
          <el-button round="true" @click="showTeacher(scope.$index)">详情</el-button>
          </template>
        </el-table-column>

      <el-table-column label="课程详情" >
        <template slot-scope="scope">
          <el-button round="true" @click="showCourse(scope.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" style="margin-top: 15px">
      <el-pagination
          align="right"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="prev, pager, next,total"
          background
          :total="tables.length"
          hide-on-single-page
      >
      </el-pagination>
    </div>

    <el-dialog
        title="教师详情"
        :visible.sync="dialogVisible"
        width="30%"
        center>
      <el-table  :stripe="true" :data="teacherList" :border="true" width="100%">
        <el-table-column label="教师ID" prop="idNumber"></el-table-column>
        <el-table-column label="姓名" prop="trueName"></el-table-column>
        <el-table-column label="学历" prop="ebg"></el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="时间详情"
        :visible.sync="dialogCourseTime"
        width="30%"
        center>
      <el-table  :stripe="true" :data="courseTimeList" :border="true" width="100%">
        <el-table-column label="时间">
          <template slot-scope="scope">
            <!--            <div @click="showTeacher(scope.$index)">-->
            <!--            <el-button round="true" @click="showTeacher(scope.$index)">详情</el-button>-->
            {{changeTime(courseTimeList[scope.$index].day)}}
            <!--            </div>-->
          </template>
        </el-table-column>        <el-table-column label="开始时间" prop="startTime"></el-table-column>
        <el-table-column label="结束时间" prop="endTime"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogCourseTime = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { musicBroadcastingDetails } from '@/api/index.js'
import axios from 'axios'
import {queryAllCoursesNetwork} from "@/network/course";

export default {

  name: 'HelloWorld',
  data() {
    return {
      dialogVisible: false,
      dialogCourseTime:false,
      currentPage:1,//当前页码
      pageSize: 10,//每页显示条数
    msg: 'Welcome to Your Vue.js App',
      isAddMembers: false,
      editForm: [],
      addForm: [],
      searchData: '',
      input: '',
      id:'',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      classData:[],
      teacherList: [],
      courseTimeList: []
    }
  },

  computed: {
    tables() {
      const input = this.input
      if (input) {
        console.log("input输入的搜索内容：" + this.input)
        return this.classData.filter(data => {
          console.log("object:" + Object.keys(data))
          return Object.keys(data).some(key => {
            // console.log('filter' +String(data[key]).toLowerCase().indexOf(input) > -1)
            this.currentPage = 1
            return String(data[key]).toLowerCase().indexOf(input) > -1
          })
        })
      }
      return this.classData
    },
  },
  methods: {
    changeTime(num){
      var ans = "星期"
      switch (num){
        case 1: ans+='一';break;
        case 2: ans+='二';break;
        case 3: ans+='三';break;
        case 4: ans+='四';break;
        case 5: ans+='五';break;
        case 6: ans+='六';break;
        case 7: ans+='日';break;
      }
      return ans
    },
    handleEdit(index, row) {
      console.log( row)
      //row是该行tableData对应的一行

    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },

    showTeacher(index) {
      this.teacherList=this.classData[index].teacherList
      this.dialogVisible = true;
    },
    showCourse(index){
      this.courseTimeList=this.classData[index].courseTimeList
      this.dialogCourseTime = true;
    },
    queryAllCourses(){
      queryAllCoursesNetwork().then(res=>{
        console.log("返回数据")
        res.data.size = 200
        console.log(res.data.size)
        console.log(res.data.records)
        this.classData = res.data.records
      })

    },

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-grid-content {
  border-radius: 4px;
  height: 50px;
  background: #ebeef5;
  padding: 10px;
}
</style>
