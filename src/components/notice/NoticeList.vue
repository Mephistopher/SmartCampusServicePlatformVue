<template>
  <div>
    <el-table
        :data="noticeTable.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%;border-bottom: #53A8FF 18px solid; border-radius: 5px"
        :header-cell-style="{
            color: '#fff',
            background: '#409EFF',
            fontWeight: '700',
          }"
        height="792"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="公告">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNoticeDetail">
            {{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" width="500">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              style="width: 80%"
              placeholder="输入标题关键字搜索"/>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="noticeTitle" :visible.sync="dialogTableVisible" @closed="clearNoticeDetail">
      <div style="margin-left: 70%">发布时间：{{ noticeCreateTime }}</div>
      <el-divider></el-divider>
      <div style="font-size: large; color: #000000" v-html="noticeDetail"></div>
    </el-dialog>
    <el-pagination
        align="right"
        background
        layout="prev, pager, next, jumper"
        :page-count="this.pageCount"
        @current-change="handleCurrentChange"
        :page-size="this.pageSize">
    </el-pagination>
  </div>
</template>

<script>

import {noticeListQueryNetwork} from "@/network/notice";

export default {
  name: "noticeWindow",
  data() {
    return {
      pageCount: 1,
      pageNow: 1,
      pageSize: 15,
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
      }],
      mem: {}
    }
  },
  methods: {
    dateFormat(row, column) {
      const daterc = row[column.property]
      if (daterc != null) {
        return daterc.replace("T", "  ")
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
    handleCurrentChange(val) {
      if (this.mem[val] != null || this.mem[val] !== undefined) {
        this.noticeTable = this.mem[val]

      } else {
        noticeListQueryNetwork(val).then(res => {
          console.log(res)
          if (res.success) {
            this.noticeTable = res.data.records
            this.mem[val] = res.data.records
            console.log(res.data.pages)
          }
        })
      }
      this.pageNow = val
    }
  },
  beforeCreate() {
    noticeListQueryNetwork().then(res => {
      console.log(res)
      if (res.success) {
        this.pageCount = res.data.pages
        this.noticeTable = res.data.records
        this.mem[1] = res.data.records
      }
    })
  },
}
</script>

<style scoped>


</style>