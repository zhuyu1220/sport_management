
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
      width: 1077px;
    
      margin: 0 auto ;
   }
   .tip{
    position: relative;
    height: 212px;
    display: flex;
    border-radius: 13px;
    box-shadow: 0 0 3px 3px rgb(0 0 0 / 3%);
    margin: 28px 0;
    background: url("~@/assets/home/weather.png")no-repeat;
    background-size: cover;
      &>div{
         position: absolute;
         right: 5%;
      }
      .date ,.weather {
         margin-top: 29px;
         display: flex;
         align-items: center;
         font-size: 20px;
        
      }
      .date  span:nth-of-type(2){
         font-size: 9px;
      }
      img{
        width: 36px;
        padding-right: 15px;
      }
   }
   .system{
    
      display: flex;
      justify-content: space-between;
       .item{
  
         color: red;
         position: relative;
         justify-content: space-between;
         display: flex;
         width:344px ;
         height: 360px;
         flex-direction: column;
         align-items: center;
         font-size: 16px;
         font-weight: bold;
         letter-spacing: 1.5px;
         margin-right: 2%;
         border-radius: 59px;
         border-radius: 16px;
         box-shadow: 0 0 3px 3px rgb(0 0 0 / 3%);

        transition: All 0.4s ease-out;
        .title{
           padding-top: 28px;
           letter-spacing: 5.5px;
        }
        .moreInfo{
           padding-bottom: 28px;
           letter-spacing: 5.5px;
        }
      }
        .item:hover,      .item:hover:focus{
           cursor: pointer;
          transform: scale(1.01);
     
           box-shadow: 0 0 3px 3px rgba(0 0 0 /0.1);
        }
       .item:nth-of-type(1){
          color: #6E83FA;
          background: url("~@/assets/home/ai.png")  no-repeat  center  center ;

          background-size: cover;
       }
      .item:nth-of-type(2){
          color: #FCC198;
             
          background: url("~@/assets/home/time.png")  no-repeat center center;
            background-size: cover;
      }
      .item:nth-of-type(3){
          color: #FAD174;
                   background-size: cover;
          background: url("~@/assets/home/run.png")  no-repeat center center;
            background-size: cover;
            margin-right: 0;

      }
   }
</style>