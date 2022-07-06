<template>
<div class="select-course-context">

  <p style="font-size: 14px;font-weight: 200;text-align: left">
    <i class=" el-icon-tickets"></i>
    课程列表
  </p>
  <el-table
      :data="currentCourseList(currentPage)"
      stripe
      :highlight-current-row="true"
      empty-text="点击上方按钮查询数据"
      @selection-change="handleSelectionChange"
      style="width: 100%;min-height: 540px">
    <el-table-column
        :selectable="timeUnConflict"
        type="selection"
        width="55">
    </el-table-column>
    <el-table-column
        prop="id"
        label="课程号"
        width="130">
    </el-table-column>
    <el-table-column
        prop="courseName"
        label="课程名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="credit"
        label="学分"
        width="50">
    </el-table-column>
    <el-table-column
        prop="detail"
        label="课程备注"
        width="150">
    </el-table-column>
    <el-table-column
        label="更多详情"
    >
      <template slot-scope="scope">
        <el-popover
            placement="right"
            width="300"
            trigger="click">
              <el-descriptions  :title="scope.row.semester"
                               :column="1"
                               direction="vertical">
                <el-descriptions-item label="上课时间">
                  第{{scope.row.startWeek}}周到{{scope.row.endWeek}}周
                  <div style="margin-left: 15px">
                    <div v-for="item in scope.row.courseTimeList">
                      <el-tag type="info" size="mini">
                        星期{{item.day}}第{{item.id%12}}节,{{item.startTime}}到{{item.endTime}}
                      </el-tag>
                    </div>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item label="上课地点">
                  <div style="margin-left: 15px">
                    <el-tag size="small">{{scope.row.location}}</el-tag>
                  </div>
                </el-descriptions-item>
                <el-descriptions-item label="上课老师" >
                  <div style="margin-left: 15px">
                    <div v-for="item in scope.row.teacherList">
                      {{item.trueName}}
                    </div>
                  </div>
                </el-descriptions-item>
              </el-descriptions>
          <el-button slot="reference">点击显示</el-button>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
        align="right">
      <template slot="header" slot-scope="scope">
        <el-input
            size="mini"
            style="width: 50%"
            v-model="search"
            placeholder="输入关键词搜索"/>

        <el-button size="mini" type="warning" @click="selectCourseBatch">选择选中课程</el-button>
      </template>

      <template slot-scope="scope">
        <div v-if="!timeUnConflict(scope.row)">
          上课时间冲突
        </div>
        <div v-else>
          <el-tag size="mini">{{getCourseStock(scope.row.id)}}</el-tag>
          <el-button
              @click="queryStock(scope.row.id)"
              size="mini">查询课余量</el-button>
          <el-button
              size="mini"
              :disabled="getIsSelected(scope.row.id)"
              @click="selectCourse(scope.row.id)"
              type="warning" >选课</el-button>
        </div>
      </template>

    </el-table-column>
  </el-table>

<br/>

  <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="totalRecord">
  </el-pagination>
</div>
</template>

<script>
import {queryCourseStockNetwork} from "@/network/course";

export default {
  name: "select-course-context",
  props:{
    courseList:{
      type: Array,
      default(){
        return []
      }
    },
    usedTime:{
      type: Array,
      default(){
        return []
      }
    }
  },
  computed:{
    timeUnConflict(){
      return row =>{
        let timeList = row.courseTimeList
        for (let t of timeList) {
          if(this.usedTime.indexOf(t.id) !== -1){
            return false
          }
        }
        return true
      }
    },
    getIsSelected(){
      return courseId => {
        if(this.selectedMem[courseId] === undefined){
          return true
        }else {
          return this.selectedMem[courseId]
        }
      }
    },
    getCourseStock(){
      return courseId =>{
        if(this.stockMem[courseId] === undefined){
          return '请点击查询课余量-》'
        }else {
          return '当前课余量:'+this.stockMem[courseId]
        }
      }
    },
    currentCourseList(){
      return pageNum=>{
        const search = this.search
        let totalRecord = 0
        let courseList = []


        if (search) {
          courseList = this.courseList.filter(data => {
            return  Object.keys(data).some(key => {
              return  String(data[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }else {
          courseList = this.courseList
        }

        totalRecord = courseList.length
        this.totalRecord = totalRecord

        if (totalRecord % this.pageSize === 0){
          this.pages = totalRecord / this.pageSize
        }else {
          this.pages = totalRecord / this.pageSize + 1
        }
        let begin = 0;
        let end = 0;
        if (pageNum !== this.pages) {
          begin = (pageNum - 1) * this.pageSize
          end = begin + this.pageSize
        } else {
          begin = (pageNum - 1) * this.pageSize
          end = totalRecord
        }
        return courseList.slice(begin, end)
      }
    },
    tables () {

      return this.unPassCourse
    }
  },
  data(){
    return {

      search: '',


      userId: this.$store.getters.getLoginUser.id,
      multipleSelection: [],
      stockMem:{},
      selectedMem:{},
      currentPage: 1,
      totalRecord: 0,
      pageSize: 20,
      pages: 0
    }
  },
  methods:{
    handleSelectionChange(val){
      this.multipleSelection = val.map(item=>{return {courseId: item.id,courseName: item.courseName}})
    },
    queryStock(courseId){

      queryCourseStockNetwork(courseId,this.userId).then(res=>{
        if(!res.success){
          this.$message.error('查询课余量失败,'+res.errorMsg)
          return
        }
        this.$set(this.stockMem, courseId, res.data.stock)
        this.$set(this.selectedMem, courseId, res.data.isSelected)
      })
      console.log(courseId)
    },
    selectCourse(courseId){
      console.log(courseId)
      this.$emit('selectcourse', {
        courseId,
        userId: this.userId
      })
    },
    handleCurrentChange(){

    },
    selectCourseBatch(){
      this.$confirm('确认选择课程？')
          .then(_ => {
            this.$emit('selectBatch', this.multipleSelection)
            done()
          })
          .catch(_ => {})
    }
  }
}
</script>

<style scoped>
.select-course-context{
  min-height: 650px;
  margin: 0 20px;
  border-radius: 7px;
}
</style>