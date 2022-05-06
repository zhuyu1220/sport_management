<template>
  <div>
  
        <el-select
          :style="{width:width}"
          v-model="gradeItem"
          placeholder="年级"
          clearable
          value-key="id"
          @change="handlerSelect({ lev: 2 })"
          :size = size
        >
          <el-option
            :label="item.name"
            :value="item"
            v-for="item in gradeList"
            :key="item.id"
             
          ></el-option>
        </el-select>
        <el-select
             :style="{width:width}"
          v-model="classItem"
          placeholder="班级"
          clearable
          value-key="id"
          @change="handlerSelect({ lev: 3 })"
           :size = size
        >
          <el-option
            :label="item.name"
            :value="item"
            v-for="item in classList"
            :key="item.id"
          ></el-option>
        </el-select>
    
  </div>
</template>

<script>
import { getOrgByParentId } from "@/api";
export default {
  name: "OrgInfo",
  props: ['size','width'],
  data() {
    return {
      schoolItem: {},
      gradeItem: {},
      classItem: {},
      schoolList: [],
      gradeList: [],
      classList: [],
    };
  },
  methods: {
    async reqGetOrgByParentId(parentId) {
      try {
        const res = await getOrgByParentId({ parentId });
        if (res.data.code == 100) {
          this.schoolList = res.data.data;
          const res2 = await getOrgByParentId({
            parentId: this.schoolList[0].id,
          });
          this.gradeList = res2.data.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handlerSelect({ lev }) {
      //  当学校选择改变的时候 开始查询 年级的
      //学校改变的时候 下面信息随之清空
      if (lev == 2) {
        //  当年级选择改变的时候 开始查询 班级的
        this.classItem = "";
        this.classList = [];
        try {
           if(this.gradeItem.id){
            const res = await getOrgByParentId({ parentId: this.gradeItem.id });
            this.classList = res.data.data;
            this.$emit("handlerChange", { id: this.gradeItem.code, lev: 2 });
           }
      
        } catch (error) {
          console.log(error);
        }
      } else if (lev == 3) {
        this.$emit("handlerChange", { id: this.classItem.code, lev: 3 });
      }
    },
    clearOption(){
        this.gradeItem = ''
        this.classItem = ''
    }
  },
  mounted() {
    //   传递父亲id
    this.reqGetOrgByParentId(-1);
  },
};
</script>

<style  scoped>

</style>>
