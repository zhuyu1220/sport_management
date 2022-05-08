<template>
  <div>
     <el-card shadow="never" style="margin:15px 0">
         <i class="el-icon-tickets"></i>
        <span>数据列表</span>
          <div style="float:right">
        <!-- <el-button type="primary" size="mini" @click="goback()">返回学校</el-button> -->
        </div>
     </el-card>
      <el-table
          :data="allOrg"
              row-key="id"
          border
          default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          v-loading="loading"
          style="width: 100%">
         
            <el-table-column
              prop="name"
              label="名称"
              width="width">
          </el-table-column>
         
         
          <el-table-column label="操作">
             <template slot-scope="scope">
                 <el-button type="" size="mini" @click="alertAuthRole(scope.row.code)">关联角色</el-button>
                  <el-popover
                  ref="roleDescPopover"
                  placement="right"
                  title="角色详情"
                  width="200"
                  trigger="click"
                >
                  <el-table v-loading="roleLoading" :data="rolesAboutOrg" style="width: 100%">
                    <el-table-column prop="name" label="角色名称" width="width">
                    </el-table-column>
                    
                    <el-table-column label="操作" width="width">
                      <template slot-scope="scope2">
                        <el-popconfirm
                          title="确定删除该角色吗？"
                          @confirm="
                            reqDeleteRoleLinkOrg({
                              orgCode: scope.row.code,
                              orgId:scope.row.id,
                              roleId: scope2.row.id,
                            })
                          "
                        >
                          <el-button slot="reference" size="mini" type="text"
                            >删除</el-button
                          >
                        </el-popconfirm>
                         <el-button size="mini" type="text"  >关联账号</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    type=""
                    slot="reference"
                    @click="reqGetRolesByOrgId(scope.row.id)"
                    size="mini"
                    >角色详情</el-button
                  >
                </el-popover>
             </template>
          </el-table-column>
      </el-table>
      <el-dialog
      :title="staticRoleForm.title"
      :visible.sync="authRoleDialogVisible"
      width="width"
    >
   
      <el-form :model="roleForm" ref="roleForm" :rules="ruleForm">
        <el-form-item label="角色" prop="roleId" >
          <el-select multiple v-model="roleForm.roleId"  placeholder="">
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="authRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqRoleOrgLinkInfo">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 关联账号 -->
             <el-dialog
               title=""
               :visible.sync="accountVisible"
               width="width"
              >
               <div>
                 
                 <el-form ref="accountForm" :model="accountForm" label-width="80px">
                        <el-select v-model="model" placeholder="">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                 </el-form>
               </div>
               <div slot="footer">
                 <el-button @click="accountVisible = false">取 消</el-button>
                 <el-button type="primary" @click="accountVisible = false">确 定</el-button>
               </div>
             </el-dialog>


    <!-- 关联账号 -->
  </div>
</template>

<script>
import {
  getRolesByOrgId,
  editRoleOrgLinkInfo,
  getOrgByParentId,
  getAllOrg,
  accountLinkRoleOrg,
  getAccountByPage
} from "@/api/index.js";
function treeing(arr) {
  let tree = [];
  const map = {};
  for (let item of arr) {
    // 一个新的带children的结构
    let newItem = (map[item.id] = {
      ...item,
      children: [],
    });
    if (map[item.parentId]) {
      // 父节点已存进map则在父节点的children添加新元素
      let parent = map[item.parentId];
      parent.children.push(newItem);
    } else {
      // 没有父节点，在根节点添加父节点
      tree.push(newItem);
    }
  }
  return tree;
}
export default {
    name:'orgTable',
  data(){
      return{
      accountVisible:true,
      allOrg:[],
      allCount:[],
      loading: false,
      roleLoading:false,
      staticRoleForm: {
        title: "添加角色",
      },
      accountForm:{
          orgCode:"",
          roleCode:'',
          accountId:'',
          ope:'1'
      },
      ruleForm:{ roleId:[{required:true,message:'请选择角色',trigger:'change'}]},
      roleForm: {
        roleId: [],
        orgCode: "",
        ope: "",
      },
      rolesAboutOrg:[],
      org:[],
      authRoleDialogVisible:false,
      dialogFormVisible:false,
      curOrgLev:1,
      parentId:-1,
      }
  },
  props:['roles'],
 

  methods:{
    async reqGetAllOrg(){
     const res = await getAllOrg();
     this.allOrg = treeing(res.data.data);
    },
    async reqGetAllCount(){
       const res = await getAccountByPage({ currentPage: 1, pageSize: 200, name: "", username: "",});
       this.allOrg = treeing(res.data.data);
    },
     async reqDeleteRoleLinkOrg({ orgCode,orgId, roleId }) {
      const res = await editRoleOrgLinkInfo({ ope: 0, orgCode, roleId:[roleId] });
      if (res.data.code == 100) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.reqGetRolesByOrgId( orgId );
      }
    },
    alertAuthRole(orgCode) {
      this.roleForm = {
        roleId: "",
        ope: "1",
        orgCode,
      };
      this.staticRoleForm.title = "赋予角色";
      this.authRoleDialogVisible = true;
    },
    async reqGetOrgByParentId(parentId) {
      this.loading = true;
      this.parentId = parentId;
       try { 
         const res = await getOrgByParentId({ parentId });
        if (res.data.code == 100) {
          this.org = res.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;
      }
    },
     reqRoleOrgLinkInfo() {
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
            try{
             const res = await editRoleOrgLinkInfo(this.roleForm);
           if(res.data.code ==100){
                this.$message({
                type: "success",
                message: "操作成功",
            
              });
           }
                  this.authRoleDialogVisible = false;
            }catch(err){
                console.log(err);
                    this.authRoleDialogVisible = false;
                
            }
         
            
            
       
        }
      });
    },
    async reqGetRolesByOrgId(orgId) {
      this.roleLoading =true
      const res = await getRolesByOrgId({ val: orgId });
      try {
         this.rolesAboutOrg = res.data.data;
        if (res.data.code == 100) {
          this.rolesAboutOrg = res.data.data;
           this.roleLoading = false;
        } else {
           this.rolesAboutOrg = []
           this.roleLoading = false;
        }
      } catch (err) {
         this.roleLoading = false;
      }
   
    },
    queryLower(id){
      if(this.curOrgLev<4){
          this.curOrgLev +=1;
          console.log('curOrgLev', this.curOrgLev );
      }
       this.reqGetOrgByParentId(id) 
    },
    goback(){
      this.curOrgLev =1;
      this.reqGetOrgByParentId(-1)
    }
  },
  mounted(){
      //  this.reqGetOrgByParentId(-1)
         this.reqGetAllOrg()
         this.reqGetAllCount()
  }
}
</script>

<style>

</style>