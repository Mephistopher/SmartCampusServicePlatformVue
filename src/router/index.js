import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeBody from "@/views/Home/HomeBody";
import LoginIndex from "@/views/Login/LoginIndex";
import ShowInfoView from "@/views/ShowInfoView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeBody
  },
  {
    path: '/',
    name: 'login',
    component: LoginIndex
  },
  {
    path: '/home/showinfo',
    name: 'showinfo',
    component: ShowInfoView
  },
]

const router = new VueRouter({
  routes
})

export default router
