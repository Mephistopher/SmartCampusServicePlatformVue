<template>
  <div class="course-table" >
    <template>
      <el-table
          border
          :data="table"
          style="width: 100%">
        <el-table-column
            align="left">
          <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
        <el-table-column
            label="周1">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 1)!=null">{{showCourse(scope.row, 1)}}</div>
          </template>

        </el-table-column>
        <el-table-column
            label="周2">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 2)!=null">{{showCourse(scope.row, 2)}}</div>
          </template>
        </el-table-column>
        <el-table-column
            label="周3">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 3)!=null">{{showCourse(scope.row, 3)}}</div>
          </template>
        </el-table-column>
        <el-table-column
            label="周4">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 4)!=null">{{showCourse(scope.row, 4)}}</div>
          </template>
        </el-table-column>
        <el-table-column
            label="周5">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 5)!=null">{{showCourse(scope.row, 5)}}</div>
          </template>
        </el-table-column>
        <el-table-column
            label="周6">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 6)!=null">{{showCourse(scope.row, 6)}}</div>
          </template>
        </el-table-column>
        <el-table-column
            label="周7">
          <template slot-scope="scope">
            <div v-if="showCourse(scope.row, 7)!=null">{{showCourse(scope.row, 7)}}</div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: "CourseTable",
  data(){
    return {
      table: [1,2,3,4,5,6,7,8,9,10,11,12]
    }
  },
  props: {
    courses: {
      type: Array,
      default(){
        return null
      }
    }
  },
  computed:{
    showCourse(){
      return (time, day)=>{
        for (let cours of this.courses) {
          let times = cours.courseTimeList
          for (let t of times) {
            if(day === t.day && time === (t.id%12===0?12:t.id%12)){
              return cours.courseName
            }
          }
        }
        return null
      }
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>