<template>
  <el-row :gutter="40" >
    <p class="restitle">图书馆资源</p>
    <el-col :span="5" data="resourceData" pull="1" v-for="(o, index) in 4" :key="o" :offset="1" style="padding: 10px">
      <el-card :body-style="{ padding: '10px' }" shadow="hover" >
        <div class="picture" >
          <img id="img1" :src="resourceData[index].imgSrc" class="image">
        </div>
        <div style="padding: 14px; z-index: revert">
          <span>{{resourceData[index].resourseName}}</span>
          <div class="bottom clearfix">
<!--            <time class="time">{{ currentDate }}</time>-->
            <el-button type="text" class="button"  @click="handle(resourceData[index].resourseUrl)">查阅</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

<!--    <p class="restitle">  </p>-->
    <div>
      <p class="restitle2">常用资源</p>
    </div>
    <el-col :span="5" data="resourceData2" pull="1" v-for="(o, index) in 8" :key="o" :offset="1" style="padding: 10px">
      <el-card :body-style="{ padding: '8px' }" shadow="hover">
        <img :src="resourceData2[index].imgSrc" class="image">
        <div style="padding: 14px;">
          <span>{{ resourceData2[index].resourseName }}</span>
          <div class="bottom clearfix">
            <!--            <time class="time">{{ currentDate }}</time>-->
              <el-button type="text" class="button" @click="handle()">查阅</el-button>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>


</template>

<style>
.restitle{
  font-size: 30px;
  color: #333333;
  position: relative;
  right: 40%;
}
.restitle2{
  font-size: 30px;
  color: #333333;
  position: relative;
  left: 3%;
  width: 10%;
  height: 5%;}

.el-row {
  margin-bottom: 20px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;

}

.image {
  width: 100%;
  height: 60%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.picture{
  width: 100%;
  height: 60%;
}

.clearfix:after {
  clear: both
}

</style>

<script>
export default {
  data() {
    return {
      img1: require("@/assets/resource.png"),
      // currentDate: new Date()
      resourceData:[
        {
          resourseName:'数据库列表',
          imgSrc:require("@/assets/resource.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'期刊分级查询',
          imgSrc:require("@/assets/resource2.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'明远搜索',
          imgSrc:require("@/assets/resource3.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'四川大学教材',
          imgSrc:require("@/assets/resource4.png"),
          resourseUrl:'http://bilibili.com'
        }
      ],
      resourceData2:[
        {
          resourseName:'中国知网',
          imgSrc:require("@/assets/resource2.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'万方数据知识库',
          imgSrc:require("@/assets/resource.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'维普中文期刊',
          imgSrc:require("@/assets/resource4.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'CSSCI中文社会期刊',
          imgSrc:require("@/assets/resource3.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'超星电子图书',
          imgSrc:require("@/assets/resource.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'SCI',
          imgSrc:require("@/assets/resource2.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'JSTOR',
          imgSrc:require("@/assets/resource4.png"),
          resourseUrl:'http://bilibili.com'
        },
        {
          resourseName:'SpringerLink',
          imgSrc:require("@/assets/resource2.png"),
          resourseUrl:'http://bilibili.com'
        }

      ]
    };
  },
  methods:{
    handle(url) {
      window.open(url,"_blank")    }
  }
}

</script>
