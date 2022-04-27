<template>
  <div>
    <el-button type="primary" @click="alertAddRole()">添加角色</el-button>
    <el-table :data="allRolesTable" style="width: 100%">
      <el-table-column prop="name" label="角色名称" width="width">
      </el-table-column>
      <el-table-column label="操作" width="width">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            @click="alertDelete(scope.row.id)"
            >删除</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="alertEditRole({ id: scope.row.id })"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="staticEditForm.title"
      :visible.sync="editFormDialogVisible"
      width="width"
    >
      <el-form :model="editForm" :rules="{name:[{required:true,message:'请输入角色名称',trigger:blur}]}" ref="editForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqAddRole">确 定</el-button>
      </div>
    </el-dialog>

    <org-table :roles='allRolesTable'></org-table>




    <el-dialog
      title="关联账号"
      :visible.sync="accountDialogVisible"
      width="width"
      :before-close="dialogBeforeClose"
    >
      <div class="linkAccount">
        <el-select
          filterable
          v-model="accountOfRoles"
          multiple
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in accountTable"
            :key="index"
            :value="item.name"
          >
            <el-row type="flex" justify="space-between">
              <div>姓名： {{ item.name }}</div>
              <div>用户名： {{ item.username }}</div>
            </el-row>
          </el-option>
        </el-select>
        <el-button type="primary" @click="reqAcountLinkRole">关联</el-button>
        <el-table
          :data="accountTable"
          border
          style="width: 100%"
          :headerCellStyle="{ background: '#C0C4CC' }"
          :headerRowStyle="{ color: '#000' }"
        >
          <el-table-column prop="name" label="用户名" width="width">
          </el-table-column>
          <el-table-column prop="username" label="账号" width="width">
          </el-table-column>

          <el-table-column label="操作" width="width">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click="addAccountOfRole(scope.row.account)">关联</el-button> -->
              <el-button
                type="danger"
                size="mini"
                @click="deleteAccountOfRole(scope.row.account)"
                >取消关联</el-button
              >
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
              layout="  prev, pager, next"
              :total="total"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
      <div slot="footer">
        <el-button @click="accountDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="accountDialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  editRole,
  getRoleById,
  getAllRoles,
} from "@/api/index.js";
import orgTable from '@/views/system/authorization/roleManage/orgTable'
export default {
  components:{
     orgTable
  },
  data() {
    return {

      accountDialogVisible: false,
      editFormDialogVisible: false,
 
      allRolesTable: [],
      staticEditForm: {
        title: "添加角色",
      },
      editForm: {
        name: "",
        id: "",
        ope: "",
        state: 1,
      },
      // 关联账号
      accountOfRoles: [],
      //账号表格
      accountTable: [],
      selectAccountParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
        username: "",
      },
      //  关联账号接口所需要的参数
      accountOfRolesParams: {
        orgId: "",
        roleId: "",
        accountId: [],
      },
    };
  },
  computed: {},
  methods: {
    //添加角色 初始化信息
    alertAddRole() {
      this.staticEditForm.title = "添加角色";
      this.editForm = {
        name: "",
        id: 1,
        ope: 1,
        state: 1,
      };
      this.editFormDialogVisible = true;
    },
    //修改角色 初始化信息
    async alertEditRole(item) {
      this.staticEditForm.title = "修改角色";
      const res = await getRoleById({id:item.id})
      if(res.data.code == 100){
         Object.assign(this.editForm,res.data.data)
      }
      this.editForm.ope = 2,
      this.editFormDialogVisible = true;
    },
    // 删除角色
    async alertDelete(roleId) {
      let form = {
        name: "",
        id: roleId,
        ope: 0,
        state: 1,
      };
      const res = await this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      if (res) {
        const editRes = await editRole(form);
        if (editRes.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqGetAllRoles();
        }
      }
    },
    // 查询所有角色
    async reqGetAllRoles() {
      const res = await getAllRoles();
      if (res.data.code == 100) {
        this.allRolesTable = res.data.data;
      }
    },
    reqAddRole() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const res = await editRole(this.editForm);
          console.log(res, 453435);
          if (res.data.code == 100) {
            if (this.editForm.ope == 1) {
              this.$message({
                type: "success",
                message: "添加成功",
              });
            } else {
              this.$message({
                type: "success",
                message: "修改成功",
              });
            }
            this.editFormDialogVisible = false;
            this.reqGetAllRoles();
          }
        }
      });
    },

    handleSizeChange(val) {
      this.selectAccountParams.pageSize = val;
    },
    handleCurrentChange(val) {
      this.selectAccountParams.currentPage = val;
    },
    // 关联账号 需要组织id 角色id  账号id是数组
    alertAcountLinkRole({ roleId, orgId }) {
     this.accountOfRoles = []
      this.accountDialogVisible = true
      //  查询 当前角色 所关联的账号
   
    },
    reqAcountLinkRole(){
      if(this.accountOfRoles.length<1){
        this.$message({
          type:'error',
          message:'请选择账号'
        })
      }
    }
   
  },

  mounted() {
    console.log("111");

    this.reqGetAllRoles();

    //查询组织机构信息
    this.reqGetOrgByParentId().then((res) => {
      this.reqGetGradeOrg(res[0].id);
    });
  },
};
</script>

<style scoped lang="scss">

.linkAccount .el-select {
  width: 378px;
}
</style>
