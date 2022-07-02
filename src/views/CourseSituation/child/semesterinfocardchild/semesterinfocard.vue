<template>
<div class="semester-info-card">
  <el-tabs type="border-card" @tab-click="clickSemesterTab">
    <el-tab-pane  v-for="semester in semesters"
                  :semester="semester"
                  :label="semester">
      <semesterinfocardcontent :item="courseMem[currentSemester]"/>
    </el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
import Semesterinfocardcontent from "@/views/CourseSituation/child/semesterinfocardchild/semesterinfocardcontent";
import {querySemesterCourseNetwork} from "@/network/course";

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
      currentSemester: '',

    }
  },
  methods:{
    clickSemesterTab(p){
      let semester = p.$attrs.semester
      let userId = this.$store.getters.getLoginUser.id
      this.querySemesterCourse(semester, userId)
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
</style>