<template>
  <div>
    <el-table
        :data="noticeTable"
        stripe
        style="width: 45%"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="通知" width="500" label-class-name="noticeTableTitle" >
        <template slot-scope="scope">
          <span style="margin-left: 10px" @click="showNoticeDetail">{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat">
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      {{ noticeDetail }}
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "noticeWindow",
  data() {
    return {
      dialogTableVisible: false,
      noticeDetail: "",
      noticeTable: [{
        id:3,
        title:"公告标题3",
        detail:"公告详情3",
        signature:"公告署名3",
        createTime:"2022-06-25T16:17:07",
        updateTime:"2022-06-25T16:17:07",
        deleted:0
      },{
        id:1,
        title:"公告标题1",
        detail:"公告详情1",
        signature:"公告署名1",
        createTime:"2022-06-25T16:17:07",
        updateTime:"2022-06-25T16:17:07",
        deleted:0
      }]
    }
  },
  methods: {
    dateFormat(row, column) {
      const daterc = row[column.property]
      if(daterc!=null){
        const dateMat= daterc.replace("T", "  ")
        return dateMat;
      }
    },
    showNoticeDetail() {
      this.dialogTableVisible = true
    },
    handleCellClick(row) {
      this.noticeDetail = row.detail
    }
  }
}
</script>

<style scoped>



</style>