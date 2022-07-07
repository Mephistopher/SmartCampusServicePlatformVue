<template>
  <div>
    <el-table
        :data="newsTable.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        stripe
        style="width: 100%;border-bottom: #53A8FF 18px solid; border-radius: 5px"
        height="792"
        :header-cell-style="{
            color: '#fff',
            background: '#409EFF',
            fontWeight: '700',
          }"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="新闻">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNewsDetail">
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
    <el-dialog :title="newsTitle" :visible.sync="dialogTableVisible" @closed="clearNewsDetail">
      <div style="margin-left: 60%">发布时间：{{ newsCreateTime }}
        <el-divider direction="vertical"/>
        点击量{{ newsSeeCount }}
      </div>
      <el-divider></el-divider>
      <div style="font-size: large; text-align: left" v-html="newsDetail"></div>
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
import {newsListueryNetwork} from "@/network/notice";

export default {
  name: "newsWindow",
  data() {
    return {
      pageCount: 1,
      pageNow: 1,
      pageSize: 15,
      search: "",
      dialogTableVisible: false,
      newsDetail: "",
      newsTitle: "",
      newsSeeCount: "",
      newsCreateTime: "",
      newsTable: [{
        id: 3,
        title: "新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3",
        detail: "各位同学：\n" +
            "\n" +
            "按选课安排，正选期间需同时进行教材选定，请各位同学务必在选课期间（12月28-30日）完成。选课系统关闭后，将无法修改教材选用情况。\n" +
            "\n" +
            "教务处\n" +
            "\n" +
            "2021年12月24日",
        signature: "新闻署名3",
        seeCount: "0",
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
        const dateMat = daterc.replace("T", "  ")
        return dateMat;
      }
    },
    showNewsDetail() {
      this.dialogTableVisible = true
    },
    handleCellClick(row) {
      if (this.newsDetail === "") {
        let arr = row.detail.split(/[\n]/)
        for (let i = 0; i < arr.length; i++) {
          let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
          this.newsDetail = this.newsDetail + addContent
        }
      }
      this.newsTitle = row.title
      this.newsSeeCount = row.seeCount
      this.newsCreateTime = row.createTime.replace("T", "  ")
    },
    clearNewsDetail() {
      this.newsDetail = ""
      console.log("news cleared")
    },
    handleCurrentChange(val) {
      if (this.mem[val] != null || this.mem[val] !== undefined) {
        this.newsTable = this.mem[val]
      } else {
        newsListueryNetwork(val).then(res => {
          console.log(res)
          if (res.success) {
            this.newsTable = res.data.records
            this.mem[val] = res.data.records
            console.log(res.data.pages)
          }
        })
      }
      this.pageNow = val
    }
  },
  beforeCreate() {
    newsListueryNetwork().then(res => {
      console.log(res)
      if (res.success) {
        this.pageCount = res.data.pages
        this.newsTable = res.data.records
        this.mem[1] = res.data.records
      }
    })
  },
}
</script>

<style scoped>

</style>