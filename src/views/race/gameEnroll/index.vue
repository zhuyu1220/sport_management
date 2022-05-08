<template>
  <div class="">
    <el-card shadow="never" style="margin: 15px 0">
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
          <!-- {{scope.row.id}} -->
          <el-button type="text" @click="alertUser(scope.row.id)"
            >项目报名</el-button
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

    <el-dialog title="报名" :visible.sync="formDialog" width="width">
      <el-form ref="form" :model="form" label-width="150px">
        <el-form-item label="请选择赛事项目">
          <el-select @change="changeProject" value-key="id" v-model="form.projectdetailId" placeholder="">
            <el-option v-for="item in allDetailProject" 
            :label="item.projectName" 
             :key="item.id"
            :value="{projectCode:item.projectCode,projectdetailId:item.id}"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择身份">
          <el-select @change="changeUserType" v-model="form.userType" placeholder="" >
            <el-option
              :key="index"
              v-for="(item, index) in userType"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="请选择人员">
          <el-select v-model="form.no" placeholder="">
            <el-option
              :key="index"
              v-for="(item, index) in curUsers"
              :label="item.name"
              :value="item.no"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择手环号">
          <el-select v-model="form.wristbandNo" placeholder="">
            <el-option
              :key="index"
              v-for="(item, index) in allWristbands"
              :label="item.no"
              :value="item.no"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组队编号">
            <el-input v-model="form.team_no" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="顺序">
            <el-input v-model="form.seq" placeholder=""></el-input>
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
import {
  editRaceInfo,
  getRaceInfoById,
  getRaceInfoByPage,
  queryWristbandByPage,
  queryStudentByPage,
  queryTeacherByPage,
  queryVisitorByPage,
  getRaceProjectDetailByRaceId,
  editRaceUser,
  getRaceUser
} from "@/api/index.js";
export default {
  data() {
    return {
      allWristbands: [],
      allStudents: [],
      allTeachers: [],
      allVistors: [],
      curUsers:[],
      allDetailProject: [],
      // 报名人员
      allProjectDetailUsers:[],
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
      formDialog: false,
      excelDialogVisible: false,
      staticForm: {
        title: "添加",
      },
      userType: [
        {
          label: "学生",
          value: "1",
        },
        {
          label: "老师",
          value: "2",
        },
        {
          label: "访客",
          value: "3",
        },
      ],
      form: {
        ope: 1,
        id: "",
        no: "",
        // 基本项目编码
        projectCode: "",
        // 赛事项目编码
        projectdetailId: "",
        //赛事编码
        raceId: "",
        // 出场顺序
        seq: "",
        // 团队编号
        team_no: "",
        // 人员类型
        userType: "",
        // 手环编号
        wristbandNo: "",
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
        endTime: "",
        startTime: "",
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
      this.$router.push(`/race/gameEnroll/participant/${id}`);
    },
    changeProject($event){
      this.form.projectdetailId = $event.projectdetailId
      this.form.projectCode = $event.projectCode
      // 查询报名

      this.getRaceUser($event.projectdetailId)
    },
    changeUserType($event){
           console.log($event,888888888);
          if($event ==1){
            this.curUsers =this.allStudents
          }else if($event ==2){
            this.curUsers =this.allTeachers
          } else{
             this.curUsers =this.allVistors
          }  
             
    },
   async alertUser(raceId){
        this.form ={
        ope: 1,
        id: "",
        no: "",
        projectCode: "",
        projectdetailId: "",
        raceId,
        seq: "",
        team_no: "",
        userType: "",
        wristbandNo: "",
        }
        // 查询该赛事下的项目
      const res = await  getRaceProjectDetailByRaceId({val:raceId})
      // 当选择项目的时候查询项目报名人员
       this.allDetailProject = res.data.data
       this.formDialog = true
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
    //报名
   async reqEditInfo() {
   
     console.log('editRaceUser',editRaceUser);
     
          const res = await editRaceUser(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$refs.form.resetFields();
            this.formDialog = false;
          }
          this.getRaceUser(this.form.projectdetailId);
      
   
    },
    // 查询报名用户
   async getRaceUser(projectDetailId){
        const res = await    getRaceUser({val:projectDetailId})
      this.allProjectDetailUsers = res.data.data

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
  },
  async mounted() {
    this.reqQueryByPage();
      queryWristbandByPage({
      currentPage: 1,
      pageSize: 10000,
      no: "",
      state: "",
    }).then((res)=>{
         this.allWristbands = res.data.data
    });
    // 查询手环号
   queryStudentByPage({
      currentPage: 1,
      pageSize: 10000,
      name: "",
      gradeCode: "",
      classCode: "",
    }).then(res=>{
        this.allStudents = res.data.data
    });
    // 查询所有学生 
    queryTeacherByPage({
      currentPage: 1,
      pageSize: 10000,
      name: "",
    }).then(res=>{
        this.allTeachers = res.data.data
    });
    // 查询所有老师
   
queryVisitorByPage({
      currentPage: 1,
      pageSize: 10000,
      name: "",
    }).then(res=>{
          this.allVistors =  res.data.data 
    });
    // 查询所有访客
    // 查询该赛事下的项目
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
