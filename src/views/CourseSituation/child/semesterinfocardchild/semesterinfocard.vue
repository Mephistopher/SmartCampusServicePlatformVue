<<<<<<< HEAD
<template>
<div class="semester-info-card">
  <el-tabs type="border-card" @tab-click="clickSemesterTab" >
    <el-tab-pane label="提示" closable>
      <div class="semester-info-card-start-page">
        这是一段提示信息
      </div>
    </el-tab-pane>

    <el-tab-pane  v-for="semester in semesters"
                  :lazy="true"
                  :semester="semester"
                  :label="semester">
      <semesterinfocardcontent :item="courseMem[currentSemester]"
                              :credit-info="creditMem[currentSemester]"
      />
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import Semesterinfocardcontent from "@/views/CourseSituation/child/semesterinfocardchild/semesterinfocardcontent";
import {querySemesterCourseNetwork, queryUserCreditNetwork} from "@/network/course";

export default {
  name: "semesterinfocard",
  components: {Semesterinfocardcontent},
  props: {
    semesters:{
      type: Array,
      default(){
        return  [
          "2022年春季"
        ]
      }
    }
  },
  data(){
    return {
      courseMem: {},
      creditMem: {},
      currentSemester: '',
    }
  },
  methods:{
    clickSemesterTab(p){
      let semester = p.$attrs.semester
      let userId = this.$store.getters.getLoginUser.id
      this.querySemesterCourse(semester, userId)

      this.querySemesterCreditInfo(semester,userId)
    },
    querySemesterCreditInfo(semester, userId){
      if(semester == null || userId == null) return
      if(this.creditMem[semester] === undefined || this.creditMem[semester] === null){
        queryUserCreditNetwork(userId, semester).then(res=>{
          if(res.success) {
            this.creditMem[semester] = res.data
            this.currentSemester = semester
          }
        })
      }else {
        this.currentSemester = semester
      }
    },
    querySemesterCourse(semester, userId){
      if(semester == null || userId == null) return
      if(this.courseMem[semester] === undefined || this.courseMem[semester] == null){
        querySemesterCourseNetwork(userId,semester).then(res => {
          if(res.success){
            this.courseMem[semester] = res.data.records
            this.currentSemester = semester
          }
        })
      }else{
        this.currentSemester = semester
      }
    }
  }
}
</script>

<style scoped>
.semester-info-card-little-font{
  font-size: 13px;
}
.semester-info-card-start-page{
  min-height: 500px;
}
=======
<template>
<div class="semester-info-card">
  <el-tabs type="border-card" @tab-click="clickSemesterTab" >
    <el-tab-pane label="提示" closable>
      <div class="semester-info-card-start-page">
        这是一段提示信息
      </div>
    </el-tab-pane>

    <el-tab-pane  v-for="semester in semesters"
                  :lazy="true"
                  :semester="semester"
                  :label="semester">
      <semesterinfocardcontent :item="courseMem[currentSemester]"
                              :credit-info="creditMem[currentSemester]"
      />
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import Semesterinfocardcontent from "@/views/CourseSituation/child/semesterinfocardchild/semesterinfocardcontent";
import {querySemesterCourseNetwork, queryUserCreditNetwork} from "@/network/course";

export default {
  name: "semesterinfocard",
  components: {Semesterinfocardcontent},
  props: {
    semesters:{
      type: Array,
      default(){
        return  [
          "2022年春季"
        ]
      }
    }
  },
  data(){
    return {
      courseMem: {},
      creditMem: {},
      currentSemester: '',
    }
  },
  methods:{
    clickSemesterTab(p){
      let semester = p.$attrs.semester
      let userId = this.$store.getters.getLoginUser.id
      this.querySemesterCourse(semester, userId)

      this.querySemesterCreditInfo(semester,userId)
    },
    querySemesterCreditInfo(semester, userId){
      if(semester == null || userId == null) return
      if(this.creditMem[semester] === undefined || this.creditMem[semester] === null){
        queryUserCreditNetwork(userId, semester).then(res=>{
          if(res.success) {
            this.creditMem[semester] = res.data
            this.currentSemester = semester
          }
        })
      }else {
        this.currentSemester = semester
      }
    },
    querySemesterCourse(semester, userId){
      if(semester == null || userId == null) return
      if(this.courseMem[semester] === undefined || this.courseMem[semester] == null){
        querySemesterCourseNetwork(userId,semester).then(res => {
          if(res.success){
            this.courseMem[semester] = res.data.records
            this.currentSemester = semester
          }
        })
      }else{
        this.currentSemester = semester
      }
    }
  }
}
</script>

<style scoped>
.semester-info-card-little-font{
  font-size: 13px;
}
.semester-info-card-start-page{
  min-height: 500px;
}
>>>>>>> yhy
</style>