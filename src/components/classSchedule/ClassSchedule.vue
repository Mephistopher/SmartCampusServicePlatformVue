<template>
<!--  <Schedule/>-->
  <div>

    <el-row class="table-grid-content">
      <el-col :span="4" class="grid">
        <el-select v-model="value" placeholder="请选择学期">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" class="grid" :gutter="1">
        <el-button type="success" icon="el-icon-search" @click="getCourseArr">搜索</el-button>
      </el-col>
    </el-row>

    <v-ClassTable v-if="update" :classTableData="classTableData" />

    <el-table :data="returnCourseData" :stripe="true" :border="true" width="100%">
      <el-table-column label="课程号" prop="id" width="120px"></el-table-column>
      <el-table-column label="课程名" prop="courseName"></el-table-column>
      <el-table-column label="学期" prop="semester"width="160px"></el-table-column>
      <el-table-column label="专业号" prop="majorId" width="80px"></el-table-column>
      <el-table-column label="学分" prop="credit" width="80px"></el-table-column>
      <el-table-column label="地点" prop="location"></el-table-column>
      <el-table-column label="说明" prop="detail"></el-table-column>

      <el-table-column label="教师（点击详情）"  >
        <template slot-scope="scope">
          <div @click="showTeacher(scope.$index)">
<!--            <el-button round="true" @click="showTeacher(scope.$index)">详情</el-button>-->
            {{showTeacherName(scope.$index)}}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="课程（点击详情）" >
        <template slot-scope="scope">
          <div @click="showCourse(scope.$index)">
<!--            <el-button round="true" @click="showCourse(scope.$index)">详情</el-button>-->
            {{showCourseTime(scope.$index)}}
          </div>
        </template>
      </el-table-column>
    </el-table>

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
        </el-table-column>
        <el-table-column label="开始时间" prop="startTime"></el-table-column>
        <el-table-column label="结束时间" prop="endTime"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogCourseTime = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
<!--  <div>-->
<!--  </div>-->
</template>
<script>
import Schedule from "@/components/classSchedule/Schedule";
import {conditionPageQueryUserCourseNetwork, queryScheduleNetwork} from "@/network/course";
export default {
  components: {"v-ClassTable": Schedule},
  data() {
    return {
      msg: "",
      update:true,
      dialogVisible: false,
      dialogFormVisible:false,
      dialogCourseTime:false,
      classData:[],
      teacherList: [],
      courseTimeList: [],
      tmpCoursesIdArr :[],
      options: [{
        value: '2022年春季',
        label: '2022年春季'
      }, {
        value: '2021年秋季',
        label: '2021年秋季'
      }, {
        value: '2021年春季',
        label: '2021年春季'
      }, {
        value: '2020年秋季',
        label: '2020年秋季'
      }, {
        value: '2020年春季',
        label: '2020年春季'
      }],
      value: '2022年春季',
      classTableData:{
        weeks: ["", "一", "二", "三", "四", "五","六","日"],
        courses: [],
      },

      info : [
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
        [{},{},{},{},{},{},{}],
      ],
      returnCourseData:[],
       loginUser :  this.$store.getters.getLoginUser,
    };
  },
  created() {
    this.getCourseArr();
    this.passCourse();
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

    getCourseArr(){
      conditionPageQueryUserCourseNetwork(this.loginUser.id, this.value).then(res=>{
        console.log('一次查询返回值：')
        console.log(res.data.records)
        this.tmpCoursesIdArr = []
        this.info = [
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
          [{},{},{},{},{},{},{}],
        ]
        for(var i = 0; i < res.data.records.length; i++){
          this.tmpCoursesIdArr.push(res.data.records[i].courseId)
        }
        console.log('数组：')
        console.log(this.tmpCoursesIdArr)
        this.querySchedule()
      })
    },
    querySchedule(){
      queryScheduleNetwork(this.tmpCoursesIdArr).then(res=>{
        console.log('二次查询返回值')
        console.log(res)
        this.returnCourseData = res.data
        this.fillInfo()
      })
    },

    passCourse(){
      this.classTableData.courses = this.info;
    },
    fillInfo(){   //传入数据填入课程表二维数组
      // console.log('enter into info')
      // console.log(this.classTableData.courses)
      this.reload()
      for(var i=0;i<this.returnCourseData.length;i++){
        var course = this.returnCourseData[i]
        // console.log('下标i：'+i+'  course:'+course.courseName)
        for(var j=0;j<course.courseTimeList.length;j++){
          var courseTime = course.courseTimeList[j]
          // console.log('下标j：'+j+'  courseTime:'+courseTime.endTime)
          var day = courseTime.day
          var classTime = courseTime.id % 12
          if(classTime === 0) classTime = 12
          // course.assign(course,{'classTime':''})
          course.classTime = classTime
          // course.assign(course,{'color':''})
          // this.$set(course,'color','')
          // course.color = this.colors[Math.random()*this.colors.length]
          // console.log('day：'+day+'  classTime:'+course.classTime)
          this.info[classTime-1][day-1] = course
          // console.log('day：'+day+'  classTime:'+this.info[classTime-1][day-1].classTime)
        }
      }
      this.classTableData.courses = this.info
      console.log(this.classTableData.courses)
    },

    reload() {
      // 移除组件
      this.update = false
      // 在组件移除后，重新渲染组件
      // this.$nextTick可实现在DOM 状态更新后，执行传入的方法。
      this.$nextTick(() => {
        this.update = true
      })
    },
    showTeacher(index) {
      this.teacherList=this.returnCourseData[index].teacherList
      this.dialogVisible = true;
    },
    showTeacherName(index){
      var str = ''
      for(var i= 0;i< this.returnCourseData[index].teacherList.length;i++){
        str += this.returnCourseData[index].teacherList[i].trueName
        str += '\n'
      }
      return str
    },
    showCourse(index){
      this.courseTimeList=this.returnCourseData[index].courseTimeList
      this.dialogCourseTime = true;
    },
    showCourseTime(index) {
      var course = this.returnCourseData[index]
      var str = '';
      str += course.startWeek +'-'+ course.endWeek + '周>>'+this.changeTime(course.courseTimeList[0].day)
      str += '第'
      for(var i= 0;i< course.courseTimeList.length;i++){
        var tmp = this.returnCourseData[index].courseTimeList[i].id % 12
        if(tmp === 0) tmp = 12
        str += tmp
        if(i!=course.courseTimeList.length-1){
          str += '，'
        }
      }
      str += '节'
      return str
    }
  },


};
</script>
<style>
.table-grid-content {
  border-radius: 4px;
  height: 50px;
  background: #ebeef5;
  padding: 10px;
}
</style>
