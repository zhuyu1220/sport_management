<template>
  <div class="">
    <el-card shadow="never">
      <i class="el-icon-search"></i>
      <span>筛选搜索</span>
      <el-button style="float: right" @click="handleSearchList" size="small"
        >搜索</el-button
      >
      <el-button
        style="float: right; margin-right: 15px"
        @click="handleResetSearch()"
        size="small"
      >
        重置
      </el-button>
      <div style="margin-top: 15px">
        <el-form size="small" label-width="140px" inline>
          <el-form-item label="项目名称">
            <el-input type="text" v-model="queryParams.name"></el-input>
          </el-form-item>
          <el-form-item label="项目状态">
            <el-select v-model="queryParams.state" placeholder="" clearable>
              <el-option
                v-for="(item, index) in dropSelect"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card shadow="never" style="margin: 15px 0">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div style="float: right; margin-right: 15px">
        <!-- <el-button type="primary"  @click="excelDialogVisible = true"  size="mini"  icon="">批量导入</el-button> -->

        <el-button size="mini" @click="alertAdd">添加</el-button>
      </div>
    </el-card>

    <el-table
      :data="tableData"
      v-loading="loading"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
      <el-table-column prop="name" label="跑步项目" width="width" />
      <el-table-column prop="code" label="项目编号" width="width" />
      <el-table-column prop="des" label="备注" width="width" />
      <el-table-column label="状态" width="width">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.state == 1"> 在用 </el-tag>
          <el-tag type="danger" v-else-if="scope.row.state == 0">
            禁用
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

    <el-row type="flex" justify="end" :gutter="12">
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

    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialog"
      width="width"
    >
      <el-form
        label-width="100px"
        label-position="left"
        :model="form"
        ref="form"
        :rules="formRules"
      >
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
          <el-form-item label="项目编号" prop="name">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="项目状态">
          <el-radio v-model="form.state" :label="1">在用</el-radio>
          <el-radio v-model="form.state" :label="0">禁用</el-radio>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.des"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="reqEditInfo()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  editRaceBaseProject,
  queryRaceBaseProjectByPage,
  getRaceBaseProjectById,
} from "@/api/index.js";
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
          label: "损坏",
        },
      ],
      multipleSelection: [],
      staticUserForm: {
        title: "增加",
      },
      loading: false,
      formDialog: false,
      excelDialogVisible: false,
      staticForm: {
        title: "添加",
      },
      form: {
        ope: 1,
        id: "",
        state: 1,
        des: "",
        code: "",
        name: "",
      },
      tableData: [
        {
          ope: 1,
          id: "",
          state: 1,
          no: "",
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        state: "",
        name: "",
      },
      formRules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        state: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      total: 1,
    };
  },
  methods: {
    reqDelete(id) {
      this.$confirm("此操作将删除该角色, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await editRaceBaseProject({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPage();
        }
      });
    },
    // 条件查询初始化  将分页查询中的条件置空
    handleResetSearch() {
      this.queryParams.name = "";
      this.queryParams.state = "";
    },
    async alertUpdate(id) {
      this.staticForm = {
        title: "修改",
      };
      this.formDialog = true;
      console.log(getRaceBaseProjectById, 5689);

      if (id) {
        try {
          const res = await getRaceBaseProjectById({ id });
          if (res) {
            Object.assign(this.form, res.data.data);
            this.form.ope = 2;
            this.formDialog = true;
            this.$nextTick(() => {
              this.$refs["form"].clearValidate();
            });
          }
        } catch (error) {
          this.formDialog = true;
        }
      }
    },
    resetForm() {
      this.form = {
        ope: 1,
        id: "",
        state: 1,
        des: "",
        code: "",
        name: "",
      };
    },
    alertAdd() {
      this.resetForm();
      this.staticForm = {
        title: "增加",
      };
      this.formDialog = true;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    // 分页查询
    async reqQueryByPage() {
      this.loading = true;
      try {
        const res = await queryRaceBaseProjectByPage(this.queryParams);
        if (res.data.code == 100) {
          this.tableData = res.data.data;
          this.total = +res.data.dataTotal;
          this.loading = false;
        }
      } catch (err) {
        console.log(err);
        this.loading = false;
      }
    },
    //添加信息 修改信息 请求
    reqEditInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await editRaceBaseProject(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$refs.form.resetFields();
            this.formDialog = false;
          }
          this.reqQueryByPage();
        }
      });
    },
      handleSearchList() {
      this.queryParams.currentPage = 1;
      this.reqQueryByPage();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.pageSize = val;
      this.reqQueryByPage();
    },
    // 修改页码
    handleCurrentChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.currentPage = val;
      this.reqQueryByPage();
    },
  },
  mounted() {
    this.reqQueryByPage();
  },
};
</script>

<style lang="scss" scoped></style>
