<template>
  <div class="">
    <el-card>    
       <el-form label-width="40px" label-position="left" inline style="display:flex" >
             <el-form-item label="姓名">
               <el-input type="text" v-model="queryParams.name"></el-input>
             </el-form-item>
              <el-form-item label="年级">
               <el-input type="text" v-model="queryParams.grade"></el-input>
             </el-form-item>
              <el-form-item label="班级">
               <el-input type="text" v-model="queryParams.class"></el-input>
             </el-form-item>
             <el-form-item >
                <el-button type="primary">搜索</el-button>
             </el-form-item>
           </el-form>
    </el-card>
          
    <el-card>
      <el-row :gutter="24" justify="end" align="middle" >
        <el-col :span="8">
          <el-button type="primary" @click="alertAdd">添加</el-button>
          <el-button type="primary" icon="el-icon-document">批量导入</el-button>
          <el-button type="success" :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量通过</el-button>
          <el-button type="warning" :disabled="multipleSelection.length<1" icon="el-icon-s-check">批量拒绝</el-button>
        </el-col>
      
      </el-row>
    </el-card>
    <el-table :data="tableData" style="width: 100%"   @selection-change="handleSelectionChange">
      
         <el-table-column
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column prop="classCode" label="年级" width="width">
      </el-table-column>
      <el-table-column prop="gradeCode" label="班级" width="width">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column prop="no" label="学号" width="width">
      </el-table-column>
      <el-table-column prop="height" label="身高" width="width">
      </el-table-column>
      <el-table-column prop="weight" label="体重" width="width">
      </el-table-column>
      <el-table-column prop="phone1" label="联系方式一" width="width">
      </el-table-column>
      <el-table-column prop="phone2" label="联系方式二" width="width">
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
            >通过</el-button
          >
           <el-button type="text"
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
       :total="total">
        </el-pagination>  
      </el-col>
     
    </el-row>
  
    <el-dialog
      :title="staticUserForm.title"
      :visible.sync="formDialogVisible"
      width="width"
    >
      <el-form label-width="100px" label-position="left" :model="userForm" ref="userform" :rules="formRules">
       <el-form-item label="学号" prop="no">
          <el-input v-model="userForm.no"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="照片上传">
          <div class="avatar-uploader">
          <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
         :on-preview="handlePictureCardPreview"
         :on-remove="handleRemove"
         :on-success="handleAvatarSuccess">
      <i class="el-icon-plus"></i>
     </el-upload>
      <el-dialog :visible.sync="dialogVisible">
         <img width="100%" :src="dialogImageUrl" alt="">
         </el-dialog>
          </div>
        </el-form-item>
        <el-form-item label="所属组织">
          <!-- 查询年级 根据学校的id -->
          <el-select clearable @change="reqGetGaradeByParentId(org.schoolCode.id)" v-model="org.schoolCode" placeholder="请输入选择学校">
            <el-option v-for="(item,index) in org.schoolArray" :key="index" :label="item.name" :value="item">
            </el-option>
          </el-select>
          <el-select @change="reqGetClassByParentId(org.gradeCode.id)"  v-model="org.gradeCode" placeholder="请选择年级">
              <el-option v-for="(item,index) in org.gradeArray" :key="index" :label="item.name" :value="item"/>
          </el-select>
          <el-select v-model="org.classCode" placeholder="请选择班级">
                   <el-option v-for="(item,index) in org.gradeArray" :key="index" :label="item.name" :value="item.code"/>
          </el-select>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
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
  </div>
</template>

<script>
import { getOrgsBySchoolId,editStudentInfo, checkStudentInfo, queryStudentByPage, getSutdentById,} from "@/api/index.js";
export default {
  data() {
    return {
      multipleSelection:[],
      staticUserForm: {
        title: "增加",
        user:'学生'
      },
      formDialogVisible: false,
      userInfo :{

      },
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
        pic: "",
        ope:'1'
      },
      formRules:{
           no:[
              {required:true,message:'请输入',trigger:'blur'},
            ],
            name:[
              {required:true,message:'请输入',trigger:'blur'},
            ],
            height:[
              {required:true,message:'请输入',trigger:'blur'},
            ],
             weight:[
              {required:true,message:'请输入',trigger:'blur'},
            ],
        
      },
      imageUrl:'',
      dialogImageUrl: '',
      dialogVisible: false,
      org: {
        schoolCode: "",
        gradeCode: "",
        classCode: "",
        schoolArray: [],
        gradeArray: [],
        classArray: [],
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
        grade: "",
        class: "",
        name: "",
      },
      total:1
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
    alertUpdate(){
     this.staticUserForm ={
        title: "修改",
        user:'学生'
      }
      this.reqUserDesc()
      this.userForm.ope =1
      this.formDialogVisible = true
    },
    alertAdd(){
    this.staticUserForm ={
        title: "增加",
        user:'学生'
      }
     this.userForm ={
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
        pic: "",
        ope:'1'
     }

      this.formDialogVisible = true
    },
    //查询学生详情
    async reqUserDesc(id){
      const res =await getSutdentById({id})
      Object.assign(this.userForm,res.data.data)
    },
    // 分页查询
    async reqQueryStudentByPage() {
      const res = await queryStudentByPage(this.queryParams);
      this.total = res.data.dataSize
      this.tableData = res.data.data;
    },
    async reqSubmitUserForm(){
      this.$refs.userform.validate(async valid=>{
        if(valid){
           const res = await this.userForm()
           if(res.data.code == 100){
           this.$message({
            type:"success",
            message:'操作成功'
          })
       }
        }
      }) 
    
    },
    async reqCheckStudentInfo(id){
       const res = checkStudentInfo(id)
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
       handleRemove(file, fileList) {
        console.log(file, fileList);
     },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
     },
     handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleSelectionChange(val){
           this.multipleSelection = val;
      },
      handleSizeChange(val){
        this.queryParams.pageSize = val;
     },
     handleCurrentChange(val){
        this.queryParams.currentPage = val;
    },
  },
  mounted(){
    this.reqQueryStudentByPage()
     this.reqGetSchoolByParentId({parentId:-1})
  }
 
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
