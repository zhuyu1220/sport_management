import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// import Home from '@/views/Home.vue'
// import Login from '@/views/Login'
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
  },
  {
      path: '*',
      redirect: '/404'
  },
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home"),
      },
      {
        path: "trackSystem",
        name: "trackSystem",
        component: () => import("@/views/home/trackSystem"),
      },
      {
        path: "timingSystem",
        name: "timingSystem",
        component: () => import("@/views/home/timingSystem"),
      },
      {
        path: "aiTestSystem",
        name: "aiTestSystem",
        component: () => import("@/views/home/aiTestSystem"),
      },

    ],
  },
  
];

const asyncRoutes = [
   {
    path: '/',
    component: () => import("@/layout/index.vue"),
    children: [
      // 系统管理开始
    {
      path: "/system/authorization/accountMangae",
      name: "accountMangae",
      component: () => import("@/views/system/authorization/accountMangae"),
      meta: {title:"账号管理"}
    },
    {
      path: "/system/authorization/menuManage",
      name: "menuManage",
      component: () => import("@/views/system/authorization/menuManage"),
      meta: {title:"菜单管理"}
    },
    {
      path: "/system/authorization/organizationManage",
      name: "organizationManage",
      component: () => import("@/views/system/authorization/organizationManage"),
      meta: {title:"组织管理"}
    },
    {
      path: "/system/authorization/roleManage",
      name: "roleManage",
      component: () => import("@/views/system/authorization/roleManage"),
      meta: {title:"角色管理"}
    },
      {
        path: "/system/userManage/studentManage",
        name: "studentManage",
        component: () => import("@/views/system/userManage/studentManage"),
        meta: {title:"学生管理"}
      },
      {
        path: "/system/userManage/teacherManage",
        name: "teacherManage",
        component: () => import("@/views/system/userManage/teacherManage"),
        meta: {title:"教师管理"}
      },
      {
        path: "/system/userManage/visitorManage",
        name: "visitorManage",
        component: () => import("@/views/system/userManage/visitorManage"),
        meta: {title:"访客管理"}
      },
      // 系统管理结束
      // 数据统计开始
      {
        "path":"/data/roadCount",
        "name":"wristband",
         component: () => import("@/views/data/roadCount"),
       } , {
        "path":"/data/roadAnalysis",
        "name":"order",
        component: () => import("@/views/data/roadAnalysis"),
       } , {
        "path":"/data/aiCount",
        "name": "",
         component: () => import("@/views/data/aiCount"),
       } , {
        "path":"/data/aiAnalysis",
        "name":"",
        component: () => import("@/views/data/aiAnalysis"),
       } , {
         "path":"/data/runCount",
         "name":"",
         component: () => import("@/views/data/runCount"),
       } , {
  
        "path":"/data/runReport",
        "name":"",
        component: () => import("@/views/data/runReport"),
       } ,{
        "path":"/data/attendanceCount",
        "name":"",
        component: () => import("@/views/data/attendanceCount")
      }
      // 数据统计结束
    ]
  }
]

const router = new VueRouter({
  routes:[...routes,...asyncRoutes]
});


export default router;
