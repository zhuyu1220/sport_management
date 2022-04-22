<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button class="btn-add" @click="alertAdd()" size="mini">
        添加
      </el-button>
    </el-card>
    <div class="table-container">
      <el-table
        ref="menuTable"
        style="width: 100%"
        :data="list"
        v-loading="listLoading"
        border
      >
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="菜单名称" align="center">
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column label="菜单级数" width="100" align="center">
          <template slot-scope="scope">{{
            scope.row.level | levelFilter
          }}</template>
        </el-table-column>
        <el-table-column label="前端名称" align="center">
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="前端图标" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.icon }}</template>
        </el-table-column>
        <el-table-column label="是否显示" width="100" align="center">
          <template slot-scope="scope">
            {{ scope.row.hidden }}
          </template>
        </el-table-column>
        <el-table-column label="排序" width="100" align="center">
          <template slot-scope="scope">{{ scope.row.sort }}</template>
        </el-table-column>
        <el-table-column label="设置" width="120" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="handleShowNextLevel(scope.$index, scope.row)"
              >查看下级
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="text">授权 </el-button>
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="dialog-container">
      <el-dialog
        :title="staticForm.title"
        :visible.sync="menuDialogVisible"
        width="width"
      >
        <el-form
          :model="menu"
          :rules="rules"
          ref="menuForm"
          label-width="150px"
        >
          <el-form-item label="菜单名称：" prop="title">
            <el-input v-model="menu.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单：">
            <el-select v-model="menu.parentId" placeholder="请选择菜单">
              <el-option
                v-for="item in selectMenuList"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="前端名称：" prop="name">
            <el-input v-model="menu.name"></el-input>
          </el-form-item>
          <el-form-item label="前端图标：" prop="icon">
            <el-input v-model="menu.icon" style="width: 80%"></el-input>
            <svg-icon
              style="margin-left: 8px"
              :icon-class="menu.icon"
            ></svg-icon>
          </el-form-item>
          <el-form-item label="是否显示：">
            <el-radio-group v-model="menu.hidden">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input v-model="menu.sort"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="menuDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="reqEditMenuInfo()">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import {fetchList,deleteMenu,updateMenu,updateHidden} from '@/api/menu'
import {
  getMenuListByParentId,
  editMenuInfo,
  menuLinkRole,
  getRoleByMenuId,
} from "@/api";
export default {
  name: "menuList",
  data() {
    return {
      menuDialogVisible: true,
      list: null,
      listLoading: true,
      parentId: 0,
      staticForm: {
        title: "新增",
      },
      menu: {
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
  },
  created() {
    this.getList();
  },

  methods: {
    alertAdd() {
      (this.menu = {
        hidden: 0,
        icon: "",
        name: "",
        parentId: this.parentId,
        sort: 0,
        title: "",
        ope: 1,
      }),
        (this.staticForm.title = "添加");
      this.menuDialogVisible = true;
    },
    //修改当前菜单
    alertEdit(index, row) {
      (this.menu = {
        hidden: 0,
        icon: "",
        name: "",
        parentId: 0,
        sort: 0,
        title: "",
        id: row.id,
        ope: 2,
      }),
        (this.staticForm.title = "编辑");
      this.menuDialogVisible = true;
    },
    // 接口:编辑菜单信息
    async reqEditMenuInfo() {
      console.log(editMenuInfo);
      
      this.$refs.menuForm.validate(async (valid) => {
          if (!valid) {
            try {
              const res = await editMenuInfo(this.menu);
              if (res) {
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
                this.getList();
                this.menuDialogVisible = false;
              }
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
    //查看下级菜单
    handleShowNextLevel(index, row) {
      this.parentId = row.id;
      this.getList();
    },
    // 删除菜单
    handleDelete(index, row) {
      this.$confirm("是否要删除该菜单", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteMenu(row.id).then((response) => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000,
          });
          this.getList();
        });
      });
    },
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
};
</script>

<style scoped></style>
