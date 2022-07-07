<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <NoticeWindow/>
    </el-col>
    <el-col :span="12">
      <NewsWindow/>
    </el-col>
  </el-row>
</template>

<script>

import NoticeWindow from "@/components/notice/NoticeWindow"
import NewsWindow from "@/components/notice/NewsWindow";

export default {
  name: "NoticeAndNews",
  components: {
    NoticeWindow,
    NewsWindow,
  }
}
</script>

<style scoped>

</style>