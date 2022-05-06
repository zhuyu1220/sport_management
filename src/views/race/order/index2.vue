<template>
  <div class="">
   <!--  搜索栏开始 -->
    <el-card>
      <el-form
        label-width="70px"
        label-position="left"
        inline
        style="display: flex"
      >
        <el-form-item label="用户名">
          <el-input type="text" v-model="queryParams.username"></el-input>
        </el-form-item>
        
        <el-form-item label="账号状态">
            <el-select v-model="queryParams.state" placeholder="">
            <el-option
              v-for="(item, index) in dropSelect"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="reqQueryByPage">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
   <!-- 搜索栏结束 -->
   <!-- 工具栏开始 -->
    <el-card>

      <el-row :gutter="24" justify="end" align="middle">
        <el-col :span="8">
          <el-button type="primary" @click="alertAdd">添加</el-button>
          <!-- <el-button type="primary" icon="el-icon-document">批量导入</el-button> -->
        </el-col>
      </el-row>

    </el-card>
    <!-- 工具栏结束 -->
    <!-- 数据展示栏开始 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="username" label="用户名" width="width"/>
       <el-table-column prop="password" label="密码" width="width"/>
       <el-table-column prop="password" label="备注" width="width"/>
   
      <el-table-column label="账号状态" width="width">
        <template slot-scope="scope">
            <el-tag class="tap" :type="scope.row.state === '1' ? 'success' : 'danger'">
              {{ scope.row.state === '1' ? '在用' : '禁用' }}
            </el-tag>
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
        </template>
      </el-table-column>
    </el-table>
     <!-- 数据展示栏结束 -->
   <!-- 分页开始 -->
    <el-row type="flex" justify="end" :gutter="25">
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
   <!-- 分页结束 -->
   <!-- 编辑框开始 -->
    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialogVisible"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="form"
        ref="form"
        :rules="formRules"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="账号状态">
          <el-radio v-model="form.state" :label="1">在用</el-radio>
          <el-radio v-model="form.state" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.des"></el-input>
        </el-form-item>
     
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
     <!-- 编辑框结束 -->
  </div>
</template>

<script>
import {getOrderAccountById,editOrderAccount,queryOrderAccountByPage} from "@/api/index.js";
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
          label: "禁用",
        },
      ],
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      formDialogVisible: false,
      userInfo: {},
   
      staticForm:{
        title:'添加'
      },
      form: {
        ope: 1,
        id: "",
        state: 1,
        username:'',
        password:'',
        des:'',
      },
      tableData: [
        {  
          id: "",
          state: 1,
          username:'',
          password:'',
          des:'',
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        state: 1,
        username:''
      },
      formRules: {
        username: [{ required: true, message: "请输入", trigger: "blur" }],
        password: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      total: 1,
    };
  },
  methods: {
    reqDelete(id) {
      this.$confirm("此操作将永久删除此信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await editOrderAccount({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPage();
        }
      });
    },
   async  alertUpdate(id) {
      this.staticForm = {
        title: "修改",
      };
      // 将查询到的数据回显
      try {
          const res = await this.getOrderAccountById({id});
       if (res.data.code == 100) {
        Object.assign(this.form, res.data.data);
        this.form.ope = 1;
        this.formDialogVisible = true;
      }
      } catch (error) {
        console.log(error);
        
         this.formDialogVisible = true;
      }
   
      
    },
    alertAdd() {
      this.staticForm = {
        title: "增加",
      };
      this.form = {
        id: "",
        state: 1,
        username:'',
        password:'',
        des:'',
      };

      this.formDialogVisible = true;
    },
    // 分页查询
    async reqQueryByPage() {
      const res = await queryOrderAccountByPage(this.queryParams);
      this.total = res.data.dataSize;
      this.tableData = res.data.data;
    },
    async reqSubmitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
          const res = await editOrderAccount(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.formDialogVisible=false;
            this.reqQueryByPage();
          }
          } catch (error) {
            console.log(error);
         
          }
        }
      });
    },    
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.queryParams.pageSize = val;
      this.reqQueryByPage();
    },
    handleCurrentChange(val) {
      this.queryParams.currentPage = val;
      this.reqQueryByPage();
    },
  },
  mounted() {
    // this.reqQueryByPage();
  },
};
</script>

<style lang="scss" scoped>

</style>
