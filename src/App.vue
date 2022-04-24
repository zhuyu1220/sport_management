<template>
  <div id="app" class="app">
        <router-view/>
  </div>
</template>
<script>
import {test} from '@/api'
  console.log('111111',test);
   export default {
     data(){
       return{

       }
     },
     methods:{
    
     },
     mounted(){
 
       console.log('111111',test);
       
        test({id:1}).then((res)=>{
          console.log(res,4444);
          
        })
     },
     created(){

     }
   }
</script>

<style scoped>

</style>
