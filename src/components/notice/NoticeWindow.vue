<template>
  <div style="border-bottom: #53A8FF 18px solid; border-radius: 5px">
    <el-table
        :data="noticeTable.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%; overflow-x: hidden"
        height="777"
        :header-cell-style="{
            color: '#fff',
            background: '#409EFF',
            fontWeight: '700',
          }"
        :default-sort="{prop: 'createTime', order: 'descending'}"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="公告" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNoticeDetail">
            {{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="createTime" :formatter="dateFormat" >
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看更多公告" placement="top">
            <el-button icon="el-icon-more" size="mini" circle @click="handleButtonClick"/>
          </el-tooltip>
          <el-input
              v-model="search"
              size="mini"
              style="width: 80%"
              placeholder="输入标题关键字搜索"/>
        </template>
      </el-table-column>
      <el-table-column sortable width="50"></el-table-column>
    </el-table>
    <el-dialog :title="noticeTitle" :visible.sync="dialogTableVisible" @closed="clearNoticeDetail">
      <div>
        发布时间：{{ noticeCreateTime }}</div>
      <el-divider></el-divider>
      <div style="font-size: large; text-align: left" v-html="noticeDetail"></div>
    </el-dialog>
  </div>
</template>

<script>

import {noticeQueryNetwork} from "@/network/notice";

export default {
  name: "noticeWindow",
  data() {
    return {
      search: "",
      dialogTableVisible: false,
      noticeDetail: "",
      noticeTitle: "",
      noticeCreateTime: "",
      noticeTable: [{
        id: 3,
        title: "公告标题3",
        detail: "公告详情3",
        signature: "公告署名3",
        createTime: "2022-06-25T16:17:07",
        updateTime: "2022-06-25T16:17:07",
        deleted: 0
      }]
    }
  },
  methods: {
    dateFormat(row, column) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = daterc.replace("T", "  ")
        return dateMat;
      }
    },
    showNoticeDetail() {
      this.dialogTableVisible = true
    },
    handleCellClick(row) {
      if (this.noticeDetail === "") {
        let arr = row.detail.split(/[\n]/)
        for (let i = 0; i < arr.length; i++) {
          let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
          this.noticeDetail = this.noticeDetail + addContent
        }
      }
      this.noticeDetail = row.detail
      this.noticeTitle = row.title
      this.noticeCreateTime = row.createTime.replace("T", "  ")
    },
    clearNoticeDetail() {
      this.noticeDetail = ""
      console.log("notice cleared")
    },
    handleButtonClick() {
      this.$router.push("/noticelist")
    }
  },
  created() {
    noticeQueryNetwork(1, 999).then(res => {
      console.log(res)
      if (res.success) {
        this.noticeTable = res.data.records
      }
    })
  },
}
</script>

<style scoped>
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  border-radius: 15px;
  background-color: #C6E2FF;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 5px;
  opacity: 0.5;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #53A8FF;
}

::v-deep .el-table colgroup col[name='gutter'] {
  width: 0px;
}

::v-deep .el-table__body {
  width: 100% !important;
}
</style>