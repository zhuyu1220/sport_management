<template>
  <div id="app" class="app">
  
    <div class="topNav"> 
       顶部导航栏
    </div>
    <div class="Container">
     <div class="leftNav">
          左侧菜单栏
    </div>
     <div class="main">
        <router-view/>
    </div>
    </div>

  </div>
</template>
<script>


  import axios from 'axios'
   export default {
     data(){
       return{

       }
     },
     methods:{
    
     },
     mounted(){
    
     },
     created(){
        let res = axios({url:'/login',method:'post',data:{}}).then((res)=>{
          console.log(res,222);
          
        })
         console.log(res ,123);
         
     }
   }
</script>

<style scoped>

#app {
  background-color: #f1f2f6;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.topNav{
  position: fixed;
  width: 100%;
  background-color: #1e90ff;
  height: 50px;
}
.Container{
  display: flex;
  
}
.leftNav{
  position: fixed;
  top: 50px;
  width: 100px;
  height: calc(100vh - 50px);
  background-color: #1e90ff;
}
.main{
  flex: 1;
  margin-top: 50px;
  margin-left: 100px;
  height: 2000px;
 
}
</style>
