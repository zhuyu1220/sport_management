<template>
  <div class="">
    <!-- 搜索开始 -->
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
          <el-form-item label="姓名">
            <el-input type="text" v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item label="年级">
            <el-input type="text" v-model="queryParams.grade"></el-input>
          </el-form-item>
          <el-form-item label="班级">
            <el-input type="text" v-model="queryParams.class"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <!-- 工具栏开始 -->
    <el-card shadow="never" style="margin: 15px 0">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div style="float: right; margin-right: 15px">
        <el-button
          type="primary"
          @click="excelDialogVisible = true"
          size="mini"
          icon=""
          >批量导入</el-button
        >
        <el-button
          type="success"
          @click="batchPass(1)"
          size="mini"
          :disabled="multipleSelection.length < 1"
          icon="el-icon-s-check"
          >批量通过</el-button
        >
        <el-button
          type="warning"
          @click="batchPass(2)"
          size="mini"
          :disabled="multipleSelection.length < 1"
          icon="el-icon-s-check"
          >批量拒绝</el-button
        >
        <el-button size="mini" @click="alertAdd">添加</el-button>
      </div>
    </el-card>
    <!-- 工具栏结束 -->

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
       :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="classCode" label="年级" width="width">
      </el-table-column>
      <el-table-column prop="gradeCode" label="班级" width="width">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="no" label="学号" width="width"> </el-table-column>
      <el-table-column prop="height" label="身高" width="width">
      </el-table-column>
      <el-table-column prop="weight" label="体重" width="width">
      </el-table-column>
      <el-table-column prop="phone1" label="联系方式一" width="width">
      </el-table-column>
      <el-table-column prop="phone2" label="联系方式二" width="width">
      </el-table-column>
      <el-table-column label="审核状态" width="width">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="reqDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button type="text" @click="batchPass(1, scope.row.id)"
            >通过</el-button
          >
          <el-button type="text" @click="batchPass(2, scope.row.id)"
            >拒绝</el-button
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
    <!-- 学生信息表单 -->
    <el-dialog
      :title="staticUserForm.title"
      :visible.sync="formDialogVisible"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="userForm"
        ref="userForm"
        :rules="formRules"
      >
        <el-form-item label="学号" prop="no">
          <el-input v-model="userForm.no"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="照片上传" prop="pic">
          <el-upload
            class="upload-demo"
            drag
            :limit="1"
            :file-list="userForm.pic"
            list-type="picture-card"
            :show-file-list="true"
            action=""
            :auto-upload="false"
            :on-change="onChangeFile"
            :on-remove="onRemoveFile"
            ref="upload"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
            <div
              style="margin-top: 35px; color: #e63e57"
              slot="tip"
              class="el-upload__tip"
            ></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="所属组织">
          <!-- 查询年级 根据学校的id -->
          <el-select
            clearable
            @change="reqGetGaradeByParentId(org.schoolCode.id)"
            v-model="org.schoolCode"
            placeholder="请输入选择学校"
          >
            <el-option
              v-for="(item, index) in org.schoolArray"
              :key="index"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
          <el-select
            @change="reqGetClassByParentId(org.gradeCode.id)"
            v-model="org.gradeCode"
            placeholder="请选择年级"
          >
            <el-option
              v-for="(item, index) in org.gradeArray"
              :key="index"
              :label="item.name"
              :value="item"
            />
          </el-select>
          <el-select v-model="org.classCode" placeholder="请选择班级">
            <el-option
              v-for="(item, index) in org.gradeArray"
              :key="index"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="身高(厘米)" prop="height">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="体重(千克)" prop="weight">
          <el-input v-model="userForm.account"></el-input>
        </el-form-item>
        <el-form-item label="联系方式一">
          <el-input v-model="userForm.phone1"></el-input>
        </el-form-item>
        <el-form-item label="联系方式二">
          <el-input v-model="userForm.phone2"></el-input>
        </el-form-item>
        <el-form-item label="联系方式三">
          <el-input v-model="userForm.phone1"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitUserForm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 学生信息表单 -->
    <!-- 上传excel -->
    <el-dialog
      title="上传学生信息"
      :visible.sync="excelDialogVisible"
      width="width"
    >
      <div>
        <el-upload
          ref="uploadExcel"
          action=""
          :limit="1"
          :http-request="batchUpload"
          accept=".xls,.xlsx,"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            一次只能上传一个xls/xlsx文件，且不超过10M
          </div>
        </el-upload>
      </div>
      <div slot="footer">
        <el-button @click="excelDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="excelDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 上传excel -->
  </div>
</template>

<script>
import {
  getOrgByParentId,
  editStudentInfo,
  checkStudentInfo,
  queryStudentByPage,
  getSutdentById,
} from "@/api/index.js";
export default {
  data() {
    return {
      progressPercent: 0,
      excelDialogVisible: false,
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
        user: "学生",
      },
      formDialogVisible: false,
      userInfo: {},
      userForm: {
        no: "",
        name: "",
        height: "",
        weight: "",
        classCode: "",
        gradeCode: "",
        schoolCode: "",
        isRegiste: "",
        phone1: "",
        phone2: "",
        phone3: "",
        pic: [],
        ope: "1",
      },

      formRules: {
        no: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        pic: [{ required: true, message: "请上传照片", trigger: "blur" }],
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
      },
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      org: {
        schoolCode: "",
        gradeCode: "",
        classCode: "",
        schoolArray: [],
        gradeArray: [],
        classArray: [],
      },
      tableData: [],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        grade: "",
        class: "",
        name: "",
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
        const res = await editStudentInfo({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryStudentByPage();
        }
      });
    },

    async alertUpdate(id) {
      this.staticForm.title = "修改";
      if(id) {
        try {
          const res = await getSutdentById({ id });
          if (res) {
            Object.assign(this.form, res.data.data);
            this.form.ope = 2;
            this.formDialogVisible = true;
             this.$nextTick(() => {
               this.$refs['userForm'].clearValidate()
             })
          }
        } catch (error) {
          this.formDialogVisible = true;
        }
      }
    },
    
    alertAdd() {
      this.staticUserForm = {
        title: "增加",
        user: "学生",
      };
      this.userForm = {
        no: "",
        name: "",
        height: "",
        weight: "",
        classCode: "",
        gradeCode: "",
        schoolCode: "",
        isRegiste: "",
        phone1: "",
        phone2: "",
        phone3: "",
        pic: [],
        ope: "1",
      };
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
      this.formDialogVisible = true;
    },
    handleResetSearch() {
      this.queryParams.name = "";
      this.queryParams.grade = "";
      this.queryParams.class = "";
    },
       //点击查询按钮 发送分页查询请求
    handleSearchList(){
       this.queryParams.currentPage =1
       this.reqQueryStudentByPage();
    },
    //查询学生详情
    async reqUserDesc(id) {
      const res = await getSutdentById({ id });
      Object.assign(this.userForm, res.data.data);
    },
    // 分页查询
    async reqQueryStudentByPage() {
      const res = await queryStudentByPage(this.queryParams);
      this.total = res.data.dataSize;
      this.tableData = res.data.data;
    },
    async reqSubmitUserForm() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          const res = await this.userForm();
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.reqQueryStudentByPage();
          }
        }
      });
    },
    async reqCheckStudentInfo(id) {
      try {
        const res = await checkStudentInfo(id);
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "操作成功",
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
    //批量审核 + 单个审核
    async batchPass(ope, id) {
      let ids = [];
      // 判断是批量操作还是单个操作
      if (id) {
        ids.push(id);
      } else {
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
      }
      const res = await checkTeacherInfo({ ids, ope });
      if (res.data.code == 100) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.reqQueryByPages();
      }
    },
    // 查询学校组织 查询年级组织 查询班级组织 为了选择
    async reqGetSchoolByParentId(parentId) {
      const res = await getOrgByParentId({ parentId });
      this.org.schoolArray = res.data.data;
    },
    async reqGetGaradeByParentId(parentId) {
      console.log(parentId);
      const res = await getOrgByParentId({ parentId });
      this.org.gradeArray = res.data.data;
    },
    async reqGetClassByParentId(parentId) {
      const res = await getOrgByParentId({ parentId });
      this.org.classArray = res.data.data;
    },
    onChangeFile(file, fileList) {
      this.userForm.pic = fileList;
    },
    onRemoveFile(file, fileList) {
      this.userForm.pic = fileList;
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
    // 批量上传学生信息
    batchUpload(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      this.$axios
        .post("/uploadExcel", formData)
        .then(() => {
          this.$message({
            type: "success",
            message: "上传成功",
          });
          this.reqQueryStudentByPage();
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "上传失败",
          });
        });
    },
  },
  mounted() {
    this.reqQueryStudentByPage();
    this.reqGetSchoolByParentId({ parentId: -1 });
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
