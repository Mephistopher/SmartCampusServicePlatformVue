<template>
<div>
  <h5 style="font-size: 14px;font-weight: 200;text-align: left">
    <i class="el-icon-s-order"></i>
    计划要求
  </h5>
  <el-row :gutter="12" style="font-size: 18px">
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{'backgroundColor':'#a1bb4a','color':'#ffffff'}">
        <span class="semester-info-card-little-font">修读学分:</span>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{'backgroundColor':'#7fb1dc','color':'#ffffff'}">
        <span class="semester-info-card-little-font">修读门次:</span>
        {{item.length}}
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover" :body-style="{'backgroundColor':'#999999','color':'#ffffff'}">
        <span class="semester-info-card-little-font">未通过门次:</span>
        {{unCrossCourse(item)}}
      </el-card>
    </el-col>
  </el-row>

  <el-table
      :data="item"
      stripe
      :height="400"
      style="width: 100%">
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
        prop="count"
        label="选课次数"
        width="180">
    </el-table-column>
    <el-table-column
        prop="score"
        label="课程成绩">
    </el-table-column>
  </el-table>
</div>

</template>

<script>
export default {
  name: "semesterinfocardcontent",
  props:{
    item:{
      type: Array,
      default(){
        return   [ {
          "id": 46,
          "courseId": 938,
          "courseName": "软件技术基础",
          "userId": 1,
          "semester": "2002年春季",
          "score": 77,
          "count": 1,
          "createTime": "2022-06-27T10:00:48",
          "updateTime": "2022-06-27T21:16:52",
          "deleted": 0
        }]
      }
    }
  },
  computed:{
    unCrossCourse(){
      return courses=>{
        let unCross = 0
        for (let cours of courses) {
          if(cours.score < 60) unCross++
        }
        return unCross
      }
    }
  }
}
</script>

<style scoped>

</style>