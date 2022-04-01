import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home.vue'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/home",
    component: () => import('@/views/layout/index.vue'),
    children: [{
      path: "home",
      name:"Home",
      component: () => import('@/views/Home.vue'),
    }]
  },
  {
    path: "/login",
    name: "Login",
    component:()=>import('@/views/Login.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
