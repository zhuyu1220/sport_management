<template>
  <div class="">

     <el-card shadow="never" style="margin:15px 0;">
          <i class="el-icon-tickets"></i>
      <span>数据列表</span>
        <div style="float:right;margin-right:15px">
           <!-- <el-button type="primary"  @click="excelDialogVisible = true"  size="mini"  icon="">批量导入</el-button> -->
        
          <el-button size='mini' @click="alertAdd">添加</el-button>
        </div>
    </el-card>

    <el-table
      :data="tableData"
       v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
       :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
      <el-table-column prop="name" label="项目名称" width="width"/>
      <el-table-column prop="raceId" label="跑道项目" width="width"/>
      <el-table-column prop="projectName" label="赛事名称" width="width"/>
       <el-table-column prop="projectCode" label="赛事编码" width="width"/>
       <el-table-column prop="upnum"  label="限制人数" >
       </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="reqDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-row type="flex" justify="end" :gutter="12">
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

    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialog"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="form"
        ref="form"
        :rules="formRules"
      >
       <el-form-item label="项目名称">
               <el-input v-model="form.name"></el-input>
           </el-form-item>
           <el-form-item label="跑步项目">
               <el-select v-model="form.raceId" placeholder="">
                   <el-option v-for="(item,index) in raceList" :key="index" :value="item.id" :label="label" ></el-option>
               </el-select>
           </el-form-item>
            <el-form-item label="上限人数">
            <el-input-number v-model="form.upnum" :min='0' placeholder=""/>
                </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.des"></el-input>
        </el-form-item>
     
      </el-form>
      <div slot="footer">
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditInfo()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// 获取基础项目  获取项目详情  编辑项目  获取项目列表
import {queryRaceBaseProjectByPage,getRaceProjectDetailByRaceId,editRaceProjectDetail} from "@/api/index.js";
export default {
  data() {
    return {
      dropSelect: [
        {
          value: 1,
          label: "在用",
        },
        {
          value: 0,
          label: "损坏",
        },
      ],
      raceList:[],
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      loading: false,
      formDialog: false,
      excelDialogVisible:false,
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
        no: [{ required: true, message: "请输入", trigger: "blur" }],
        state: [{ required: true, message: "请输入", trigger: "blur" }],
 
      },
      total: 1,
    };
  },
  methods: {
    reqDelete(id) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await editRaceProjectDetail({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPage();
        }
      });
    },
   
    async alertUpdate(id) {
      this.staticForm = {
        title: "修改",
      };
         this.formDialog = true;
      if(id) {
        try {
          const res = await getRaceProjectDetailByRaceId({ id });
          if (res) {
            Object.assign(this.form, res.data.data);
            this.form.ope = 2;
            this.formDialog = true;
             this.$nextTick(() => {
               this.$refs['form'].clearValidate()
             })
          }
        } catch (error) {
          this.formDialog = true;
        }
      }
    },
    resetForm(){
      this.form = {
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
      };
    },
    alertAdd() {
      this.resetForm()
        this.staticForm = {
        title: "增加",
      };
      this.formDialog = true;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })

      
    },
    // 分页查询
    async reqQueryByPage() {
      this.loading = true;
      try {
        const res = await getRaceProjectDetailByRaceId({id:this.$route.params.id});
        if (res.data.code == 100) {
          this.tableData = res.data.data;
          this.total = +res.data.dataTotal;
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
       //添加信息 修改信息 请求
    reqEditInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
   
          const res = await editRaceProjectDetail(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$refs.form.resetFields()
            this.formDialog = false;
          }
          this.reqQueryByPages();
        }
      });
    }, 
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
     // 修改每页展示条数
    handleSizeChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.pageSize = val;
      this.reqQueryByPages();
    },
    // 修改页码
    handleCurrentChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.currentPage = val;
      this.reqQueryByPages();
    },
  },
 async mounted() {
    // this.reqQueryByPage();
    const res = await  queryRaceBaseProjectByPage({currentPage:1,pageSize:100})
    if(res.data.code ==100){
        this.raceList  =res.data.data
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
