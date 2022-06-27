<template>
  <div>
    <el-table
        :data="newsTable"
        stripe
        style="width: 100%;"
        height="288"
        @cell-click="handleCellClick">
      <el-table-column prop="title" label="新闻" width="500">
        <template slot-scope="scope">
          <span style="margin-left: 10px; overflow: hidden;text-overflow:ellipsis;white-space: nowrap;"
                @click="showNewsDetail">
            {{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="dateFormat">
      </el-table-column>
    </el-table>
    <el-dialog :title="newsTitle" :visible.sync="dialogTableVisible" @closed="clearNewsDetail">
      <div style="margin-left: 60%">发布时间：{{newsCreateTime}}||点击量{{newsSeeCount}}</div>
      <el-divider></el-divider>
      <div style="font-size: large" v-html="newsDetail"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "newsWindow",
  data() {
    return {
      dialogTableVisible: false,
      arr:"",
      newsDetail: "",
      newsTitle: "",
      newsSeeCount: "",
      newsCreateTime: "",
      newsTable: [{
        id:3,
        title:"新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3新闻标题3",
        detail:"各位同学：\n" +
            "\n" +
            "按选课安排，正选期间需同时进行教材选定，请各位同学务必在选课期间（12月28-30日）完成。选课系统关闭后，将无法修改教材选用情况。\n" +
            "\n" +
            "教务处\n" +
            "\n" +
            "2021年12月24日",
        signature:"新闻署名3",
        seeCount:"0",
        createTime:"2022-06-25T16:17:07",
        updateTime:"2022-06-25T16:17:07",
        deleted:0
      },{
        id:1,
        title:"新闻标题1",
        detail:"新闻详情1",
        signature:"新闻署名1",
        seeCount:"0",
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
    showNewsDetail() {
      this.dialogTableVisible = true
    },
    handleCellClick(row) {
      if(this.newsDetail===""){
        let arr = row.detail.split(/[\n]/)
        for (let i = 0 ; i < arr.length;i++) {
          let addContent = '<p style="text-indent: 2em">' + arr[i] + '</p>'
          this.newsDetail = this.newsDetail + addContent
        }
      }
      this.newsTitle = row.title
      this.newsSeeCount = row.seeCount
      this.newsCreateTime = row.createTime.replace("T", "  ")
    },
    clearNewsDetail() {
      this.newsDetail =""
      console.log("news cleared")
    }
  }
}
</script>

<style scoped>



</style>