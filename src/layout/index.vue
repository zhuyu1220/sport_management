<template>
  <div>
    <el-container>

      <!-- v-show="curIdx == 0 ||curIdx ==undefined ? fasle:true" -->
      <el-aside class="sideBar" width="278px">
        <div class="logo">
            <img src="@/assets/home/logo1.png" alt="">
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
             <MyItem :data="sidebar"></MyItem>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header height="106px" class="topBar">
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
              ><span>{{ $store.state.user.userInfo.username }}</span>
            </div>

            <div class="logout"  >
              <el-button type="text" @click="logout" icon="el-icon-switch-button"> 
                退出 </el-button
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
import MyItem from "./MyItem.vue"; // 引入递归菜单组件
export default {
  data() {
    return {
      curIdx: 0,

    };
  },
   components: {
    MyItem, // 注册一下
  },
  computed:{
    sidebar() {
      return this.$store.state.permission.menu
    },
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

        this.$store.dispatch("user/logout").then(()=>{
             this.$router.push("/login").catch(err=>{console.log(err
           );
        });
      
        });
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
    margin-bottom: 46px;
    img{
      margin-top: 15px;
      margin-bottom: 5px;
      width: 54px;
    }
    span{ 

          color: #81E5FC;
          font-size: 23px;
    }
}
.topBar {
  display: flex;
  align-items: center;
  min-width: 1400px;
  padding-top: 27px;
  z-index: 1;
  box-shadow: 0 2px 2px rgba(0,0,0,0.2);
  .menu {
    
    flex: 1;
    display: flex;
    padding: 0;
    align-items: center;
    list-style: none;
    font-size: 23px;
    li {
      height:78px;
      display: flex;
      align-items: center;
      padding-right: 27px;
      padding-left: 27px;
      position: relative;
      color: #156cdd;
    }
     li:hover{
       background-color: #e3eaf1;
     }
    img {
      width: 27px;
      padding-right: 9px;
    }
    li:hover {
      cursor: pointer;
    }
    li::after {
      content: "";
      width: 2px;
      height: 27px;
      position: absolute;
      right: -1px;
      background: #ccc;
    }
    .last_li::after {
      content: "";
    }
  }

  .userInfo {
    display: flex;
    align-items: center;
 
    padding-bottom: 62px;
    color: #ccc;
    font-size: 24Px;
    position: relative;
   
  }
  .item i {
    padding-right: 15px;
  }
  .item::after {
    content: "|";
    padding: 0 18px;
  }

  .userInfo::v-deep .el-button {
    font-size: 22px;
    color: #ccc;
  }
  .userInfo::v-deep .el-button:hover {
    color: red;
  }
}
.sideBar {
  background-color: #0d6cde;
  z-index:2;
  position: relative;
  img{
    width: 72px;
  }
  &::before{
     z-index: 99;
    content: "";
    right: 0;
    top: 142px;
    border-top: 14px solid transparent;
    border-right: 14px solid #fff;
    border-bottom: 14px solid transparent;
    border-left: 14px  solid transparent;
    position: absolute;
  }
//    &::v-deep .el-menu{
   
//      border:0
//   }
//   &::v-deep .el-submenu__title{
//     font-size: 18px;
//   }
//   &::v-deep .el-submenu .el-menu-item:nth-of-type(1){
//       border-top: 2px solid #799FCF;
//   }

//   .el-menu-item{
//     font-size: 18px;
//     text-align: center;
//     border-bottom: 2px solid #799FCF;
 
//   }
//     .is-active{
//       position: relative;
//     }
//   .is-active::before{
//     content: "";
//     width: 8px;
//     height: 8px;
//     border-radius: 50%;
//     background: white;
//     position: absolute;
//     top: 50%;
//     left: 57px;
//   }
//   .el-menu-demo>.el-menu-item:nth-of-type(1){
//        border-bottom: none;
//     }
//   .el-menu-item i {
//     color: #fff;
//     font-size: 18px;


//     padding-right: 18px;
// }
 
//     &::v-deep .el-submenu__title i {
//       color: #fff;
//       font-size: 18px;
    
// }
//     &::v-deep .el-submenu__icon-arrow{
//          right:45px;
//        }


}
.appMain {
  background-color: #f1f2f6;
    min-width: 1400px;
  // min-width: calc(100vw - 278px);
  min-height: calc(100vh - 106px);
}

</style>
