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
          <el-form-item label="用户名">
            <el-input type="text" v-model="selectAccountParams.name"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <el-input
              type="text"
              v-model="selectAccountParams.username"
            ></el-input>
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
             <el-button size='mini' @click="alertAddAccount">添加</el-button>
        </div>
    </el-card>
       <!-- 工具栏结束 -->
    <el-table
      v-loading="loading"
      :data="accountTable"
      border
      style="width: 100%"
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
      <el-table-column type="index" label="序号" width="60px">
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="width">
      </el-table-column>
      <el-table-column prop="username" label="账号" width="width">
      </el-table-column>
      <el-table-column prop="password" label="密码" width="width">
      </el-table-column>
      <el-table-column label="角色名称" width="width" prop="roleNames">
      </el-table-column>

      <el-table-column label="操作" width="width">
        <template slot-scope="scope">
          <el-button type="danger" size="small" @click="alertDeleteAccount(scope.row.id)"
            >删除</el-button
          >
          <el-button type="plain" size="small" @click="alertUpdateAccount(scope.row.id)"
            >编辑</el-button
          > 
        </template>
      </el-table-column>
    </el-table>

    <div style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="selectAccountParams.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>

    <!-- 编辑账号表单对话框开始 -->
    <el-dialog
      :title="staticAccountForm.title"
      :visible.sync="accountFormDialog"
      width="width"
    >
      <el-form :model="accountForm" ref="accountForm" :rules="accountFormRules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="accountForm.name"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="username">
          <el-input v-model="accountForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="accountForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="accountFormDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditAccountInfo()"
          >确 定</el-button
        >
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
  editAccountInfo,

  getAccountDetail,
} from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      accountFormDialog: false,
      //账号表格
      accountTable: [],
      staticAccountForm: {
        title: "添加账号",
      },
      // 账号表单
      accountForm: {
        //姓名
        name: "",
        username: "",
        ope: 1,
        password: "",
        state: 1,
        id: "",
      },
      accountFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      // 查询账号所需参数
      selectAccountParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
        username: "",
      },
      total: 0,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.selectAccountParams.currentPage = 1;
      this.selectAccountParams.pageSize = val;
      this.reqGetAccountByPages();
    },
    handleCurrentChange(val) {
      this.selectAccountParams.currentPage = 1;
      this.selectAccountParams.currentPage = val;
      this.reqGetAccountByPages();
    },
    handleResetSearch(){
        this.selectAccountParams.name =''
        this.selectAccountParams.username = ''
      
    },
    handleSearchList(){
       this.selectAccountParams.currentPage =1
             this.reqGetAccountByPages();
    },
    alertAddAccount() {
      this.staticAccountForm.title = "添加账号";
      this.accountForm = {
        name: "",
        username: "",
        ope: 1,
        password: "",
        state: 1,
        id: "",
      };
      this.accountFormDialog = true;
    },
    async alertUpdateAccount(id) {
      this.staticAccountForm.title = "修改账号";
      if(id) {
        try {
          const res = await this.reqGetAccountDetail({ id });
         console.log(res);
         
          
           this.accountFormDialog = true
          if (res.code == 100) {
            Object.assign(this.accountForm, res.data);
            this.accountForm.ope = 2;
            this.accountFormDialog = true;
          }
        } catch (error) {
          this.accountFormDialog = true;
        }
      }
    },
    async alertDeleteAccount(id) {
      let accountForm = {
 
        id,
        ope: 0,
     
      };
      const res = await this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (res) {
        const editRes = await editAccountInfo(accountForm);
        if (editRes.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqGetAllRoles();
        }
      }
    },
    reqEditAccountInfo() {
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
          this.reqGetAccountByPages();
        }
      });
    },
    async reqGetAccountDetail(id) {
      try {
        const res = await getAccountDetail(id);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    },
    async reqGetAccountByPages() {
      this.loading = true;
      try {
        const res = await getAccountByPage(this.selectAccountParams);
        if (res.data.code == 100) {
          this.accountTable = res.data.data;
          this.total = +res.data.dataTotal;
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    // 获取账号详情
    async reqGetAccountDesc() {},
    tableHeader() {
      return "tableHeader";
    },
  },
  mounted() {
    this.reqGetAccountByPages();
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
