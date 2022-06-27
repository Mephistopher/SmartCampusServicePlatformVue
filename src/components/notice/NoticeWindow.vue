<template>
  <div>
    <el-table
        :data="noticeTable"
        stripe
        style="width: 100%"
        height="288"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="通知" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNoticeDetail">
            {{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat">
      </el-table-column>
    </el-table>
    <el-dialog :title="noticeTitle" :visible.sync="dialogTableVisible" @closed="clearNoticeDetail">
      <div style="margin-left: 70%">发布时间：{{noticeCreateTime}}</div>
      <el-divider></el-divider>
      <div style="font-size: large; color: #000000" v-html="noticeDetail"></div>
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
      noticeTitle: "",
      noticeCreateTime: "",
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
      if (this.noticeDetail === ""){
        let arr = row.detail.split(/[\n]/)
        for (let i = 0 ; i < arr.length;i++) {
          let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
          this.noticeDetail = this.noticeDetail + addContent
        }
      }
      this.noticeDetail = row.detail
      this.noticeTitle = row.title
      this.noticeCreateTime = row.createTime.replace("T", "  ")
    },
    clearNoticeDetail() {
      this.noticeDetail =""
      console.log("notice cleared")
    }
  }
}
</script>

<style scoped>



</style>