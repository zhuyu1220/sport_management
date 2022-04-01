<template>
  <div>
    <el-container>
      <el-header class="topBar">
        <div class="logo">logo</div>
        <el-menu
          background-color=""
          default-active="home"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="home"   data-path="0"  @click="clickMenu()">
            <i class="el-icon-s-home"></i>首页
          </el-menu-item>
          <el-menu-item index="2" data-path="1"  @click="clickMenu()">系统管理</el-menu-item>
          <el-menu-item index="3"  data-path="2"  @click="clickMenu()">校园天地</el-menu-item>
          <el-menu-item index="4" data-path="3"  @click="clickMenu() ">跑步计时</el-menu-item>
          <el-menu-item index="5" data-path="4" @click="clickMenu()">数据统计</el-menu-item>
          <el-menu-item index="6" data-path="5" @click="clickMenu()">积分商城</el-menu-item>
        </el-menu>
        <div class="userInfo">张老三</div>
      </el-header>
      <el-container>
        <el-aside class="sideBar" width="200px">
          <el-menu
            ref="menu1"
            router
            background-color=""
            :default-active="home"
            class="el-menu-demo"
            unique-opened
          >
            <el-menu-item index="home" > 首页 </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">系统管理</span>
              </template>
              <el-submenu index="1-1">
                <span slot="title">平台授权</span>
                <el-menu-item index="1-1-1">组织管理</el-menu-item>
                <el-menu-item index="1-1-2">角色管理</el-menu-item>
                <el-menu-item index="1-1-3">账号管理</el-menu-item>
                <el-menu-item index="1-1-3">菜单授权</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">用户管理</span>
                <el-menu-item index="1-2-1">学生管理</el-menu-item>
                <el-menu-item index="1-2-2">教师管理</el-menu-item>
                <el-menu-item index="1-2-3">访客管理</el-menu-item>
              </el-submenu>
              <el-submenu index="1-3">
                <span slot="title">基础维护</span>
                <el-menu-item index="1-3-1">等级管理</el-menu-item>
                <el-menu-item index="1-3-2">积分规则</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">校园天地</span>
              </template>
              <el-submenu index="1-1">
                <span slot="title">校园天地</span>
                <el-menu-item index="1-1-1">信息发布</el-menu-item>
                <el-menu-item index="1-1-2">信息审核</el-menu-item>
              </el-submenu>
              <el-submenu index="1-2">
                <span slot="title">大屏公告</span>
                <el-menu-item index="1-2-1">公告发布</el-menu-item>
                <el-menu-item index="1-2-2">公告审核</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">跑道计时</span>
              </template>
              <el-menu-item index="3-3">手环登记</el-menu-item>
              <el-menu-item index="3-3">发令账号</el-menu-item>
              <el-menu-item index="3-3">跑步项目</el-menu-item>
              <el-menu-item index="3-3">日常跑步训练</el-menu-item>
              <el-menu-item index="3-3">赛事发布</el-menu-item>
              <el-menu-item index="3-3">赛事审核</el-menu-item>
              <el-menu-item index="3-3">赛事报名</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">数据统计</span>
              </template>
              <el-menu-item index="4">校园智道统计</el-menu-item>
              <el-menu-item index="4">校园智道分析</el-menu-item>
              <el-menu-item index="4">AI体侧统计</el-menu-item>
              <el-menu-item index="4">AI体侧分析</el-menu-item>
              <el-menu-item index="4">跑步计时统计</el-menu-item>
              <el-menu-item index="4">跑步计时报告</el-menu-item>
              <el-menu-item index="4">出勤统计</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">积分商城</span>
              </template>
              <el-menu-item index="555">商城维护</el-menu-item>
              <el-menu-item index="666">兑换记录</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main class="appMain"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
 data(){
        return{
 
        }
  },
  methods: {

    clickMenu(){
        let curIdx  = event.target.dataset.path 
       console.dir(curIdx);
       if(curIdx!='0'){
          this.$refs.menu1.open(curIdx)
       }
       if(curIdx=='0'){
           this.$router.push('/home')
            for(let i= 1;i<6;i++){
                   this.$refs.menu1.close(i+'')
            }  
       }
    }
  },
};
</script>

<style lang="scss" scoped>
.topBar {
  display: flex;
  align-items: center;

  min-width: 1000px;
 
  .el-menu-demo {
      flex: 1;
        display: flex; 
        justify-content: center;

  }
}
.sideBar {
  background-color: #ffffff;
}
.appMain {
  background-color: #f1f2f6;
  min-width:1200px;
  min-height: calc(100vh - 60px);
}
</style>
