<template>
<div class="course-info-card">
  <el-descriptions title="课程信息" :column="1">
    <el-descriptions-item label="课程名">{{realCourseInfo.courseName}}</el-descriptions-item>
    <el-descriptions-item label="学分">{{realCourseInfo.credit}}</el-descriptions-item>
    <el-descriptions-item label="上课位置">{{realCourseInfo.location}}</el-descriptions-item>
    <el-descriptions-item>
      <div slot="label" style="margin: auto">上课时间</div>
      <span>第{{realCourseInfo.startWeek}}周～{{realCourseInfo.endWeek}}周</span>
      <el-tag v-for="time in realCourseInfo.courseTimeList"
              style="margin: 10px"
              size="mini">
        星期{{time.day}}第{{time.id%12}}节
      </el-tag>
    </el-descriptions-item>
    <el-descriptions-item label="上课老师">
      <div slot="label" style="margin: auto">上课老师</div>
      <el-tag type="success" v-for="teacher in realCourseInfo.teacherList">{{teacher.trueName}}</el-tag>
    </el-descriptions-item>
  </el-descriptions>

  <el-table
      :data="testInfo"
      style="width: 100%">
    <el-table-column
        label="考试状态"
        width="100">
      <template slot-scope="scope">
        {{testStatus(scope.row.status)}}
      </template>
    </el-table-column>
    <el-table-column
        label="考试分数"
        width="100"
        prop="score">
    </el-table-column>
    <el-table-column
        prop="courseTest.courseName"
        label="考试科目"
        width="180">
    </el-table-column>
    <el-table-column
        label="考试类型"
        width="100">
      <template slot-scope="scope">
        {{testType(scope.row.courseTest.testType)}}
      </template>
    </el-table-column>
    <el-table-column
        prop="courseTest.location"
        label="考试地址"
        width="180">
    </el-table-column>
    <el-table-column
        prop="courseTest.startTime"
        label="开考时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="courseTest.endTime"
        label="结束时间"
        width="180">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  name: "CourseInfoCard",
  props:{
    courseInfo:{
      type: Array,
      default(){
        return null
      }
    },
    testInfo:{
      type: Array,
      default() {
        return null
      }
    }
  },
  computed:{
    realCourseInfo(){
      return this.courseInfo[0]
    },
    testType(){
      return type=>{
        if(type===1) return '期末考试'
        if(type===2) return '期中考试'
        if(type===3) return '补考'
      }
    },
    testStatus(){
      return type=>{
        if(type===1) return '未开考'
        if(type===2) return '未参加'
        if(type===3) return '补考'
        if(type===4) return '考试已取消'
      }
    }
  }
}
</script>

<style scoped>
.a{
  vertical-align: center;
}
</style>