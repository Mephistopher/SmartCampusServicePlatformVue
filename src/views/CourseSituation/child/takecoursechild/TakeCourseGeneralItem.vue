<template>
  <div class="general-item">
    <div class="general-item-icon">
      <slot name="icon">
        <el-button icon="el-icon-wind-power"
                   style="width: 45px;height: 45px"
                   circle
                   :style="{'backgroundColor':color}"/>
      </slot>
    </div>

    <div class="general-item-context">
      <div class="general-item-context-point" :style="{'color':color}">{{point}}</div>
      <div style="font-size: 13px;">{{ detail }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TakeCourseGeneralItem",
  props:{
    color:{
      type: String,
      default: '#99c1e3'
    },
    point:{
      type: Number,
      default: 0.0
    },
    detail:{
      type: String,
      default: 'detail'
    }
  }
}
</script>

<style scoped>
.general-item{
  display:flex;
  align-items:center;
  height: 65px;
  width: 210px;
  border: 0.5px #D8D8D8 dashed;
  padding-left: 7px;
}
.general-item-icon{
   display: inline-block;
   vertical-align: center
 }
.general-item-context{
  display: inline-block;
  margin-left: 20px;
}

.general-item-context-point{
  font-size: 22px;
  text-shadow: 1px 1px 0 rgb(0 0 0 / 15%);
}
=======
<template>
  <div class="general-item">
    <div class="general-item-icon">
      <slot name="icon">
        <el-button icon="el-icon-wind-power"
                   style="width: 45px;height: 45px"
                   circle
                   :style="{'backgroundColor':color}"/>
      </slot>
    </div>

    <div class="general-item-context">
      <div class="general-item-context-point" :style="{'color':color}">{{point}}</div>
      <div style="font-size: 13px;">{{ detail }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TakeCourseGeneralItem",
  props:{
    color:{
      type: String,
      default: '#99c1e3'
    },
    point:{
      type: Number,
      default: 0.0
    },
    detail:{
      type: String,
      default: 'detail'
    }
  }
}
</script>

<style scoped>
.general-item{
  display:flex;
  align-items:center;
  height: 65px;
  width: 210px;
  border: 0.5px #D8D8D8 dashed;
  padding-left: 7px;
}
.general-item-icon{
   display: inline-block;
   vertical-align: center
 }
.general-item-context{
  display: inline-block;
  margin-left: 20px;
}

.general-item-context-point{
  font-size: 22px;
  text-shadow: 1px 1px 0 rgb(0 0 0 / 15%);
}
>>>>>>> origin/master
</style>