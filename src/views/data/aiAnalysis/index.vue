<template>
  <div class="wrapper">
           <!-- <div class="panel">
                <p>本周人均每日运动里程</p>
                <org-info size='mini' width='100px' ref="orgInfo" @handlerChange="selectOrg"></org-info>
                <p class="value"> {{mile}} <span>km</span></p>
           </div> -->
           <div class="row">
           <panel :chart="1.22" >
              <template v-slot:header>
                  人均项目值
              </template>
               <template v-slot:unit>
                 
              </template>
           </panel>
     
           </div>
       
          
         
  </div>
</template>

<script>

import {  getChartVal } from "@/api/index.js";

import Panel from './Panel.vue';
export default {
  components: {

    Panel

  },
  data() {
    return {
    
    
    };
  },
  methods: {
    }
};
</script>

<style lang="scss" scoped>
  .row{
     display: flex;
     justify-content: center;
  }

</style>
>
