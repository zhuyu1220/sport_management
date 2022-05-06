<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <div style="float:right">
        <el-button class="btn-add" @click="alertAdd()" size="mini">
        添加
      </el-button>
      </div>
      
    </el-card>
    
    <div >
      <!-- 菜单栏展示 -->
    
         <!-- 菜单栏展示 -->
      <el-table
        ref="menuTable"
        style="width: 100%"
        :data="menu"
        v-loading="listLoading"
       row-key="id"
       :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        border
      >
        <!-- <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column> -->
       
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
         <el-table-column label="路由地址" align="center">
          <template slot-scope="scope">{{ scope.row.url }}</template>
        </el-table-column>
        <el-table-column label="前端图标" align="center">
          <template slot-scope="scope">{{ scope.row.icon }}</template>
        </el-table-column>
   
        <!-- <el-table-column label="是否显示" align="center">
          <template slot-scope="scope">
            {{ scope.row.hidden }}
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column> -->
        <!-- <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleShowNextLevel(scope.$index, scope.row)"
              >查看下级
            </el-button>
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
        
            <el-button
              size="mini"
              type="text"
              @click="alertEdit(scope.$index, scope.row)"
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="alertMenuLinkRole( scope.row)"
              >关联角色
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container">
      <!-- 菜单表单 -->
      <el-dialog
        :title="staticForm.title"
        :visible.sync="menuDialogVisible"
        width="width"
      >
        <el-form
          :model="form"
          :rules="rules"
          ref="menuForm"
          label-width="150px"
        >
          <el-form-item label="菜单名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单" prop="parentId" >
           <el-cascader
             :options="menu"
             v-model="form.parentId"
             :show-all-levels="false"
            :props="{  
              checkStrictly: true ,
              emitPath:false,
               label:'title',
               value:'id'
               
               }"
             clearable></el-cascader>
          </el-form-item>
          <el-form-item label="路由地址" prop="url">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item label="图标">
             <el-input v-model="form.icon"></el-input>
          </el-form-item>
         
          <!-- <el-form-item label="是否显示：">
            <el-radio-group v-model="menu.hidden">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="menu.sort"></el-input>
          </el-form-item>  -->
        </el-form>
        <div slot="footer">
          <el-button @click="menuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reqEditMenuInfo()">确定</el-button>
        </div>
      </el-dialog>
          <!-- 菜单表单 -->
          <!-- 菜单关联角色 -->
      <el-dialog
         title="关联角色"
        :visible.sync="linkRoleDislogVisibe"
        width="width"
      >
        <el-form
          label-width="150px"
        >
         <el-form-item label="角色" prop="title">
              <el-checkbox-group v-model="menuLinkRoleForm.roleId" >
            <el-checkbox v-for="role in allRoles" :label="role.id" :key="role.id">{{role.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="linkRoleDislogVisibe = false">取 消</el-button>
          <el-button type="primary" @click="reqMenuLinkRole()">确定</el-button>
        </div>
      </el-dialog>
          <!-- 菜单关联角色 -->
    </div>
  </div>
</template>

<script>
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
// import {fetchList,deleteMenu,updateMenu,updateHidden} from '@/api/menu'
import {
  getMenuListByParentId,
  editMenuInfo,
  menuLinkRole,
  getRoleByMenuId,
  queryByIdMenu,
  getMenuListAll,
   getAllRoles,
} from "@/api";
console.log(getAllRoles,555555555);

export default {
  name: "menuList",
  data() {
    return {
      menuDialogVisible: false,
      linkRoleDislogVisibe:false,
      list: [],
      listLoading: false,
      parentId: 0,
      staticForm: {
        title: "新增",
      },
      allRoles:[],
      menuLinkRoleForm:{
         roleId:[],
         menuId:'',
         ope:1

      },
      form:{
          parentId:26,
          title:'',
          url:'',
          icon:'',
          ope:1
      },
      menuTable: {
        hidden: 0,
        icon: "",
        name: "",
        parentId: 0,
        sort: 0,
        title: "",
        id: "",
        ope: 1,
      },
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入前端名称", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
        icon: [
          { required: true, message: "请输入前端图标", trigger: "blur" },
          {
            min: 2,
            max: 140,
            message: "长度在 2 到 140 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {
    selectMenuList() {
      return [{ id: this.parentId, title: "无上级菜单" }, ...this.list];
    },
    menu(){
          // 得到的树状结构chilren若为[],置为空

      return children2Null(this.$store.state.permission.menu) 
    }
  },
 
  
  methods: {
    
   async  reqMenuLinkRole(){
      const res = await  menuLinkRole(this.form)
      if(res.data.code ==100){
        this.message({
          type:'success',
          message:'操作成功'
        })
      }
      this.linkRoleDislogVisibe = false
    },
  async  alertMenuLinkRole(menuId){
       this.menuLinkRoleForm.menuId = menuId;
      //  查询该菜单 关联的角色列表
     const res  = await getRoleByMenuId({menuId})
     if(res.data.code == 100){
        this.menuLinkRoleForm.roleId = res.data.data.map((item)=>item.id)
     }
   
      this.linkRoleDislogVisibe= true;
    },
    alertAdd() {
      this.form = {
         parentId:'',
          title:'',
          url:'',
          icon:'',
          ope:1
      }
      this.staticForm.title = "添加"
      this.menuDialogVisible = true
      this.$nextTick(() => {
        this.$refs['menuForm'].clearValidate()
      })
    },
    //编辑弹窗
   async alertEdit(index, row) {
       this.staticForm.title = "编辑"
       this.menuDialogVisible = true
       
       try {
          const res = await queryByIdMenu({id:row.id });
          if (res) {
            Object.assign(this.form, res.data.data);
            this.form.ope = 2;
            this.formDialog = true;
             this.$nextTick(() => {
               this.$refs['menuForm'].clearValidate()
             })
          }
        } catch (error) {
          this.formDialog = true;
        }
    
    },
    // 提交
    async reqEditMenuInfo() {
      this.$refs.menuForm.validate(async (valid) => {
          if (!valid) {
            try {
              const res = await editMenuInfo(this.form);
              if(res){
                // 查询列表
                  this.$store.dispatch("permission/generateLeftMenu")
              }
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
   
                this.menuDialogVisible = false;
             
            } catch (error) {
              console.log(error);
            }
          }
        })
      
    
    },
    async getList() {
      this.listLoading = true;
      const res = await getMenuListByParentId(this.parentId);
      if (res) {
        this.listLoading = false;
        this.list = res.data.data.list;
      }
    },
 
    // 删除菜单
    handleDelete(index, row) {
      this.$confirm("是否要删除该菜单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        editMenuInfo({id:row.id,ope:0}).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
           this.$store.dispatch("permission/generateLeftMenu")
        });
      });
    },
    // 获取所有角色
   async  reqGetAllRoles(){
       const res  = await getAllRoles()
       this.allRoles = res.data.data

    }
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      } else if (value === 2) {
        return "三级";
      } else if (value === 3) {
        return "四级";
      }
    },
  },
  mounted(){
     this.reqGetAllRoles()
  }
};
</script>

<style scoped></style>
