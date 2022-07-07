
<template>
  <!-- 课表组件 -->
  <div class="class-table">
    <div class="table-wrapper">
      <div class="tabel-container">
        <table>
          <thead>
          <tr>
            <th v-for="(item,index) in classTableData.weeks" :key="index">{{item?'周'+item:''}}</th>
          </tr>
          </thead>
          <tbody >
          <tr v-for="(item,index) in classTableData.courses" :key="index" :class="{color1:index<4,color2:index>=4&&index<9,color3:index>=9}">
            <td width=""
            <td
                style="font-size:12px;word-wrap: break-word;
  word-break: break-all;"
            >{{changeCharacter(index)}}</td>
            <td v-for="(innerItem,idx) in item" :key="idx" @click="toScanDetail(innerItem,idx)">
              <div v-if="innerItem.courseName" :class="{
                color4:innerItem.id % 6===0,
                color5:innerItem.id % 6===1,
                color6:innerItem.id % 6===2,
                color7:innerItem.id % 6===3,
                color8:innerItem.id % 6===4,
                color9:innerItem.id % 6===5,
                }">
                {{innerItem.courseName}}
<!--                <br />{{this.mycolors[0]}}-->
                <br />
                地点：{{innerItem.location}}
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-dialog
        title="上课时间"
        :visible.sync="ScheDialogVisible"
        width="30%"
        center>
      <div style="width:230px;text-align:left!important;margin:0 auto;color:#999;font-size:16px">
        课程名称：{{showDetailData.courseName}}
        <br/>地点：{{showDetailData.location}}
<!--        <br/>上课时间：{{showDetailData.lessonsTime}}-->
        <br/>课程号：{{showDetailData.id}}
<!--        <br/>授课老师：{{showDetailData.lessonsTeacher}}-->
        <br/>详情：{{showDetailData.detail}}
        <br/>学分：{{showDetailData.credit}}
        <br/>专业号：{{showDetailData.majorId}}
        <br/>学期：{{showDetailData.semester}}
<!--        <br/>上课时间：{{showCourseTime()}}-->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="ScheDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
var that;
import { Dialog } from "vant";
export default {
  data(){
    return {
      mycolor:'red',
      ScheDialogVisible : false,
      showDetailData:{
        type: Object
      },
      mycolors:['#996699','#666666','#DB908A','#f3b2a1',
        '#abbf07','#72720f','#50BD8B','#72720f','#57a460'],
    }
  },
  props: {
    classTableData: {
      type: Object
    }
  },
  computed: {
    // 将数字转换成汉字
    changeCharacter(num) {
      return function(num) {
        var digArr = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12];
        var characterArr = [
          "第一节",
          "第二节",
          "第三节",
          "第四节",
          "第五节",
          "第六节",
          "第七节",
          "第八节",
          "第九节",
          "第十节",
          "第十一节",
          "第十二节"
        ];
        return characterArr[num];
      };
    },

    showCourseTime(){
      return function (){
        // var classNum = this.showDetailData.id % 12;
        var time;
        console.log('第几节'+this.showDetailData.classTime)
        switch (this.showDetailData.classTime-1){
          case 0: time = "08:15-09:00";break;
          case 1: time = "09:10-09:55";break;
          case 2: time = "10:15-11:00";break;
          case 3: time = "11:10-11:55";break;
          case 4: time = "13:30-14:35";break;
          case 5: time = "14:45-15:30";break;
          case 6: time = "15:40-16:25";break;
          case 7: time = "16:45-17:30";break;
          case 8: time = "17:40-18:25";break;
          case 9: time = "19:20-20:05";break;
          case 10: time = "20:15-21:00";break;
          case 11: time = "21:10-21:55";break;
        }
        return time;
      };
    }
  },
  methods: {
    // 查看该课程的相关详情
    toScanDetail(item, idx) {
      console.log(item)

      if(item.courseName){
        this.showDetailData = item
        this.ScheDialogVisible = true
      }
    },

  },

};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.table-wrapper {
  width: 100%;
  overflow: auto;
  margin-bottom: 60px;
}
table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  color: #677998;
}

thead {
  background: #ddd;
}
th {
  font-weight: normal;
  height: 46px !important;
}
tbody {
  font-size: 12px;
  background-color: rgba(207,255,228,0.7);
}
th,
td {
  text-align: center;
  height: 50px;
  border-right: 1px solid #fefefe;
  border-bottom: 1px solid #fefefe;
}
tr td div {
  background: #a5d16d;
  width: 100%;
  height: 100%;
  color: #efefef;
  border-radius: 10px;
  padding: 5px;
  box-sizing: border-box;
}

tr td:first-child {
  color: #333;
}
.course {
  background-color: #ebbbbb;
  color: #fff;
  display: inline-block;
  border-radius: 3px;
  width: 47%;
  margin: 1px 1%;
}
.bgColor {
  background-color: #89b2e5;
}
.color1 {
  background-color: rgba(207,255,228,0.7);
}
.color2 {
  background-color: rgba(255,230,207,0.7);
}
.color3 {
  background-color: rgba(207,228,255,0.7);
}
.color4 {
  background-color: #666666;
}
.color5 {
  background-color: #996699;
}
.color6 {
  background-color: #DB908A;
}
.color7 {
  background-color: #f3b2a1;
}
.color8 {
  background-color: #abbf07;
}
.color9 {
  background-color: #57a460;
}
</style>
