<template>
  <div>
    <!-- 设备详情begin -->
     <div>
         <p>设备详情</p>
      <el-table
        :data="equStatus"
        style="width: 100%"
         :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
        >
          <el-table-column
          prop="no"
          label="设备序号"
          width="width"/>
        <el-table-column
          prop="equName"
          label="设备名称"
          width="width">
        </el-table-column>
         <el-table-column
          prop="status"
          label="状态"
          width="width">
        </el-table-column>
              <el-table-column
          prop="equDes"
          label="备注"
          width="width">
        </el-table-column>
      </el-table>

     </div>  
    <!-- 设备详情end -->
    <!--个人活跃top5 begin -->
    <div class="list">
     <el-table
        :data="personActiveTop5Format"
        class="topTable"
         :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
        >
        <el-table-column
          prop="rank"
          label="排名"
          width="width"/>
                <el-table-column
          prop="name"
          label="姓名"
          width="width"/>
                <el-table-column
          prop="class"
          label="班级"
          width="width"/>
            <el-table-column
          prop="activeTime"
          label="活跃时间"
          width="width"/>
             
     </el-table>
         <!-- 大屏七日使用人次折线图begin -->
         <el-card class="ls">
           <p>大屏七日使用人次</p>
           <div style="width:500px;height:500px" ref="bigScreenUsedtimesChart">
            
       </div>
         </el-card>
 
      <!-- 大屏七日使用人次折线图end -->
    </div>
    <!--个人活跃top5 end -->
 
  </div>
</template>

<script>
import {getEquStatus,getTableVal,getChartVal} from '@/api/index.js'
export default {
  data(){
    return{
      equStatus:[],
      personActiveTop5:[],
      bigScreenUsedyimes:[]
    }
  },
  computed:{
    /*
      [["排名","姓名","班级","活跃时长"],["1","张三","六(1)","1h"]]
      [{rank:"1",name:'zhangsan',class:'一年级一班',activeTime:'1h'},]
    
    */
    personActiveTop5Format(){
      // let initalData  = JSON.parse(JSON.stringify(this.personActiveTop5))
      // console.log(initalData,123);
      this.personActiveTop5.shift();
      let temp = []
      this.personActiveTop5.forEach((item)=>{
         temp.push({'rank':item[0],'name':item[1],'class':item[2],'activeTime':item[3]})
      })
    
       
      return temp
    }
  },
  methods:{
    async reqGetEquStatus(){
        const res = await  getEquStatus({val:'1'})
        if(res.data.code == 100){
          this.equStatus = res.data.data
        }
    },
    // 查看校园智道_个人活跃top5
     async reqGetTableVal(){
        const res = await  getTableVal({"val":"1.10"})
        if(res.data.code == 100){
          this.personActiveTop5 = res.data.data
        }
    },
    //  查看校园智道_大屏七日使用人次
    async reqGetChartVal(){
        const res = await  getChartVal({"val":"1.20"})
        if(res.data.code == 100){
          this.bigScreenUsedyimes = res.data.data
        }
    },
    drawBigScreenUsedtimesChart(){
        const Chart = this.$echarts.init(this.$refs.bigScreenUsedtimesChart);
        let options = {
      
        tooltip: {},
        xAxis: {
          data: ['星期一','星期二','星期三','星期四','星期五'],
        },
        yAxis: {},
        series: [
          {
            label:{
              // show:true,
            },
            type: "line",
            name:'大屏1',
            data: ['1','5 ','6 '],
          },
             {
            type: "line",
             name:'大屏2',
            data: ['2','5 ','8 '],
          },
        ],
      };
      Chart.setOption(options);
    } 
  },
  mounted(){
    this.reqGetEquStatus(),
    this.reqGetTableVal(),
    this.reqGetChartVal(),
    this.drawBigScreenUsedtimesChart()
  }

}
</script>

<style lang="scss" scoped>
    .list{
      margin-top: 20px;
      display: flex;
      .topTable{
        margin-right: 15px;
        flex: 1;
      }
      .ls{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
</style>>

