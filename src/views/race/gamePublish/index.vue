<template>
  <div class="">
    <el-card shadow="never">
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button style="float: right" @click="handleSearchList" size="small"
        >搜索</el-button
      >
      <el-button
        style="float: right; margin-right: 15px"
        @click="handleResetSearch()"
        size="small"
      >
        重置
      </el-button>
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" inline>
          <el-form-item label="赛事名称">
            <el-input type="text" v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item label="比赛日期">
            <el-date-picker
              v-model="queryParams.startTime"
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="queryParams.endTime"
              type="date"
              placeholder="结束日期"
            />
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card shadow="never" style="margin: 15px 0">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div style="float: right; margin-right: 15px">
        <!-- <el-button type="primary"  @click="excelDialogVisible = true"  size="mini"  icon="">批量导入</el-button> -->

        <el-button size="mini" @click="alertAdd">添加</el-button>
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
      <el-table-column prop="id" label="编号" width="width" />
      <el-table-column prop="name" label="赛事名称" width="width" />
      <el-table-column label="赛事日期" width="width">
        <template slot-scope="scope">
          {{ scope.row.startTime }} - {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="报名日期" width="width">
        <template slot-scope="scope">
          {{ scope.row.signStartTime }} - {{ scope.row.signEndTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="alertDetailProject(scope.row.id)"
            >项目</el-button
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
    <!-- 赛事表单开始 -->
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
        <el-form-item label="赛事名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="比赛日期" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          -
          <el-date-picker
            v-model="form.endTime"
            type="date"
            placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="报名日期" prop="signStartTime">
          <el-date-picker
            v-model="form.signStartTime"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          -
          <el-date-picker
            v-model="form.signEndTime"
            type="date"
            placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 赛事表单结束 -->
    <!-- 赛事项目表单开始 -->
    <el-dialog
      title="赛事项目"
      :visible.sync="projectDialog"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="detailProjectForm"
        ref="detailProjectForm"
      >
        <el-form-item label="项目" prop="name">
             <el-select value-key="code" @change="changeProject" v-model="detailProjectForm.projectName" >
               <el-option
                 v-for="item in baseProjectList"
                 :key="item.code"
                 :label="item.name"
                 :value="{projectName:item.name,projectCode:item.code}">
               </el-option>
             </el-select>
        </el-form-item>
        <el-form-item label="上线人数" prop="upnum">
              <el-input-number v-model="detailProjectForm.upnum" ></el-input-number>
        </el-form-item>
      </el-form>
      <div> <el-button type="primary" @click="addDetailProject()">添加</el-button> </div>
         <el-table
           :data="detailProjectList"
           style="width: 100%">
           <el-table-column
             prop="projectName"
             label="项目名称"
             width="width">
           </el-table-column>
            <el-table-column
             prop="upnum"
             label="上线人数"
             width="width">
           </el-table-column>
            <el-table-column
        
             label="操作"
             width="width">
             <template slot-scope="scope">
                      <el-button type="danger" @click="deleteDetailProject(scope.row.id)" size="mini">删除</el-button>
             </template>
           </el-table-column>
         </el-table>
      <div slot="footer">
       
        <el-button type="info" @click="projectDialog = false">关闭</el-button>
      </div>
    </el-dialog>
    <!-- 赛事项目表单结束 -->
  </div>
</template>

<script>
import {
  editRaceInfo,
  getRaceInfoById,
  getRaceInfoByPage,
  queryRaceBaseProjectByPage,
  editRaceProjectDetail,
  getRaceProjectDetailByRaceId
} from "@/api/index.js";
export default {
  data() {
    return {
      // 赛事基本项目
      baseProjectList: [],
      // 赛事明细项目
      detailProjectList: [],
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
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      loading: false,
      projectDialog:false,
      formDialog: false,
      excelDialogVisible: false,
      staticForm: {
        title: "添加",
      },
      form: {
        ope: 1,
        id: "",
        state: 1,
        name: "",
        startTime: "",
        endTime: "",
        signStartTime: "",
        signEndTime: "",
        type: 2,
      },
       curProject:{},
      detailProjectForm:{
         projectName:'',
         projectCode:'',
         raceId:'',
         upnum:'',
         ope:1,
         id:''
      },
      tableData: [
        {
          ope: 1,
          id: 1,
          state: 1,
          no: "",
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
        beginCtime: "",
        endCtime: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        startTime: [{ required: true, message: "请输入", trigger: "blur" }],
        endTime: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      total: 1,
    };
  },
  methods: {
    jumpProjectDetail(id) {
      this.$router.push(`/race/eventDetail/${id}`);
    },
    reqDelete(id) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
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
    // 条件查询初始化  将分页查询中的条件置空
    handleResetSearch() {
      this.queryParams.name = "";
      this.queryParams.startTime = "";
      this.queryParams.endTime = "";
    },
    async alertUpdate(id) {
      this.staticForm = {
        title: "修改",
      };
      this.formDialog = true;
      if (id) {
        try {
          const res = await getRaceInfoById({ id });
          if (res) {
            Object.assign(this.form, res.data.data);
            this.form.ope = 2;
            this.formDialog = true;
            this.$nextTick(() => {
              this.$refs["form"].clearValidate();
            });
          }
        } catch (error) {
          this.formDialog = true;
        }
      }
    },
    resetForm() {
      this.form = {
        ope: 1,
        id: "",
        state: 1,
        name: "",
        startTime: "",
        endTime: "",
        signStartTime: "",
        signEndTime: "",
        type: 1,
      };
    },
    alertAdd() {
      this.resetForm();
      this.staticForm = {
        title: "增加",
      };
      this.formDialog = true;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
  //  项目选择框中值被修改回调
    changeProject($event){
      this.detailProjectForm.projectName = $event.projectName
      this.detailProjectForm.projectCode = $event.projectCode
    },
    // 分页查询
    async reqQueryByPage() {
      this.loading = true;
      try {
        const res = await getRaceInfoByPage(this.queryParams);
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
          const res = await editRaceInfo(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$refs.form.resetFields();
            this.formDialog = false;
          }
          this.reqQueryByPage();
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
      this.reqQueryByPage();
    },
    // 修改页码
    handleCurrentChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.currentPage = val;
      this.reqQueryByPage();
    },
    handleSearchList() {
      this.queryParams.currentPage = 1;
      this.reqQueryByPage();
    },
    // 赛事项目弹框
    alertDetailProject(raceId){
        this.detailProjectForm ={
          ope:1,
          projectName:'',
         projectCode:'',
         raceId,
         upnum:''
    ,
        }
        this.queryDetailProject()
        this.projectDialog = true
    },
    // 获取全部赛事基本项目
    async getAllBaseProject() {
      const res = await queryRaceBaseProjectByPage({
        currentPage: 1,
        pageSize: 1000,
        state: "",
        name: "",
      });
      this.baseProjectList = res.data.data
    },
    // 赛事明细项目编辑请求
    async addDetailProject(){
      const res = await  editRaceProjectDetail(this.detailProjectForm)
         this.queryDetailProject()
    },
    // 删除赛事项目
   async  deleteDetailProject(id){
      const res = await   editRaceProjectDetail({ope:0,id})
      this.queryDetailProject()
    },
    // 查询赛事明细项目
    async queryDetailProject(){
       const res = await  getRaceProjectDetailByRaceId({val:this.detailProjectForm.raceId})
       this.detailProjectList = res.data.data
    }
  },
  mounted() {
    this.reqQueryByPage();
    this.getAllBaseProject()
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
