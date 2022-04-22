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
    <!--赛事成绩前十 begin -->
    <div>
        <h2>赛事成绩前十</h2>
        <div> 
          <el-select v-model="curItem" placeholder="请选择项目">
              <el-option v-for="(item,index) in matchItems" :key="index" :label="item.name" :value="item.val">
                  {{item.name}}
              </el-option>
          </el-select>
        </div>
         <el-table
        :data="mattchTop10"
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
          label="成绩"
          width="width"/>
             
      </el-table>

    </div>
    <!--赛事成绩前十 end -->
    <!-- 大屏七日使用人次折线图begin -->
    <div style="width:300px;height:400px" ref="bigScreenUsedtimesChart">
            
    </div>
      <!-- 大屏七日使用人次折线图end -->
  </div>
</template>

<script>
import {getRaceProject,getEquStatus,getTableVal,getChartVal} from '@/api/index.js'
export default {
  data(){
    return{
      curItem:'',
      equStatus:[],
      matchItems:[],
      mattchTop10:[],
      bigScreenUsedyimes:[]
      
    }
  },
  computed:{
    /*
      [["排名","姓名","班级","活跃时长"],["1","张三","六(1)","1h"]]
      [{rank:"1",name:'zhangsan',class:'一年级一班',activeTime:'1h'},]
    
    */
  
  },
  methods:{
    async reqGetEquStatus(){
        const res = await  getEquStatus({val:'2'})
        if(res.data.code == 100){
          this.equStatus = res.data.data
        }
    },
   // 查询校园赛事计时系统_项目清单  
    async reqGetRaceProject(){
        const res = await  getRaceProject({"val":"1.20"})
        console.log(res.data,123456);
        
        if(res.data.code == 100){
          this.matchItems = res.data.data
        }
    },
    // 查询校园赛事计时系统_成绩TOP10
    async reqGetTableVal(){
        const res = await  getTableVal({"val":"2.11","code":""})
        if(res.data.code == 100){
          this.mattchTop10 = res.data.data
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
    // this.reqGetChartVal(),
    // this.drawBigScreenUsedtimesChart()
    this.reqGetRaceProject()
  }

}
</script>

<style>

</style>