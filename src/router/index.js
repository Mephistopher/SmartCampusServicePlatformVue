import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeBody from "@/views/Home/HomeBody";
import LoginIndex from "@/views/Login/LoginIndex";
import ShowInfoView from "@/views/ShowInfoView";
import NoticeAndNews from "@/views/NoticeAndNews";
import NoticeList from "@/components/notice/NoticeList";
import NewsList from "@/components/notice/NewsList";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeBody,
    children: [
      {
        path: '/showinfo',
        name: 'showinfo',
        component: ShowInfoView
      },
      {
        path: '/noticeandnews',
        name: 'noticeandnews',
        component: NoticeAndNews
      },
      {
        path:'/noticelist',
        name:'noticelist',
        component: NoticeList
      },
      {
        path:'/newslist',
        name:'newslist',
        component: NewsList
      },
    ]
  },
  {
    path: '/',
    name: 'login',
    component: LoginIndex
  },

]

const router = new VueRouter({
  routes
})

export default router
