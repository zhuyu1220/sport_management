
<template>
  <div class="container">
       <div class="tip">
         <div>
              <div class="date">
                <img src="@assets/home/图层 7@2x.png" alt="">
                <div class="address">
                    <span>星期一</span> <br>
                    <span>2022/2/22 南京</span>
                </div>
              </div>
              <div class="weather">
                  <img src="@assets/home/图层 5@2x.png"  alt="">
                  <div>
                    <span>22℃</span><br>
                   <span>多云</span>
                  </div>
              </div>
         </div>
       </div>
        <div class="system">
            <div class="item" @click="jumpSystem('/trackSystem')">
                <span class="title">校园智道运动系统</span>
                <span class="moreInfo">查看更多设备信息</span>
            </div>
            <div class="item" @click="jumpSystem('/timingSystem')">
                  <span class="title">校园赛事计时系统</span>
                <span class="moreInfo">查看更多设备信息</span>
            </div>
            <div class="item" @click="jumpSystem('/aiTestSystem')">
                  <span class="title">校园AI体测系统</span>
                <span class="moreInfo">查看更多设备信息</span>
            </div>
        </div>
   </div>
</template>

<script>
export default {
  data(){
    return{
   
    }
  },
  methods:{
     jumpSystem(path){
       this.$router.push(path)
     }
  },
  computed:{
  
  },
  watch:{
   
  },
   mounted(){
    this.$store.dispatch('getUserInfo')
  
   }
}
</script>

<style scoped lang="scss">
   .container{
      width: 1528px;
  
      min-height: 100vh;
      margin: 0 auto ;
   }
   .tip{
    position: relative;
     height: 300px;
     display: flex;
   //   align-items: center;
     background: url("~@/assets/home/图层 15@2x.png")no-repeat;
     background-size: cover;
      &>div{
         position: absolute;
         right: 5%;
      }
      .date ,.weather {
         margin-top: 40px;
         display: flex;
         align-items: center;
         font-size: 26px;
        
      }
      .date  span:nth-of-type(2){
         font-size: 12px;
      }
      img{
        width: 50px;
        padding-right: 20px;
      }
   }
   .system{
      width: 1528px;
      display: flex;
       .item{
         color: red;
         position: relative;
         justify-content: space-between;
         display: flex;
         width:506px ;
         height: 569px;
         flex-direction: column;
         align-items: center;
         padding: 5% 0;
         font-size: 22px;
         font-weight: bold;
         border-radius: 8%;
      }
        .item:hover{
           cursor: pointer;
        }
      
       .item:nth-of-type(1){
     
          color: #6E83FA;
          background: url("~@/assets/home/图层 9.png") no-repeat center  center ;
          background-size: cover;
          margin-right: 2%;
       }
      .item:nth-of-type(2){
       
          color: #FCC198;
          background: url("~@/assets/home/图层 19.png") no-repeat center center;
          background-size: cover;
          margin-right: 2%;
      }
      .item:nth-of-type(3){
          color: #FAD174;
          background: url("~@/assets/home/图层 28.png") no-repeat center center;
          background-size: cover;  
      }
   }
</style>