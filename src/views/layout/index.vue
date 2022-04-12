<template>
  <div>
    <el-container>

      <!-- v-show="curIdx == 0 ||curIdx ==undefined ? fasle:true" -->
      <el-aside class="sideBar" width="308px">
        <div class="logo">
            <img src="@/assets/home/_编组__2.png" alt="">
            <span >智慧操场管理平台</span>
        </div>
        <el-menu
          ref="menu1"
          router
           :default-active="$route.path"
          background-color="#0d6cde"
          text-color="#fff"
          active-text-color="#fff"
          class="el-menu-demo"
          unique-opened
        >
          <el-menu-item index="/home" v-show="curIdx == 0">
            <i class="iconfont icon-home"></i>
             首页 </el-menu-item>
          <el-submenu index="1"  v-show="curIdx == 1">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
              <span slot="title">系统管理</span>
            </template>
            <el-submenu index="1-1">
              <span slot="title">平台授权</span>
              <el-menu-item index="organizationManage">组织管理</el-menu-item>
              <el-menu-item index="roleManage">角色管理</el-menu-item>
              <el-menu-item index="accountMangae">账号管理</el-menu-item>
              <el-menu-item index="menuManage">菜单授权</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <span slot="title">用户管理</span>
              <el-menu-item index="studentManage">学生管理</el-menu-item>
              <el-menu-item index="teacherManage">教师管理</el-menu-item>
              <el-menu-item index="visitorManage">访客管理</el-menu-item>
            </el-submenu>
            <el-submenu index="1-3">
              <span slot="title">基础维护</span>
              <el-menu-item index="1-3-1">等级管理</el-menu-item>
              <el-menu-item index="1-3-2">积分规则</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-submenu  index="2" v-show="curIdx == 2">
            <template slot="title">
              <!-- <i class="el-icon-location"></i> -->
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
              <!-- <i class="el-icon-location"></i> -->
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
              <!-- <i class="el-icon-location"></i> -->
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
              <!-- <i class="el-icon-location"></i> -->
              <span slot="title">积分商城</span>
            </template>
            <el-menu-item index="555">商城维护</el-menu-item>
            <el-menu-item index="666">兑换记录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header height="117px" class="topBar">
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
      activeMenu:this.$router.path
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
    background-color: #0d6cde;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 51px;
    img{
      margin-top: 16px;
      margin-bottom: 5px;
      width: 60px;
    }
    span{ 

          color: #81E5FC;
          font-size: 25px;
    }
}
.topBar {

  margin-left: -19px;
  display: flex;
  align-items: center;
  min-width: 1550px;
  padding-top: 30px;
  z-index: 1;
  box-shadow: 0 2px 2px rgba(0,0,0,0.2);
  .menu {
      min-width: 1100px;
    flex: 1;
    display: flex;
    padding: 0;
    align-items: center;
    list-style: none;
    font-size: 25px;
    li {
      height:86px;
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
      width: 30px;
      padding-right: 10px;
    }
    li:hover {
      cursor: pointer;
    }
    li::after {
      content: "";
      width: 1px;
      height: 30px;
      position: absolute;
      right: -3px;
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
    font-size: 24Px;
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
    font-size: 24px;
    color: #ccc;
  }
  .userInfo::v-deep .el-button:hover {
    color: #0d6cde;
  }
}
.sideBar {
  background-color: #0d6cde;
  z-index:2;
  position: relative;
  &::before{
     z-index: 99;
    content: "";
    right: 0;
    top: 157px;
    border-top: 15px solid transparent;
    border-right: 15px solid #fff;
    border-bottom: 15px solid transparent;
    border-left: 15px  solid transparent;
    position: absolute;
  }
   &::v-deep .el-menu{
   
     border:0
  }
  &::v-deep .el-submenu__title{
    font-size: 20px;
  }
  &::v-deep .el-submenu .el-menu-item:nth-of-type(1){
      border-top: 2px solid #799FCF;
  }

  .el-menu-item{
    font-size: 20px;
    text-align: center;
    border-bottom: 2px solid #799FCF;
 
  }
    .is-active{
      position: relative;
    }
  .is-active::before{
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: white;
    position: absolute;
    top: 50%;
    left: 88px;
  }
  .el-menu-demo>.el-menu-item:nth-of-type(1){
       border-bottom: none;
    }
  .el-menu-item i {
    color: #fff;
    font-size: 20px;


    padding-right: 20px;
}
 
    &::v-deep .el-submenu__title i {
      color: #fff;
      font-size: 20px;
    
}
    &::v-deep .el-submenu__icon-arrow{
         right:50px;
       }


}
.appMain {
  background-color: #f1f2f6;
    min-width: 1600px;
  // min-width: calc(100vw - 308px);
  min-height: calc(100vh - 117px);
}

</style>
