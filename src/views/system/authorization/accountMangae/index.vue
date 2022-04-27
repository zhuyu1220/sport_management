<template>
  <div class="wrapper">
    <el-card>
      <el-row type="flex" justify="space-between" align="middle">
        <el-button type="primary" @click="alertAddAccount">添加</el-button>
         <el-form label-position="left" label-width="60px" inline>
          <el-form-item label="姓名">
        <el-input type="text" v-model="selectAccountParams.name"></el-input> 
     </el-form-item>
      <el-form-item label="账号">
        <el-input type="text" v-model="selectAccountParams.username"></el-input> 
     </el-form-item>
     <e-form-item>
         <el-button type="">搜索</el-button>
     </e-form-item>
    </el-form>
    </el-row>
  </el-card>
      <el-table 
      v-loading="loading" 

      :data="accountTable" border style="width: 100%"  :headerCellStyle="{ background:'#C0C4CC'}"  :headerRowStyle="{color:'#000'}">
      <el-table-column prop="name" label="用户名" width="width">
      </el-table-column>
        <el-table-column prop="username" label="账号" width="width">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="width">
      </el-table-column>
      <el-table-column  label="角色名称" width="width" prop="roleNames">
      </el-table-column>
    
      <el-table-column label="操作" width="width">
           <template slot-scope="scope">
             <el-button type="primary" @click="alertDeleteAccount(scope.row.id)">删除</el-button>
              <el-button type="primary" @click="alertUpdateAccount(scope.row.id)">修改</el-button>
            </template>  
       </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" :gutter="10">
      <el-col :span="6">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="selectAccountParams.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout=" sizes, prev, pager, next, jumper,total"
       :total="total">
        </el-pagination>  
      </el-col>
    </el-row>
  
    <!-- 编辑账号表单对话框开始 -->
    <el-dialog
      :title="staticAccountForm.title"
      :visible.sync="accountFormDialog"
      width="width">
      <el-form :model="accountForm" ref="accountForm" :rules="accountFormRules">
        <el-form-item label="用户名" prop="name" >
          <el-input v-model="accountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号"  prop="username">
          <el-input v-model="accountForm.username"></el-input>
        </el-form-item>
          <el-form-item label="密码" prop="password" >
          <el-input v-model="accountForm.password"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer">
        <el-button @click="accountFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditAccountInfo()">确 定</el-button>
      </div>
    </el-dialog>
   
  </div>
</template>

<script>
// 查找到这个账号关联的 可能有很多[{orgCode,roleCode},{orgCode,roleCode},{orgCode,roleCode}]
// 不好展示  因为 不知道你选择是哪个年级 哪个班级 如果都选怎么办 会很乱
// 角色列表中展示  是否选中 以及点击选择 就提交一个 

import {
  getAccountByPage,
  editAccountInfo,accountLinkRoleOrg,getAccountDetail
} from "@/api/index.js";
export default {
  data() {
    return {
      loading:true,
      accountFormDialog:false,
      //账号表格
      accountTable: [
  
      ],
      staticAccountForm: {
        title:'添加账号'
      },
      // 账号表单 
      accountForm: {
        //姓名
        name: "",
        username:'',
        ope: 1,
        password: "",
        state: 1,
        id:''
      
      },
      accountFormRules:{
           name:[
             {required:true,message:'请输入用户名',trigger:'blur'},
           ],
           username:[
               {required:true,message:'请输入账号',trigger:'blur'},
           ],
           password:[
               {required:true,message:'请输入密码',trigger:'blur'},
           ]
      },
      // 查询账号所需参数
       selectAccountParams:{
          "currentPage":1,
          "pageSize":10,

       },
       total:0
    
    };
  },
  methods: {
    handleSizeChange(val){
        this.selectAccountParams.pageSize = val;
    },
    handleCurrentChange(val){
      this.selectAccountParams.currentPage = val;
    },
    alertAddAccount() {
      this.staticAccountForm.title= '添加账号';
      this.accountForm={
        name: "",
        username:'',
        ope: 1,
        password: "",
        state: 1,
        id:''
      }
     this.accountFormDialog=true
    
    },
    async alertUpdateAccount(id) {
       this.staticAccountForm.title= '修改账号';
      const res = await this.reqGetAccountDetail({id})
     console.log(res,111111111)
         Object.assign(this.accountForm,res.data)
      
      this.accountForm.ope=2
      this.accountFormDialog=true
    
    },
  
   async alertDeleteAccount(id){
      let accountForm = {
        name: "",
        id,
        ope: 0,
        state: 1,
      };
      const res = await this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (res) {
        const editRes = await editRole(accountForm);
        if (editRes.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqGetAllRoles();
        }
      }
    },
    reqEditAccountInfo(){
      this.$refs.accountForm.validate(async (valid) => {
        if (valid) {
         const res = await editAccountInfo(this.accountForm);
          if (res.data.code == 100) {
            this.$message({
                type: "success",
                message: "操作成功",
              });
            this.accountFormDialog = false;
          }
          this.reqGetAccountByPages()
        }
      }); 
    },
    async reqGetAccountDetail(id){
       try{
         const res = await getAccountDetail(id)
         return res.data
       }catch(err){
          console.log(err);
          
       }
    },
    async reqGetAccountByPages() {
      const res = await getAccountByPage(this.selectAccountParams);
      try{
        if (res.data.code == 100) {
         this.accountTable = res.data.data;
         this.tatal = res.data.data.dataTotal
      }
      }catch(err){
           console.log(err);
      }finally{
        this.loading =false
      }
     

    },
    // 获取账号详情
    async reqGetAccountDesc(){
          
    },
    tableHeader(){
      return 'tableHeader'
    }

  },
  mounted(){
    this.reqGetAccountByPages()
    
  }
};
</script>

<style lang="scss" scoped>
  .el-table__heade::v-deep .tableHeader{
    color:red;
    background-color: #fff;
  }
</style>>


