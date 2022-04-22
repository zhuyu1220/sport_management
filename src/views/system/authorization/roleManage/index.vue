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
      <el-form :model="editForm" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqAddRole">确 定</el-button>
      </div>
    </el-dialog>

    <el-card class="roleWrapper" header="赋予角色">
      <div class="orgWrapper">
        <!-- 学校组织 -->
        <div class="panel">
          <ul>
            <li class="active" v-for="item in orgInfo.school" :key="item.id">
              {{ item.name }}
              <div>
                <el-button type="" @click="alertAuthRole(item.id)"
                  >赋予角色</el-button
                >
                <el-popover
                  ref="roleDescPopover"
                  placement="right"
                  title="角色详情"
                  width="300px"
                  trigger="click"
                >
                  <el-table :data="rolesAboutOrg" style="width: 100%">
                    <el-table-column prop="name" label="角色名称" width="100px">
                    </el-table-column>
                    <el-table-column label="操作" width="200px">
                      <template slot-scope="scope">
                        <el-popconfirm
                          title="确定删除该角色吗？"
                          @confirm="
                            reqDeleteRoleLinkOrg({
                              orgCode: item.id,
                              roleId: scope.row.id,
                            })
                          "
                        >
                          <el-button slot="reference" size="mini" type="danger"
                            >删除</el-button
                          >
                        </el-popconfirm>
                        <el-button
                          type="primary"
                          @click="
                            alertAcountLinkRole({
                              roleId: scope.row.id,
                              orgId: item.id,
                            })
                          "
                          size="mini"
                        >
                          关联账号
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    type=""
                    slot="reference"
                    @click="reqGetRolesByOrgId(item.id)"
                    >角色详情</el-button
                  >
                </el-popover>
              </div>
            </li>
          </ul>
        </div>
        <!-- 学校组织 -->
        <!-- 年级组织 -->
        <div class="panel">
          <ul>
            <li
              class="item"
              :class="currentIndex == index ? 'active' : ''"
              v-for="(item, index) in orgInfo.grade"
              :key="item.id"
            >
              {{ item.name }}
              <div>
                <el-button type="" @click="alertAuthRole(item.id)"
                  >赋予角色</el-button
                >
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
                      <template slot-scope="scope">
                        <el-popconfirm
                          title="确定删除该角色吗？"
                          @confirm="
                            reqDeleteRoleLinkOrg({
                              orgCode: item.id,
                              roleId: scope.row.id,
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
                    @click="reqGetRolesByOrgId(item.id)"
                    >角色详情</el-button
                  >
                </el-popover>
                <el-button
                  type="text"
                  icon="el-icon-zoom-in"
                  @click="reqGetClassOrg(item.id, index)"
                ></el-button>
              </div>
            </li>
          </ul>
        </div>
        <!-- 年级组织 -->
        <!-- 班级组织 -->
        <div class="panel">
          <ul>
            <li class="item" v-for="item in orgInfo.class" :key="item.id">
              {{ item.name }}
              <div>
                <el-button type="" @click="alertAuthRole(item.id)"
                  >赋予角色</el-button
                >
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
                      <template slot-scope="scope">
                        <el-popconfirm
                          title="确定删除该角色吗？"
                          @confirm="
                            reqDeleteRoleLinkOrg({
                              orgCode: item.id,
                              roleId: scope.row.id,
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
                    @click="reqGetRolesByOrgId(item.id)"
                    >角色详情</el-button
                  >
                </el-popover>
              </div>
            </li>
          </ul>
        </div>
        <!-- 班级组织 -->
      </div>
    </el-card>

    <el-dialog
      :title="staticRoleForm.title"
      :visible.sync="authRoleDialogVisible"
      width="width"
    >
      <el-form :model="roleForm" ref="roleForm" :rules="rulesRoleForm">
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="roleForm.roleId" placeholder="">
            <el-option
              v-for="item in allRolesTable"
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
  getRolesByOrgId,
  editRoleOrgLinkInfo,
  getOrgByParentId,
} from "@/api/index.js";

export default {
  data() {
    return {
      // 设置选中组织样式
      currentIndex: 0,
      accountDialogVisible: false,
      editFormDialogVisible: false,
      authRoleDialogVisible: false,
      roleDescVisible: true,
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
      rulesRoleForm: {
        roleId: [{ required: true, message: "请选择角色", trigger: "change" }],
      },
      editFormRules: {
        name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
      },
      orgInfo: {
        school: [],
        grade: [],
        class: [],
      },
      rolesAboutOrg: [],
      staticRoleForm: {
        title: "添加角色",
      },
      roleForm: {
        roleId: "",
        orgId: "",
        ope: "",
      },
      // 关联账号
      accountOfRoles: [],
      //账号表格
      accountTable: [
        {
          name: "钱敬冬",
          password: "11111",
          roleNames: ["一年级年级主任,二年级年级主任"],
          state: "1",
          username: "18066051201",
        },
      ],
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
        id: "",
        ope: 1,
        state: 1,
      };
      this.editFormDialogVisible = true;
    },
    //修改角色 初始化信息
    alertEditRole() {
      this.staticEditForm.title = "修改角色";
      this.editForm = {
        name: "",
        id: "",
        ope: 2,
        state: 1,
      };
      this.editFormDialogVisible = true;
    },
    //当前组织机构赋予角色 初始化信息
    alertAuthRole(orgId) {
      this.roleForm = {
        roleId: "",
        ope: "1",
        orgId,
      };
      this.staticRoleForm.title = "赋予角色";
      this.authRoleDialogVisible = true;
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
    //查询当前机构下的所有角色
    async reqGetRolesByOrgId(orgId) {
      const res = await getRolesByOrgId({ val: orgId });
      if (res.data.code == 100) {
        this.rolesAboutOrg = res.data.data;
      }
    },
    // 当前机构添加角色
    reqRoleOrgLinkInfo() {
      this.$refs.roleForm.validate(async (valid) => {
        if (valid) {
          const res = await editRoleOrgLinkInfo(this.roleForm);
          if (res.data.code == 100) {
            if (this.roleForm.ope == 1) {
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
            this.authRoleDialogVisible = false;
          }
        }
      });
    },
    // 删除当前机构下的某个角色
    async reqDeleteRoleLinkOrg({ orgCode, roleId }) {
      const res = await editRoleOrgLinkInfo({ ope: 0, orgCode, roleId });
      if (res.data.code == 100) {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.reqGetRolesByOrgId({ val: orgCode });
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
    // 查询学校信息
    async reqGetOrgByParentId() {
      const res = await getOrgByParentId({ val: "-1" });
      if (res.data.code == 100) {
        this.orgInfo.school = res.data.data;
        return Promise.resolve(res.data.data);
        // this.reqGetGradeOrg(res.data.data[0].id)
      } else {
        return Promise.error("未获取到信息");
      }
    },
    // 查询年级信息
    async reqGetGradeOrg(parentId) {
      const res = await getOrgByParentId({ val: parentId });
      if (res.data.code == 100) {
        this.orgInfo.grade = res.data.data;
        return Promise.resolve(res.data.data);
      } else {
        return Promise.error("未获取到信息");
      }
    },
    // 查询班级信息
    async reqGetClassOrg(parentId, index) {
      this.currentIndex = index;
      console.log(index);

      const res = await getOrgByParentId({ val: parentId });
      if (res.data.code == 100) {
        this.orgInfo.class = res.data.data;
        return Promise.resolve(res.data.data);
      } else {
        return Promise.error("未获取到信息");
      }
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
.roleWrapper {
  margin-top: 20px;
}
.orgWrapper {
  display: flex;
}
.panel {
  margin-right: 50px;
  flex: 1;
  &::v-deep .el-icon-edit-outline,
  &::v-deep .el-icon-remove-outline,
  &::v-deep .el-icon-zoom-in,
  &::v-deep .el-icon-zoom-out {
    font-size: 24px;
  }

  ul {
    list-style: none;
    margin: 20px 0 0 0;
    padding: 0;
  }
  ul > li {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #dcdfe6;
    border-top: 0;
    padding: 0 15px;
  }
  ul li:nth-of-type(1) {
    border-top: 1px solid #dcdfe6;
  }
  ul .active {
    color: #409eff;

    //  outline:1px solid  #67C23A;
  }
}
.linkAccount .el-select {
  width: 378px;
}
</style>
