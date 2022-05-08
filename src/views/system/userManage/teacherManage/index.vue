
<template>
  <div class="wrapper">
    <!-- 搜索开始 -->
    <el-card shadow="never">
         <i class="el-icon-search"></i>
          <span>筛选搜索</span>
            <el-button style="float:right" @click="handleSearchList" size="small">搜索</el-button>
            <el-button style="float:right;margin-right:15px"  @click="handleResetSearch()" size="small">
              重置
            </el-button>
            <div style="margin-top:15px">
              <el-form   size="small" label-width="140px" inline>
          <el-form-item label="姓名">
            <el-input type="text" v-model="queryParams.name"></el-input>
          </el-form-item>
        </el-form>
        </div>
    </el-card>
      <!-- 搜索结束-->
      <!-- 工具栏开始 -->
    <el-card shadow="never" style="margin:15px 0;">
          <i class="el-icon-tickets"></i>
      <span>数据列表</span>
        <div style="float:right;margin-right:15px">
           <el-button type="primary"  @click="excelDialogVisible = true"  size="mini"  icon="">批量导入</el-button>
         <el-button type="success"  @click="batchPass(1)" size='mini'  :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量通过</el-button>
          <el-button type="warning" @click="batchPass(2)"  size="mini" :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量拒绝</el-button>
          <el-button size='mini' @click="alertAdd">添加</el-button>
        </div>
    </el-card>
       <!-- 工具栏结束 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
       @selection-change="handleSelectionChange"
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
         <el-table-column
      type="selection"
      width="55"/>
      <el-table-column type="index" label="序号" width="60px">
     
    </el-table-column>
 
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="no" label="工号" width="width">
      </el-table-column>
       <el-table-column  label="照片" width="width">
          <template scope="scope">
             <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.pic"
                fit="contain "></el-image>
          </template>
      </el-table-column>
      <el-table-column prop="height" label="身高" width="width">
      </el-table-column>
      <el-table-column prop="weight" label="体重" width="width">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="width">
      </el-table-column>
      <el-table-column  label="审核状态" width="width">
        <template slot-scope="scope">
            {{scope.row.state}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="reqDelete(scope.row.id)"
            >删除</el-button
          >
           <el-button type="text" 
           @click="batchPass(1,scope.row.id)"
            >通过</el-button
          >
           <el-button type="text"
           @click="batchPass(2,scope.row.id)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 编辑账号表单对话框开始 -->
    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialog"
      width="width"
    >
      <el-form :model="form" ref="form" :rules="formRules" label-position="left" label-width="120px">
          <el-form-item label="工号" prop="no">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
         <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio v-model="form.gender" label="1">男</el-radio>
          <el-radio v-model="form.gender" label="0">女</el-radio>
        </el-form-item>
        <el-form-item label="照片上传"  prop="pic">
          <div class="avatar-uploader" style="margin-bottom:30px">
            <el-upload
                  drag
                  :limit="1"
                  list-type="picture-card"
                  :file-list="form.pic"
                  action=""
                  :auto-upload="false"
                  :on-change="onChangeFile"
                  :on-remove="onRemoveFile"
                  ref="upload"
            >
            
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身高(厘米)" prop="height">
          <el-input v-model="form.height"></el-input>
        </el-form-item>
        <el-form-item label="体重(千克)" prop="weight">
          <el-input v-model="form.weight"></el-input>
        </el-form-item>
        <el-form-item label="学校" prop="schoolCode">
          <el-select
            v-model="form.schoolCode"
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
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditInfo()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 编辑账号表单对话框结束 -->
      <!-- 上传excel -->
           <el-dialog
             title="批量上传"
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
     <div slot="tip" class="el-upload__tip">一次只能上传一个xls/xlsx文件，且不超过10M</div>
  
     </el-upload>
             </div>
             <div slot="footer">
               <el-button @click="excelDialogVisible = false">取 消</el-button>
               <el-button type="primary" @click="excelDialogVisible = false">确 定</el-button>
             </div>
           </el-dialog>
         <!-- 上传excel -->
  </div>
</template>

<script>
// 查找到这个账号关联的 可能有很多[{orgCode,roleCode},{orgCode,roleCode},{orgCode,roleCode}]
// 不好展示  因为 不知道你选择是哪个年级 哪个班级 如果都选怎么办 会很乱
// 角色列表中展示  是否选中 以及点击选择 就提交一个

import {
  getTeacherById,
  checkTeacherInfo,
  editTeacherInfo,
  getOrgByParentId,
  queryTeacherByPage,
} from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      formDialog: false,
      excelDialogVisible:false,
      multipleSelection:[],
      tableData: [],
      staticForm: {
        title: "添加",
      },
      form: {
        ope: 1,
        id: "",
        state: 0,
        no: "",
        name: "",
        gender: "1",
        height: "",
        weight: "",
        schoolCode: "",
        phone: "",
        pic: '',
        isRegiste: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        no: [{ required: true, message: "请输入工号", trigger: "blur" }],
        //   height: [{ type: 'number', message: "请输入正确的格式", trigger: "blur" }],
        //   weight: [{ type: 'number', message: "请输入正确的格式", trigger: "blur" }],
        schoolCode: [{ required: true, message: "请选择学校", trigger: "change" }],
        phone: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
        // pic: [{ required: true, message: "请上传照片", trigger: "blur" }],
       
      },
      // 查询账号所需参数
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
      },
      total: 0,
      schoolList:[]
    };
  },
  methods: {
   onChangeFile(file,fileList){
    this.form.pic = fileList;
   },
  //  fileList 需要上传的文件列表  file 上传的文件 file.raw raw 是文件
   onRemoveFile(file,fileList){
      this.form.pic = fileList;
   },
   // 将表格多选的值 赋值给multipleSelection  
    handleSelectionChange(val){
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
    // 条件查询初始化  将分页查询中的条件置空
    handleResetSearch(){
        this.queryParams.name =''
    },
    //点击查询按钮 发送分页查询请求
    handleSearchList(){
       this.queryParams.currentPage =1
       this.reqQueryByPages();
    },
    //表单信息初始化 
    resetForm(){
      this.form = {
        ope: 1,
        id: "",
        state: 0,
        no: "",
        name: "",
        gender: "1",
        height: "",
        weight: "",
        schoolCode: "",
        phone: "",
        pic: '',
        isRegiste: "",
      }
    },
    //增加信息弹框
    alertAdd() {
      this.resetForm()
      this.staticForm.title = "添加教师信息";
      this.formDialog = true;
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    //修改信息弹框
    async alertUpdate(id) {
      this.resetForm()
      this.staticForm.title = "修改教师信息";
      if(id) {
        try {
          const res = await getTeacherById({ val:id });
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
    // 删除信息请求
    async reqDelete(id) {
      let params = {
        id,
        ope: 0,
      };
      const res = await this.$confirm("此操作将会永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (res) {
        const editRes = await editTeacherInfo(params);
        if (editRes.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPages();
        }
      }
    },
    // 获取学校列表
     async reqGetOrgByParentId(parentId) {
      const res = await getOrgByParentId({ parentId });
      if (res.data.code == 100) {
        this.schoolList = res.data.data;
      }
    },
   //添加信息 修改信息 请求
    reqEditInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // let formData = new FormData();
          // for(let item in Object.keys(this.form)){
          //    if(item == 'pic'){
          //        formData.append(item,this.form[item][0].raw)
          //    }
          //    formData.append(item,this.form[item])
          // }
          const res = await editTeacherInfo(this.form);
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
    //批量审核 + 单个审核
    async batchPass(ope,id){
        let ids =[]
        // 判断是批量操作还是单个操作
        if(id){
           ids.push(id)
        }else{
          this.multipleSelection.forEach(item=>{
          ids.push(item.id)
        })
        }
      const res =   await checkTeacherInfo({ids,ope})
      if(res.data.code ==100){
         this.$message({
            type: "success",
            message: "操作成功",
          });
          this.reqQueryByPages();
      }
    },
    // 分页+条件查询
    async reqQueryByPages() {
      this.loading = true;
      try {
        const res = await queryTeacherByPage(this.queryParams);
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
   // 批量上传
    batchUpload(param){
        const formData = new FormData()
        formData.append('file', param.file);
        this.$axios.post('/uploadExcel',formData).then(()=>{
         this.$message({
           type:'success',
           message:'上传成功'
         })
         this.reqQueryStudentByPage()
        }).catch(()=>{
           this.$message({
           type:'error',
           message:'上传失败'
         })
        })
    }

   
  },
  mounted() {
    this.reqQueryByPages();
    this.reqGetOrgByParentId(-1);
  },
};
</script>

<style lang="scss" scoped>
.el-table__heade::v-deep .tableHeader {
  color: red;
  background-color: #fff;
}
</style>
>
