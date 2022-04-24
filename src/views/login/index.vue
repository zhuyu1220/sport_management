<template>
  <div class="login">
    <div class="background"></div>
    <div class="user_login">
      <div class="logo">
        <img src="@/assets/LOGO.png" alt="logo" />
        <span>用户登录</span>
      </div>

      <div class="userform">
        <el-form
          :model="loginForm"
          status-icon
      
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="pass">
            <el-input
              type="text"
              placeholder="输入用户名"
              v-model="loginForm.username"
              autocomplete="off"
            ><i slot='prefix'> <img src="@/assets/yonghu.png"></i></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass">
            <el-input
              placeholder="输入密码"
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ><i slot='prefix'> <img src="@/assets/mima.png"></i></el-input>
          </el-form-item>
           <!-- <el-form-item label="" prop="checkPass">
            <el-input
               placeholder="输入验证码"
              type="text"
              v-model="loginForm.password"
              autocomplete="off"
            >
               <i slot='prefix'> <img src="@/assets/yanzheng.png"></i>
            </el-input>
          </el-form-item> -->
          
          <el-form-item>
                <el-button type="primary"  @click="login">进入系统</el-button>
          </el-form-item>
          
        </el-form>
      </div>
   
    </div>
  </div>
</template>

<script>
 import { login } from '@/api'
export default {
  data() {
    return {
      loginForm: {
        username: "123456",
        password: "123456",
        tenant:"2",
      },
    };
  },
  methods: {
    async login() {
      try {
          this.$store.dispatch("user/userLogin", this.loginForm).then((data)=>{
           this.$router.push("/home").catch(error=>{
                  console.log(error,1111);     
               });
          })
      } catch (error) {
        console.log(error);
        this.$message.error(error)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  height: 100vh;
  min-width: 1200px;
  .background {
    flex: 5.6;
    background: url("~@/assets/图层 14@2x.png") no-repeat center center;
    background-size: cover;
  }
  .user_login {
    flex: 4.4;
    .logo {
      margin-top: 60px;
      display: flex;
      flex-direction: column;
      align-items: center;
      font-weight: 500;
      font-size: 28px;
      color: #0088f4;
      img {
        width: 100px;
        margin-bottom: 40px;
      }
    }
    .userform{
        margin-top: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
   .userform::v-deep .el-input__inner{
         width: 512px;
     margin-bottom: 20px;
     margin-left: 0;   
     padding-left: 45px;
     border: none;
     border-radius: 0;
     border-bottom: 1px solid #CCCCCC;

     font-size: 22px;

   }

  }
 
}
.userform::v-deep .el-form {
  display: flex;
    align-items: center;
    flex-direction: column;
}
 .userform::v-deep .el-button{
   display: inline-flex;
   align-items: center;
   justify-content: center;
   width: 324px;
   height: 36px;
   border-radius: 2px;
   font-size: 18px;
   
 }
</style>
>
