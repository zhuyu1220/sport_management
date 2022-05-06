<template>
  <div class="">
    <!-- <ProjectDetail></ProjectDetail> -->
   <!--  搜索栏开始 -->
    <el-card>
      <el-form
        label-width="70px"
        label-position="left"
        inline
        style="display: flex"
      >
        <el-form-item label="赛事名称">
          <el-input type="text" v-model="queryParams.name"></el-input>
        </el-form-item>
        <el-form-item label="比赛日期">
         <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="开始日期">
         </el-date-picker> -
         <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="结束日期"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reqQueryByPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
    <!-- 数据展示栏开始 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="id" label="编号" width="width"/>
      <el-table-column prop="name" label="赛事名称" width="width"/>
       <el-table-column prop="startTime" label="开始日期" width="width"/>
       <el-table-column prop="endTime" label="结束日期" width="width"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row)">编辑</el-button>
          <el-button type="text" @click="alertProject(scope.row)">项目</el-button>
          <el-button type="text" @click="reqDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 数据展示栏结束 -->
   <!-- 分页开始 -->
    <el-row type="flex" justify="end" :gutter="25">
      <el-col :span="6">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryParams.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout=" sizes, prev, pager, next, jumper,total"
          :total="total"
        >
        </el-pagination>
      </el-col>

    </el-row>
   <!-- 分页结束 -->
   <!-- 编辑框开始 -->
    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialogVisible"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="form"
        ref="form"
        :rules="formRules"
      >
        <el-form-item label="赛事名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="比赛日期" prop="name">
         <el-date-picker
          v-model="form.startTime"
          type="date"
          placeholder="开始日期">
         </el-date-picker> -
         <el-date-picker
          v-model="form.endTime"
          type="date"
          placeholder="结束日期">
         </el-date-picker>
        </el-form-item> 
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 编辑框结束 -->
     <!-- 项目编辑框开始 -->
    <el-dialog
      title=""
      :visible.sync="projectDialogVisible"
      width="width"
      fullscreen
      >
      <div>
        <ProjectDetail :projectCode="projectCode" :projectName="projectName"></ProjectDetail>
      </div>
      <div slot="footer">
        <el-button @click="projectDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="projectDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 项目编辑框结束 -->
  </div>
</template>

<script>
import ProjectDetail from '@/views/race/dailyRun/ProjectDetail'
import {editRaceInfo,getRaceInfoById,getRaceInfoByPage} from "@/api/index.js";
export default {
  components:{
    ProjectDetail
  },
  data() {
    return {
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
        startTime:'',
        endTime:'',
        signStartTime:'',
        signEndTime:'',
        type:2
      },
      tableData: [
       {
        ope: 1,
        id: "1111",
        state: 1,
        name:'2022年秋季运动会',
        startTime:'',
        endTime:'',
        signStartTime:'',
        signEndTime:'',
        type:2
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
      // 项目s
       projectDialogVisible:true,
       projectName:'',
       projectCode:''
    };
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
   async  alertUpdate(row) {
      this.staticForm = {
        title: "修改",
      };
      // 将查询到的数据回显
        Object.assign(this.form,row);
        this.form.ope = 1;
       this.form.type = 2;
        this.formDialogVisible = true;
   

  
   
      
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
        type:2
      };

      this.formDialogVisible = true;
    },
    alertProject({name,id}){
      console.log(name,id,111111111111);
      
      this.projectName = name
      this.projectCode = id
      this.projectDialogVisible= true
    },
    // 分页查询
    async reqQueryByPage() {
      const res = await getRaceInfoByPage(this.queryParams);
      this.total = res.data.dataSize;
      this.tableData = res.data.data;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.reqQueryByPage();
    },
    handleCurrentChange(val) {
      this.queryParams.currentPage = val;
      this.reqQueryByPage();
    },
  },
  mounted() {
    // this.reqQueryByPage();
  },
};
</script>

<style lang="scss" scoped>

</style>
