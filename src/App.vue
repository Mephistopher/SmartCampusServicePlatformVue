<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {loginValidateNetwork} from "@/network/user";

export default {
  name: "app",
  created() {
      loginValidateNetwork().then(res=>{
        if(res.success){
          this.$store.commit('setLoginUser', res.data)
          this.$router.push('/home')
        }else {
          this.$router.push('/')
        }
      })

    // this.$router.push('/')
  }
}
</script>

<style scoped>

</style>
