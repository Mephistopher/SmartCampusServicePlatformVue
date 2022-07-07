<<<<<<< HEAD
<template>
<div>
  <div class="general-main">
     <TakeCourseGeneralItem v-for="item in general" :point="item.point" :detail="item.detail">
       <el-button slot="icon" icon="el-icon-wind-power"
                  style="width: 45px;height: 45px;"
                  :style="{'backgroundColor': item.color}"
                  circle/>
     </TakeCourseGeneralItem>
  </div>
</div>
</template>

<script>
import TakeCourseGeneralItem from "@/views/CourseSituation/child/takecoursechild/TakeCourseGeneralItem";
export default {
  name: "TakeCourseGeneral",
  components: {TakeCourseGeneralItem},
  props:{
    general:{
      type: Array,
      default(){
        return [
          {
            color: '#c76a66',
            point: 170.0,
            detail: '未通过的总学分'
          },
          {
            color: '#edac89',
            point: 148,
            detail: '已获得学分'
          },
          {
            color: '#99c1e3',
            point: 74,
            detail: '通过门次'
          },
          {
            color: '#cc90da',
            point: 148,
            detail: '未通过门次'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.general-main{
  display: flex;
  justify-content: center;
}
</style>