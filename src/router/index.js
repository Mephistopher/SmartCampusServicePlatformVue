import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeBody from "@/views/Home/HomeBody";
import LoginIndex from "@/views/Login/LoginIndex";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeBody
  },
  {
    path: '/login',
    name: 'login',
    component: LoginIndex
  },
]

const router = new VueRouter({
  routes
})

export default router
