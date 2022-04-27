
<template>
   <div>
       <el-form>
          <el-form-item label="">
             <el-select v-model="schoolItem" placeholder="学校" @change="handlerSelect({lev:1})">
                <el-option :label="item.name" :value="item"  v-for="(item,index) in schoolList" :key="index"  ></el-option>
            </el-select>
             <el-select v-model="gradeItem" placeholder="年级" @change="handlerSelect({lev:2}) " >
                <el-option :label="item.name" :value="item"  v-for="(item,index) in gradeList" :key="index"  ></el-option>
            </el-select>
            <el-select v-model="classItem" placeholder="班级"  @change="handlerSelect({lev:3})" >
                <el-option :label="item.name" :value="item"  v-for="(item,index) in classList" :key="index"  ></el-option>
            </el-select>
         </el-form-item>
     </el-form>
   </div>
</template>

<script>
import {
  getOrgByParentId,
} from "@/api";
export default {
   name:'OrgInfo',
   props:[],
   data(){
       return{
           schoolItem:{},
           gradeItem:{},
           classItem:{},
           schoolList:[],
           gradeList:[],
           classList:[]
       }
   },
   methods:{
      async reqGetOrgByParentId(parentId) {
            const res = await getOrgByParentId({ parentId });
             if(res.data.code ==100){
               this.schoolList = res.data.data; 
             }
     },
     async handlerSelect({lev}){
        //  当学校选择改变的时候 开始查询 年级的
        //学校改变的时候 下面信息随之清空
         if(lev ==1){
          
            this.gradeId=''
             this.classId = ''
             this.gradeList=[]
             this.classList =[]
             const res = await getOrgByParentId({parentId:this.schoolItem.id})
             this.gradeList = res.data.data;
             this.$emit('handlerChange',{code:this.schoolItem.code,lev:1})
         }else if(lev ==2){
        //  当年级选择改变的时候 开始查询 班级的
           this.classId = ''
           this.classList =[]
           const res=await getOrgByParentId({parentId:this.gradeItem.id})
           this.classList = res.data.data
           this.$emit('handlerChange',{code:this.gradeItem.code,lev:2})
         }else if(lev==3){
           this.$emit('handlerChange',{code:this.classItem.code,lev:3})
         }
     }
   },
   mounted(){
      //   传递父亲id 
       this.reqGetOrgByParentId(-1)
   }

}
</script>

<style>

</style>