<template>
  <div>
     <el-card>
        <el-button type="primary" @click="goback()">返回</el-button>
     </el-card>
      <el-table
          :data="org"
          style="width: 100%">
          <el-table-column
              prop="code"
              label="组织编码"
              width="width">
          </el-table-column>
            <el-table-column
              prop="id"
              label="组织id"
              width="width">
          </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="width">
          </el-table-column>
         
          <el-table-column
              width="width"
              label="设置">
              <template slot-scope="scope">
                 <el-button v-show="scope.row.lev !=3"  type="text" @click="queryLower(scope.row.id)"> 查看下级</el-button>
                 
                 <!-- <el-button v-show="scope.row.lev !=1" type="text" @click="reqGetOrgByParentId(scope.row.parentId)"> 返回上级</el-button> -->
              </template>
          </el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
                 <el-button type="" @click="alertAuthRole(scope.row.code)">关联角色</el-button>
                  <el-popover
                  ref="roleDescPopover"
                  placement="right"
                  title="角色详情"
                  width="200"
                  trigger="click"
                >
                  <el-table :data="rolesAboutOrg" style="width: 100%">
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
                          <el-button slot="reference" size="mini" type="danger"
                            >删除</el-button
                          >
                        </el-popconfirm>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    type=""
                    slot="reference"
                    @click="reqGetRolesByOrgId(scope.row.id)"
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
      <el-form :model="roleForm" ref="roleForm" :rules="rulesRoleForm">
        <el-form-item label="角色" prop="roleId">
          <el-select multiple v-model="roleForm.roleId" placeholder="">
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
  </div>
</template>

<script>
import {
  getRolesByOrgId,
  editRoleOrgLinkInfo,
  getOrgByParentId,
} from "@/api/index.js";
export default {
    name:'orgTable',
  data(){
      return{
      staticRoleForm: {
        title: "添加角色",
      },
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
      this.parentId = parentId;
      const res = await getOrgByParentId({ parentId });
       this.org = res.data.data;
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
      const res = await getRolesByOrgId({ val: orgId });
      if (res.data.code == 100) {
        this.rolesAboutOrg = res.data.data;
      }else{
        this.rolesAboutOrg = []
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
       this.reqGetOrgByParentId(-1)
  }
}
</script>

<style>

</style>