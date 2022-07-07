<template>
  <div style="border-bottom: #53A8FF 18px solid; border-radius: 5px">
    <el-table
        :data="newsTable.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
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
      <el-table-column prop="title" label="新闻" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNewsDetail">
            {{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat" >
        <template slot="header" slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="查看更多新闻" placement="top">
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
    <el-dialog :title="newsTitle" :visible.sync="dialogTableVisible" @closed="clearNewsDetail">
      <div>
        发布时间：{{ newsCreateTime }}
        <el-divider direction="vertical"/>
        点击量{{ newsSeeCount }}
        <el-divider direction="vertical"/>
        发布人{{ newsSign }}
      </div>
      <el-divider></el-divider>
      <div style="font-size: large; text-align: left" v-html="newsDetail"></div>
    </el-dialog>
  </div>
</template>

<script>
import {newsQueryNetwork} from "@/network/notice";

export default {
  name: "newsWindow",
  data() {
    return {
      search: "",
      dialogTableVisible: false,
      arr: "",
      newsDetail: "",
      newsTitle: "",
      newsSeeCount: "",
      newsCreateTime: "",
      newsSign: "",
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
      this.newsSign = row.signature
      this.newsCreateTime = row.createTime.replace("T", "  ")
    },
    clearNewsDetail() {
      this.newsDetail = ""
      console.log("news cleared")
    },
    handleButtonClick() {
      this.$router.push("/newslist")
    }
  },
  created() {
    newsQueryNetwork(1).then(res => {
      console.log(res)
      if (res.success) {
        this.newsTable = res.data.records
      }
    })
  }
}
</script>

<style scoped>
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #C6E2FF;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
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