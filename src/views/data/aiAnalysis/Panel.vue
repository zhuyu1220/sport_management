<template>
           <div class="panel">
                <p><slot name="header"></slot></p>
                <el-select v-model="project" placeholder="请选择项目">
                  <el-option
                    v-for="item in projectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <org-info size='mini' width='100px' ref="orgInfo" @handlerChange="selectOrg"></org-info>
                <p class="value"> {{mile}} <span> <slot name="unit"></slot></span></p>
           </div>
</template>

<script>
import OrgInfo from "@/components/OrgInfo";
import {  getChartVal } from "@/api/index.js";

export default {
  components: {
    OrgInfo,
  },
  props:['chart'],
  data() {
    return {
     projectList:[],
     project:'',
      mile:"0",
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
   async queryChart(param){
        const res = await getChartVal(param)  
        return res.data.data;
    }
  },
  mounted() {
   
  },
};
</script>

<style lang="scss" scoped>
.panel{

  margin: 20px;
  background: #fff;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 0 3px 0px rgb(167 171 183);
  .value{
    margin: 0;
    font-size: 80px;
     line-height: 80px;
    text-align: center;
    color:#E6A23C ;
    font-weight: bold;
    span{
      font-size: 20px;
  
    }
  }
}
</style>
>
