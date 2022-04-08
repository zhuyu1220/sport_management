import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import Home from '@/views/Home.vue'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component:()=>import('@/views/login/index')
  },
  {
    path: '/',
    redirect:"/home",
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: "home",
      name:"Home",
      component: () => import('@/views/home/index'),
    }, {
        path: "trackSystem",
        name: "TrackSystem",
        component: () => import('@/views/home/trackSystem'),
        
    }, {
      path: "timingSystem",
      name: "TimingSystem",
      component: () => import('@/views/home/timingSystem'),
      
  }, {
    path: "aiTestSystem",
    name: "AiTestSystem",
    component: () => import('@/views/home/aiTestSystem'),
    
}]
  },


]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //  页面刷新或者跳转的时候,获取用户信息
  if (store.state.user.token) {
    store.dispatch('getUserInfo')

  } else { 
  }

  next()
   
})
export default router
