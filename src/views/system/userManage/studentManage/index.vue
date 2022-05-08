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
            <el-form-item label="年级/班级">
               <org-info ref="orgInfo" @handlerChange="selectOrg"></org-info>
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
          @click="batchPass(0)"
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
       v-loading="loading"
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
            <span v-if="scope.row.state ==0">
                审核拒绝
            </span>
              <span v-else-if="scope.row.state ==1">
                审核通过
            </span>
            <span v-else>
                未审核
            </span>
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
          <el-button type="text" @click="batchPass(0, scope.row.id)"
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
          :page-sizes="[5, 10, 15]"
          :page-size="10"
          layout=" sizes, prev, pager, next, total"
          :total="total"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 学生信息表单 -->
    <el-dialog
      :title="staticForm.title"
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
          <el-cascader
             style="width:300px"
            :options="allOrg"
            v-model="curOrg"
            :show-all-levels="true"
            collapse-tags
            :props="{
              label: 'name',
              value: 'code',
              multiple: false,
            }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="身高(厘米)" prop="height">
          <el-input v-model="userForm.height"></el-input>
        </el-form-item>
        <el-form-item label="体重(千克)" prop="weight">
          <el-input v-model="userForm.weight"></el-input>
        </el-form-item>
        <el-form-item label="联系方式一">
          <el-input v-model="userForm.phone1"></el-input>
        </el-form-item>
        <el-form-item label="联系方式二">
          <el-input v-model="userForm.phone2"></el-input>
        </el-form-item>
        <el-form-item label="联系方式三">
          <el-input v-model="userForm.phone3"></el-input>
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
  editStudentInfo,
  checkStudentInfo,
  queryStudentByPage,
  getSutdentById,
  getAllOrg
} from "@/api/index.js";
import {treeing} from '@/utils/tool'
import OrgInfo from "@/components/OrgInfo";
export default {
  components:{
    OrgInfo,
  },
  data() {
    return {
      allOrg: [],
      curOrg:[],
      loading:false,
      excelDialogVisible: false,
       dialogVisible: false,
      multipleSelection: [],
      staticForm:{
        title:"添加"
      },
      formDialogVisible: false,
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
        pic: '',
        ope: "1",
      },

      formRules: {
        no: [{ required: true, message: "请输入学号", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // pic: [{ required: true, message: "请上传照片", trigger: "blur" }],
        height: [{ required: true, message: "请输入身高", trigger: "blur" }],
        weight: [{ required: true, message: "请输入体重", trigger: "blur" }],
      },
      imageUrl: "",
      dialogImageUrl: "",
      tableData: [],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        gradeCode: "",
        classCode: "",
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
          this.formDialogVisible =false;
          this.reqQueryByPages();
        }
      });
    },
       // 选择年级或者班级查询
    selectOrg(item) {
      console.log(item,5555555555);
      
      if (item.lev == 2) {
        console.log(item.id,this.queryParams.gradeCode,5666666666);
        
        this.queryParams.gradeCode =item.id;
        this.queryParams.classCode = "";
      } else {
        this.queryParams.classCode =item.id;
      }
    },
    async reqGetAllOrg(){
     const res = await getAllOrg();
     this.allOrg = treeing(res.data.data);
    },
    async alertUpdate(id) {
      this.staticForm.title = "修改";
      if(id) {
        try {
          const res = await getSutdentById({ val:id });
          
          
          if (res) {
            console.log(res.data.data,5556666);
            Object.assign(this.userForm, res.data.data);
          
            this.userForm.ope = 2;
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
      this.staticForm = {
        title: "增加",
     
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
        pic: '',
        ope: "1",
      };
      this.$nextTick(() => {
        this.$refs['userForm'].clearValidate()
      })
      this.formDialogVisible = true;
    },
    handleResetSearch() {
      this.queryParams.name = "";
      this.queryParams.gradeCode = "";
      this.queryParams.classCode = "";
    },
       //点击查询按钮 发送分页查询请求
    handleSearchList(){
       this.queryParams.currentPage =1
       this.reqQueryByPages();
    },
    //查询学生详情
    async reqUserDesc(id) {
      const res = await getSutdentById({val:id});
      Object.assign(this.userForm, res.data.data);
    },
    // 分页查询
    async reqQueryByPages() {
      this.loading = true;
      try {
        const res = await queryStudentByPage(this.queryParams);
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
    async reqSubmitUserForm() {
      this.$refs.userForm.validate(async (valid) => {
        if (valid) {
          this.userForm.schoolCode = this.curOrg?.[0]
          this.userForm.gradeCode = this.curOrg?.[1]
          this.userForm.classCode = this.curOrg?.[2]
          const res = await editStudentInfo(this.userForm);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.formDialogVisible = false;
            this.reqQueryByPages();
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
      const res = await checkStudentInfo({ ids, ope });
      if (res.data.code == 100) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.reqQueryByPages();
      }
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
         this.queryParams.currentPage = 1;
      this.queryParams.pageSize = val;
      this.reqQueryByPages();
    },
    handleCurrentChange(val) {
            this.queryParams.currentPage = 1;
      this.queryParams.currentPage = val;
      this.reqQueryByPages();
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
    this.reqQueryByPages();
 this.reqGetAllOrg()
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
