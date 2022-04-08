<template>
  <div>
    <el-container>
      <!-- v-show="curIdx == 0 ||curIdx ==undefined ? fasle:true" -->
      <el-aside class="sideBar" width="200px">
        <div class="logo">
            <img src="@/assets/home/_编组__2.png" alt="">
            <span>智慧操场管理平台</span>
        </div>
        <el-menu
          ref="menu1"
          router
          background-color="#0d6cde"
          text-color="#fff"
          active-text-color=""
          class="el-menu-demo"
          unique-opened
        >
          <el-menu-item index="home" v-show="curIdx == 0"> 首页 </el-menu-item>
          <el-submenu index="1"  v-show="curIdx == 1">
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
          <el-submenu  index="2" v-show="curIdx == 2">
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
          <el-submenu index="3"  v-show="curIdx == 3">
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
          <el-submenu index="4" v-show="curIdx == 4">
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
          <el-submenu index="5"  v-show="curIdx == 5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">积分商城</span>
            </template>
            <el-menu-item index="555">商城维护</el-menu-item>
            <el-menu-item index="666">兑换记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header height="90px" class="topBar">
          <ul class="menu">
            <li   @click="clickMenu(0)">
              <img src="@/assets/home/_编组__7.png" alt="" />
              首页
            </li>
              <li   @click="clickMenu(1)">
              <img src="@/assets/home/图层 13.png" alt="" />系统管理
            </li>
               <li   @click="clickMenu(2)">
              <img src="@/assets/home/_编组__3.png" alt="" />校园天地
            </li>
               <li  @click="clickMenu(3)">
              <img src="@/assets/home/_编组__4.png" alt="" />跑步计时
            </li>
            <li  @click="clickMenu(4)">
              <img src="@/assets/home/_编组__5.png" alt="" />数据统计
            </li>
            <li class="last_li"   @click="clickMenu(5)">
              <img src="@/assets/home/_编组__6.png" alt="" />积分商城
            </li>
          </ul>
         <div class="userInfo">
            <div class="item">
              <i class="el-icon-user"> </i
              ><span>{{ $store.state.user.userInfo.name }}</span>
            </div>

            <div class="logout" @click="logout">
              <el-button type="text" icon="el-icon-switch-button">
                退出</el-button
              >
            </div>
          </div>
        </el-header>
        <el-main class="appMain"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curIdx: 0,
    };
  },
  methods: {
    clickMenu(index) {
      this.curIdx = index;
      if(this.curIdx == 0){
        this.$router.push("/home");
      }
    },
    async logout() {
      try {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.logo{
    height: 90px;
    background-color: #0d6cde;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 60px;
    }
    span{
          color: #81E5FC
    }
}
.topBar {
  display: flex;
  align-items: center;
  min-width: 1300px;
  padding-top: 30px;
  margin-left: -17px;
  .menu {
    flex: 1;
    display: flex;
    padding: 0;
    align-items: center;
    list-style: none;

    li {
      height:60px;
      display: flex;
      align-items: center;
      padding-right: 30px;
      padding-left: 30px;
      position: relative;
      color: #156cdd;
    }
     li:hover{
       background-color: #e3eaf1;
     }
    img {
      width: 22px;
      padding-right: 10px;
    }
    li:hover {
      cursor: pointer;
    }
    li::after {
      content: "|";
      position: absolute;
      right: -5px;
      color: #ccc;
    }
    .last_li::after {
      content: "";
    }
  }

  .userInfo {
    display: flex;
    align-items: center;
    padding-bottom: 68px;
    color: #ccc;
    font-size: 16px;
    position: relative;
   
  }
  .item i {
    padding-right: 16px;
  }
  .item::after {
    content: "|";
    padding: 0 20px;
  }

  .userInfo::v-deep .el-button {
    color: #ccc;
  }
  .userInfo::v-deep .el-button:hover {
    color: #0d6cde;
  }
}
.sideBar {
  background-color: #0d6cde;
   &::v-deep .el-menu{
     border:0
  }
}
.appMain {
  background-color: #f1f2f6;
  // min-width: 1200px;
  min-height: calc(100vh - 90px);
}
</style>
