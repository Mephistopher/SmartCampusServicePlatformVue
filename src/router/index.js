import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeBody from "@/views/Home/HomeBody";
import LoginIndex from "@/views/Login/LoginIndex";
import ShowInfoView from "@/views/ShowInfoView";
import NoticeAndNews from "@/views/NoticeAndNews";
import NoticeList from "@/components/notice/NoticeList";
import NewsList from "@/components/notice/NewsList";

const TakeCourse = () => import('@/views/CourseSituation/TakeCourse')
const UnpassCourse = () => import('@/views/CourseSituation/UnpassCourse')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginIndex
  },
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
      {
        path: '/takecourse',
        name: '已修读学分',
        component: TakeCourse
      },
      {
        path: '/unpasscourse',
        name: '不及格的课程',
        component: UnpassCourse
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
