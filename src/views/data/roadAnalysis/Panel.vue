<template>
  <div class="wrapper">
           <div class="panel">
             <div class="header" style="">
                 <p><slot name="header"></slot></p>
                <org-info size='mini' width='100px' ref="orgInfo" @handlerChange="selectOrg"></org-info>
             </div>
              
                <div class="echart"  ref="chart"  style="width:400px;height:300px"> 
                </div>
           </div>
         
  </div>
</template>

<script>
import OrgInfo from "@/components/OrgInfo";
import {  getChartVal } from "@/api/index.js";

export default {
  components: {
    OrgInfo,
  },
  props:['chart','echartName'],
  data() {
    return {
      loading: false,
      mile:['300','50 ','60 ','100','200'],
      mileParam:{
         val:this.chart,
         gradeCode:"",
         classCode:""
      }, 
    };
  },
  methods: {
    // 选择年级或者班级查询
    selectOrg(item) {
      if (item.lev == 2) {
        this.mileParam.gradeCode = item.id === undefined ? "" : item.id;
        this.mileParam.classCode = "";
        this.queryChart(this.mileParam)
      } else {
        this.mileParam.classCode = item.id === undefined ? "" : item.id;
         this.queryChart(this.mileParam)
      }
    },
    //
    initMileEchart(){
      const Chart = this.$echarts.init(this.$refs.chart);
        let options = {
        tooltip: {},
        xAxis: {
          data: ['星期一','星期二','星期三','星期四','星期五'],
        },
        yAxis: {},
        series: [
          {
            label:{
              show:true,
            },
            type: "bar",
            name:'',
            data: this.mile,
          }
        ],
      };
      Chart.setOption(options);
    },
    initDuraction(){
        const Chart = this.$echarts.init(this.$refs.chart);
        let options = {
        tooltip: {},
        xAxis: {
          data: ['星期一','星期二','星期三','星期四','星期五'],
        },
        yAxis: {},
        series: [
          {
            label:{
              show:true,
            },
            type: "line",
            name:'大屏一',
            data: this.mile,
          },{
            label:{
              show:true,
            },
            type: "line",
            name:'大屏二',
            data: ['1','2','3','4','100'],
          }
        ],
      };
      Chart.setOption(options);
    },
    initDhr(){
       const Chart = this.$echarts.init(this.$refs.chart);
        let options = {
        tooltip: {},
     
        series: [
          {
         
            type: "pie",
        
            data: ['50','50'],
          }
        ],
      };
      Chart.setOption(options);
    },
   async queryChart(param){
        const res = await getChartVal(param)  
        return res.data.data;
    }
  },
  mounted() {
    console.log(this.echartName,1111111124445);
    
      if(this.echartName == 'initMileEchart'){
        this.initMileEchart()
      }else if(this.echartName == 'initDuraction'){
           this.initDuraction()
      }else if(this.echartName =='initDhr'){
           this.initDhr()
      }
      
  },
};
</script>

<style lang="scss" scoped>
.panel{
 
  min-width: 500px;
  margin: 20px;
  background: #fff;
  width: 30%;
  height: 300px;
  border-radius: 5px;
  padding: 10px;
  .header{
    display: flex;
   
    align-items: center;
    justify-content: space-between;
  }
  .echart{
     margin: 0 auto;
  }
}
</style>
>
