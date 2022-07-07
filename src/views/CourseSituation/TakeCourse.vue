<<<<<<< HEAD
<template>
<div>
  <show-window>
    <div slot="title">
      <i class="el-icon-s-finance"></i>
      <span>课程情况</span>
      <i class="el-icon-arrow-right"></i>
      <span>已修读情况</span>
    </div>

    <div slot="main">
      <TakeCourseGeneral :general="courseGeneral"/>

      <el-divider></el-divider>

      <semesterinfocard id="semester-info-card"
                        :semesters="semester"/>
    </div>
  </show-window>
</div>
</template>

<script>
import ShowWindow from "@/components/showwindow/ShowWindow";
import TakeCourseGeneral from "@/views/CourseSituation/child/takecoursechild/TakeCourseGeneral";
import Semesterinfocard from "@/views/CourseSituation/child/semesterinfocardchild/semesterinfocard";
import {queryTotalCreditNetwork, queryUnPassCreditNetwork} from "@/network/myscore";
import {queryUserSemester} from "@/network/user";

export default {
  name: "TakeCourse",
  components: {Semesterinfocard, TakeCourseGeneral, ShowWindow},
  data(){
    return {
      courseGeneral: [],
      semester: null
    }
  },
  mounted() {
    let userId = this.$store.getters.getLoginUser.id
    this.queryCourseGeneral(userId)
    queryUserSemester(userId).then(res=>{
      if(res.success){
        this.semester = res.data
        this.semester.sort((a,b)=>b.localeCompare(a))
      }
    })

  },
  methods:{
    queryCourseGeneral(userId){
      let general = [
        {
          color: '#edac89',
          detail: '已获得学分'
        },
        {
          color: '#99c1e3',
          detail: '通过门次'
        },
        {
          color: '#c76a66',
          detail: '未通过的总学分'
        },
        {
          color: '#cc90da',
          detail: '未通过门次'
        }
      ]
      queryTotalCreditNetwork(userId).then(res => {
        if(!res.success){
          this.$message.error('查询修读概括失败！'+res.errorMsg)
          return
        }
        let data = res.data;
        general[0].point = data.total
        general[1].point = data.count
        return queryUnPassCreditNetwork(userId)
      }).then(res =>{
        if(!res.success){
          this.$message.error('查询修读概括失败！'+res.errorMsg)
          return
        }
        let data = res.data;
        general[2].point = data.total
        general[3].point = data.count
        this.courseGeneral = general
      })
    }
  }
}
</script>

<style scoped>
#semester-info-card{
  margin: 20px 12px;
}
</style>