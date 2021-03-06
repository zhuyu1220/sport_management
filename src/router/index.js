import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
// import Home from '@/views/Home.vue'
// import Login from '@/views/Login'
Vue.use(VueRouter);

export const constantRouterMap = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden:true
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
        hidden:true
      },
      {
        path: "timingSystem",
        name: "timingSystem",
        component: () => import("@/views/home/timingSystem"),
        hidden:true
      },
      {
        path: "aiTestSystem",
        name: "aiTestSystem",
        component: () => import("@/views/home/aiTestSystem"),
        hidden:true
      },
    
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
];
// 异步路由 根据后端返回的菜单 过滤出符合条件的路由  注意始终做的是菜单的权限而非是路由的权限
// 菜单直接返回给我了   动态路由我自己再根据菜单筛一下

export const asyncRouterMap = [
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
        path: "/system/userManage/vistiorManage",
        name: "visitorManage",
        component: () => import("@/views/system/userManage/visitorManage"),
        meta: {title:"访客添加"}
      },
      {
        path: "/system/userManage/visitorCheck",
        name: "visitorCheck",
        component: () => import("@/views/system/userManage/visitorCheck"),
        meta: {title:"访客审核"}
      },
      {
        path: "/system/baseMantain/gradeManage",
        name: "gradeManage",
        component: () => import("@/views/system/baseMantain/gradeManage"),
        meta: {title:"等级管理"}
      },
      {
        path:  "/system/pointRule/pointRule",
        name: "pointRule",
        component: () => import("@/views/system/baseMantain/pointRule"),
        meta: {title:"积分维护"}
      },
      // 系统管理结束
      // 校园天地开始
      {
        path: "/school/campus/publish",
        name: "campusPublish",
        component: () => import("@/views/school/campus/publish"),
        meta: {title:"校园信息发布"}
      },
      {
        path: "/school/campus/check",
        name: "campusCheck",
        component: () => import("@/views/school/campus/check"),
        meta: {title:"校园信息审核"}
      },
      {
        path: "/school/largeScreen/publish",
        name: "largeScreenPublish",
        component: () => import("@/views/school/largeScreen/publish"),
        meta: {title:"大屏信息发布"}
      },
      {
        path:  "/school/largeScreen/check",
        name: "largeScreenCheck",
        component: () => import("@/views/school/largeScreen/check"),
        meta: {title:"大屏信息审核"}
      },
      // 校园天地结束
      // 跑步计时开始
      {
        path:  "/race/wristband",
        name: "wristband",
        component: () => import("@/views/race/wristband"),
        meta: {title:"手环登记"}
      },
      {
        path:  "/race/order",
        name: "order",
        component: () => import("@/views/race/order"),
        meta: {title:"发令账号"}
      },
      {
        path:  "/race/project",
        name: "raceProject",
        component: () => import("@/views/race/project"),
        meta: {title:"跑步项目"}
      },
      {
        path:  "/race/project",
        name: "raceProject",
        component: () => import("@/views/race/project"),
        meta: { title: "跑步项目" },
        hidden:true
      },
      {
        path:  "/race/dailyRun",
        name: "dailyRun",
        component: () => import("@/views/race/dailyRun"),
        meta: {title:"日常跑步训练"}
      },
      {
        path: '/race/projectDetail/:id',
        name: "",
        component: () => import("@/views/race/dailyRun/ProjectDetail"),
        meta: {title:"日常训练项目"}
      },
      {
        path: '/race/eventDetail/:id',
        name: "",
        component: () => import("@/views/race/gamePublish/ProjectDetail"),
        meta: {title:"赛事项目"}
      },
      {
        path:  "/race/gamePublish",
        name: "gamePublish",
        component: () => import("@/views/race/gamePublish"),
        meta: {title:"赛事发布"}
      },
      {
        path:  "/race/gameCheck",
        name: "gameCheck",
        component: () => import("@/views/race/gameCheck"),
        meta: {title:"赛事审核"}
      },
      {
        path:  "/race/gameEnroll",
        name: "gameEnroll",
        component: () => import("@/views/race/gameEnroll"),
        meta: {title:"赛事报名"}
      },
      {
        path:  "/race/gameEnroll",
        name: "gameEnroll",
        component: () => import("@/views/race/gameEnroll"),
        meta: {title:"项目报名"}
      },
      {
        path:  "/race/gameEnroll/participant/:id",
        name: "gameEnroll",
        component: () => import("@/views/race/gameEnroll/Participant"),
        meta: {title:"赛事报名"}
      },
      //跑步计时结束
      // 数据统计开始
      {
        path:"/data/roadCount",
        name:"wristband",
        component: () => import("@/views/data/roadCount"),
       } , {
        "path":"/data/roadAnalysis",
        "name":"order",
        component: () => import("@/views/data/roadAnalysis"),
       } , {
        "path":"/data/aiCount",
        "name": "aiCount",
         component: () => import("@/views/data/aiCount"),
       } , {
        "path":"/data/aiAnalysis",
        "name":"aiAnalysis",
        component: () => import("@/views/data/aiAnalysis"),
       } , {
         "path":"/data/runCount",
         "name":"runCount",
         component: () => import("@/views/data/runCount"),
       } , {
  
        "path":"/data/runReport",
        "name":"runReport",
        component: () => import("@/views/data/runReport"),
       } ,{
        "path":"/data/attendanceCount",
        "name":"attendanceCount",
        component: () => import("@/views/data/attendanceCount")
      },
      // 数据统计结束
      {path: '*', redirect: '/404', hidden: true}
    ]
  }
]

const router = new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes:[...constantRouterMap,...asyncRouterMap]
});


export default router;
