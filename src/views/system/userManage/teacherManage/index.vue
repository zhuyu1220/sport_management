<template>
  <div>
      <org-info @handlerChange="assignOrgCode"></org-info>
  </div>
</template>

<script>
import OrgInfo from '@/components/OrgInfo'
export default {
   components:{
      OrgInfo
   },
   data(){
      return{
         
         form:{
            schooleCode:'',
            gradeCode:'',
            classCode:''
         }
      }
   },
   methods:{
      assignOrgCode(event){
        if(event.lev ==1){
            this.form.schooleCode = event.code
        }else if(event.lev ==2){
            this.form.gradeCode = event.code
        }else if(event.lev ==3){
            this.form.classCode = event.code
        }
      }
   }
}
</script>

<style>

</style>