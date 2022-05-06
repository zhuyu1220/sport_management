<template>
  <div >
   <!--  搜索栏开始 -->
    <!-- <el-card>
     
    </el-card> -->
   <!-- 搜索栏结束 -->
   <!-- 工具栏开始 -->
    <el-card>

      <el-row :gutter="24" justify="end" align="middle">
        <el-col :span="8">
          <el-button type="primary" @click="alertAdd">添加</el-button>
        </el-col>
      </el-row>

    </el-card>
    <!-- 工具栏结束 -->
    <!-- 数据展示栏开始--------------- -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
    
      <el-table-column prop="name" label="项目名称" width="width"/>
      <el-table-column prop="raceId" label="跑道项目" width="width"/>
      <el-table-column prop="projectName" label="赛事名称" width="width"/>
       <el-table-column prop="projectCode" label="赛事编码" width="width"/>
       <el-table-column prop="upnum"  label="限制人数" >
       </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="reqDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 数据展示栏结束 -->

   <!-- 编辑框开始 -->
    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialogVisible"
      :modal="false"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="form"
        ref="form"
        :rules="formRules"
      >
        <el-form :model="form">
           <el-form-item label="项目名称">
               <el-input v-model="form.name"></el-input>
           </el-form-item>
           <el-form-item label="跑步项目">
               <el-select v-model="form.raceId" placeholder="">
                   <el-option v-for="(item,index) in raceList" :key="index" :value="item.id" :label="label" value="value"></el-option>
               </el-select>
           </el-form-item>
            <el-form-item label="上限人数">
            <el-input-number v-model="form.upnum" :min='0' placeholder=""/>
                </el-form-item>
       </el-form>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 编辑框结束 -->

  </div>
</template>

<script>

import {queryRaceBaseProjectByPage,getRaceProjectDetailByRaceId,editRaceProjectDetail} from "@/api/index.js";
export default {
  props:['projectCode','projectName'],
  name:'ProjectDetail',
  data() {
    return {
      raceList:[],
      dropSelect: [
        {
          value: 1,
          label: "在用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      formDialogVisible: false,
      staticForm:{
        title:'添加'
      },
      form: {
        ope: 1,
        id: "",
        state: 1,
        name:'',
        //跑步项目
        raceId:'',
        //赛事名称
        projectName:'',
        // 赛事编码
        projectCode:'',
        // 上限人数
        upnum:''
      },
      tableData: [
       {
        // 项目名称   
         name:'',
        //跑步项目
        raceId:'',
        //赛事名称
        projectName:'',
        // 赛事编码
        projectCode:'',
        // 上限人数
        upnum:''
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        state: 1,
        name:''
      },
      formRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        startTime: [{ required: true, message: "请输入", trigger: "blur" }],
         endTime: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      total: 1,
 
    };
  },
  computed:{
  
  },
  
  methods: {
   
    reqDelete(id) {
      this.$confirm("此操作将永久删除此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await editRaceInfo({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPage();
        }
      });
    },
   async  alertUpdate(id) {
      this.staticForm = {
        title: "修改",
      };
      // 将查询到的数据回显
      try {
          const res = await getRaceInfoById({id});
        if (res.data.code == 100) {
         Object.assign(this.form, res.data.data);
        this.form.ope = 1;
         this.form.type = 1;
        this.formDialogVisible = true;
      }
      } catch (error) {
        console.log('奥术大师');
        
         this.formDialogVisible = true;
      }finally{
         this.formDialogVisible = true;
      }
   
      
    },
    alertAdd() {
      this.staticForm = {
        title: "增加",
      };
      this.form = {
        ope: 1,
        id: "",
        state: 1,
        name:'',
        startTime:'',
        endTime:'',
        signStartTime:'',
        signEndTime:'',
        type:1
      };

      this.formDialogVisible = true;
    },
    async reqSubmitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
          const res = await editRaceInfo(this.form);
           if (res.data.code == 100) {
             this.$message({
              type: "success",
              message: "操作成功",
            });
            this.formDialogVisible=false;
            this.reqQueryByPage();
          }
          } catch (error) {
            console.log(error);
         
          }
        }
      });
    },    

  },
  watch:{
    projectName(newVal){
      this.form.projectName =newVal
    },
     projectCode(newVal){
      this.form.projectCode =newVal
    },
  },
 async mounted() {
    // this.reqQueryByPage();
    const res = await  queryRaceBaseProjectByPage({currentPage:1,pageSize:100})
    if(res.data.code ==100){
        this.raceList  =res.data.data
    }
    // 
    this.form.projectName = this.projectName
     this.form.projectCode = this.projectCode
  },
};
</script>

<style lang="scss" scoped>
    
</style>
