<template>
  <div>
    <el-card  shadow="never" style="margin-bottom:15px">
         <i class="el-icon-tickets"></i>
        <span>数据列表</span>
         <div style="float:right">
         <el-button type="primary" size="mini" @click="alertAddRole()">添加角色</el-button>
           </div>
    </el-card>
    <el-table   v-loading="loading" :data="allRolesTable" style="width: 100%">
      <el-table-column
        header-align="center"
    
         type="index"
        label="序号" >
      </el-table-column>
      <el-table-column prop="name" align="center"    label="角色名称" width="width">
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
           <!-- <el-button
            plain
            size="small"
            @click="alertAuthMenu({ id: scope.row.id })"
            >菜单授权</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="staticEditForm.title"
      :visible.sync="editFormDialogVisible"
      width="width"
    >
      <el-form :model="editForm" :rules="{name:[{required:true,message:'请输入角色名称',trigger:'blur'}]}" ref="editForm">
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

<!-- 
     <el-dialog
       title="菜单授权"
       :visible.sync="authMenuDialogVisible"
       width="width"
     >
       
          <el-form
     
          ref="menuForm"
          label-width="150px"
        >
  
          <el-form-item label="菜单" prop="parentId" >
           <el-cascader
             :options="menu"
             v-model="menuForm.menuId"
             :show-all-levels="false"
             collapse-tags
            :props="{  
       
               label:'title',
               value:'id',
               multiple:true,
               }"
             clearable></el-cascader>
          </el-form-item>
        </el-form>
       <div slot="footer">
         <el-button @click="authMenuDialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="reqMenuLinkRole">确 定</el-button>
       </div>
     </el-dialog> -->

    <el-dialog
      title="关联账号"
      :visible.sync="accountDialogVisible"
      width="width"
  
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
  menuLinkRole
} from "@/api/index.js";
import orgTable from '@/views/system/authorization/roleManage/orgTable'
function children2Null(tree){
  tree.map(item => {
    if (Array.isArray(item.children)) {
      item.children.length === 0
        ? (item.children = null)
        : children2Null(item.children)
    }
  })
  return tree
}
export default {
  components:{
     orgTable
  },
  data() {
    return {

      accountDialogVisible: false,
      editFormDialogVisible: false,
      authMenuDialogVisible :true,
      loading:false,
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
      // 授权菜单
      menuForm:{
        menuId:[],
        roleCode:'',
        ope:1
      },
   
    };
  },
  computed: {
    // menu(){
    //       // 得到的树状结构chilren若为[],置为空

    //   return children2Null(this.$store.state.permission.menu) 
    // }
  },
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
      this.$nextTick(()=>{
         this.$refs['editForm'].clearValidate()
      })
    },
    //修改角色 初始化信息
    async alertEditRole(item) {
      this.staticEditForm.title = "修改角色";
      const res = await getRoleById({id:item.id})
      if(res.data.code == 100){
         Object.assign(this.editForm,res.data.data)
      }
      this.editForm.ope = 2,
        this.$nextTick(()=>{
         this.$refs['editForm'].clearValidate()
      })
      this.editFormDialogVisible = true;
    },
    // 菜单授权
   async  alertAuthMenu(row){
     this.menuForm.roleCode = row.id
     this.menuForm.ope = 1
        // menuForm
        this.authMenuDialogVisible = true
   },
  //  角色关联菜单
   async reqMenuLinkRole(){
      let temp =[]
      this.menuId.forEach(item => {
          temp.push(...item)
      });
      this.form.menuId = [...new Set(temp)]
      try{
          await  menuLinkRole(this.menuForm);
      }catch(err){
        console.log(err);
        
      }
   
     
     
   },
  //  查询角色所有菜单

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
        }else{
           this.reqGetAllRoles();
        }
      }
    },
    // 查询所有角色
    async reqGetAllRoles() {
      this.loading = true;
       try {
             const res = await getAllRoles();
        if (res.data.code == 100) {
            this.allRolesTable = res.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;
      }
    },
    reqAddRole() {
      this.$refs.editForm.validate(async (valid) => {
        if (valid) {
          const res = await editRole(this.editForm);
       
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
    this.reqGetAllRoles();
  },
};
</script>

<style scoped lang="scss">

.linkAccount .el-select {
  width: 378px;
}
</style>
