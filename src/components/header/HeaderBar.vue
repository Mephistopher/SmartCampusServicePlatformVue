<template>
  <div>
    <div style="position: absolute; left: 15px">
      <span slot="title">
        <span style="display: inline-block;
              font-size: 26px;
              width: 100%;text-align: center;
              color: rgba(0, 0, 0, 0.1) !important;
              -webkit-text-stroke: 1px rgba(0, 0, 150, 0.7);
              -webkit-text-fill-color: rgba(0, 0, 150, 0.7);
              -webkit-background-clip: text;">
          智慧校园服务平台
        </span>
      </span>
    </div>
    <div style="position: absolute; left: 79%">
      <el-button icon="el-icon-date" type="primary"
                 style="height: 60px; border-radius: 0px;bottom: -60px;position: absolute" @click="showScheduleImage">
        查看作息时间
      </el-button>
    </div>
    <div>
      <el-avatar shape="circle" :size="50" :src="imgsrc2"
                 style="position: absolute; left: 87%; margin-top: 5px;"></el-avatar>
    </div>
    <div
        style="position: absolute; left: 90%; width: 180px; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;">
      <span>{{ this.Name }}</span>
    </div>
    <el-dialog
        title="作息时间表"
        :visible.sync="dialogVisible"
        width="50%"
        center>
      <el-image :src="imgsrc1" fit="contain"></el-image>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import img1 from '@/assets/schedule.png'
import img2 from '@/assets/defaultAvatar.jpg'

export default {
  name: "HeaderBar",
  data() {
    return {
      imgsrc1: img1,
      imgsrc2: img2,
      dialogVisible: false,
      Name: "我是为了和你相遇才来到这个世界上的"
    }
  },
  methods: {
    showScheduleImage() {
      this.dialogVisible = true;
    },
  }
}
</script>

<style scoped>

</style>