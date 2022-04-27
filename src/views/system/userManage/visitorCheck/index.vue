<template>
  <div class="">

    <el-card>
      <el-form
        label-width="40px"
        label-position="left"
        inline
        style="display: flex"
      >
        <el-form-item label="姓名">
          <el-input type="text" v-model="queryParams.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>

       <el-row :gutter="24" justify="end" align="middle" >
        <el-col :span="8">
        
      <el-button type="success" @click="alertLotCheck(1)" :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量通过</el-button>
          <el-button type="warning" @click="alertLotCheck(0)"  :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量拒绝</el-button>
        </el-col>
      
      </el-row>

    </el-card>

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="gender" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="picId" label="照片" width="width">
      </el-table-column>
      <el-table-column prop="height" label="身高" width="width">
      </el-table-column>
      <el-table-column prop="weight" label="体重" width="width">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="width">
      </el-table-column>
      <el-table-column label="审核状态" width="width">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)"
            >详情</el-button
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
      :title="staticUserForm.title"
      :visible.sync="formDialogVisible"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="userForm"
        ref="userform"
        :rules="formRules"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userForm.gender" label="1">男</el-radio>
          <el-radio v-model="userForm.gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="照片上传">
          <div class="avatar-uploader">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="身高">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="体重">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="学校">
          <el-select
            v-model="userForm.schoolCode"
            placeholder="学校"
          >
            <el-option
              :label="item.name"
              :value="item.code"
               v-for="(item, index) in schoolList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitUserForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryVistorByPage,
  getVistroById,
    checkVistorInfo,
} from "@/api/index.js";
export default {
  data() {
    return {
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      formDialogVisible: false,
      schoolList: [],
      userInfo: {},
      userForm: {
        ope: 1,
        id: "",
        state: 0,
        isRegiste: "",
        name: "",
        gender: "1",
        height: "",
        weight: "",
        phone: "",
        picId: "",
        schoolCode: "",
      },
      tableData: [
        {
          classCode: "3",
          ctime: "2022-04-12 17:44:22",
          gender: "1-男，0-女，2-未知",
          gradeCode: "2",
          height: "170",
          id: "1",
          isRegiste: "1-已上传，0-未上传",
          name: "钱敬冬",
          no: "20220412",
          ope: "1-新增;2-修改;0-删除",
          phone1: "",
          phone2: "",
          phone3: "",
          picId: "",
          schoolCode: "1",
          state: "1",
          weight: "60",
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
      },
      formRules: {
        no: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        height: [{ required: true, message: "请输入", trigger: "blur" }],
        weight: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      total: 1,
    };
  },
  methods: {
    alertUpdate() {
      this.staticUserForm = {
        title: "访客详情",
      };
      this.formDialogVisible = true;
      // 将查询到的数据回显
      const res = this.getVistroById();
      if (res.data.code == 100) {
        Object.assign(this.userForm, res.data.data);
      }
    },
    // 分页查询
    async reqQueryStudentByPage() {
      const res = await queryVistorByPage(this.queryParams);
      this.total = res.data.dataSize;
      this.tableData = res.data.data;
    },
    reqSubmitUserForm() {
       this.formDialogVisible = true
    },
   async reqCheckUserInfo() {
      const res = checkVistorInfo(this.checkInfo);
      if(res.data.code ==100){
        this.reqQueryStudentByPage()
      }
    },
    alertLotCheck(ope){
       this.checkInfo.ope = ope
       let ids = []
       this.multipleSelection.forEach(item=>{
         ids.push(item.id)
       })
      this.checkInfo.ids =ids
      this.reqCheckUserInfo()

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.reqQueryStudentByPage();
    },
    handleCurrentChange(val) {
      this.queryParams.currentPage = val;
      this.reqQueryStudentByPage();
    },
  },
  mounted() {
    this.reqQueryStudentByPage();
    this.reqGetOrgByParentId(-1);
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
