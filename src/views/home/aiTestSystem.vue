<template>
  <div>
    <!-- 设备详情begin -->
     <div>
         <h2>设备详情</h2>
      <el-table
        :data="equStatus"
        style="width: 100%">
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
    <div>
        <h2>个人活跃top5</h2>
         <el-table
        :data="personActiveTop5Format"
        style="width: 100%">
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

    </div>
    <!--个人活跃top5 end -->
    <!-- 大屏七日使用人次折线图begin -->
    <div style="width:300px;height:400px" ref="bigScreenUsedtimesChart">
            
    </div>
      <!-- 大屏七日使用人次折线图end -->
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
        const res = await  getEquStatus({val:'3'})
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
        title: {
           text: "大屏使用日人次(近七日)",
           textStyle: {
           fontsize: "22px",
           fontWeight: "normal",
          },
          top: 10,
        },
        tooltip: {},
        xAxis: {
          data: [1,2,3,4],
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

<style>

</style>