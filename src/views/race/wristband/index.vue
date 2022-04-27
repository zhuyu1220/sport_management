<template>
  <div class="">

    <el-card>
      <el-form
        label-width="70px"
        label-position="left"
        inline
        style="display: flex"
      >
        <el-form-item label="手环号">
          <el-input type="text" v-model="queryParams.no"></el-input>
        </el-form-item>
        
        <el-form-item label="手环状态">
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

    <el-card>

      <el-row :gutter="24" justify="end" align="middle">
        <el-col :span="8">
          <el-button type="primary" @click="alertAdd">添加</el-button>
          <el-button type="primary" icon="el-icon-document">批量导入</el-button>
        </el-col>
      </el-row>

    </el-card>

    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="no" label="手环号" width="width">
      </el-table-column>
      <el-table-column label="手环状态" width="width">
        <template slot-scope="scope">
            <el-tag class="tap" :type="scope.row.state === '1' ? 'success' : 'danger'">
              {{ scope.row.state === '1' ? '在用' : '损坏' }}
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
        <el-form-item label="手环号" prop="no">
          <el-input v-model="form.no"></el-input>
        </el-form-item>
        <el-form-item label="手环状态">
          <el-radio v-model="form.state" :label="1">在用</el-radio>
          <el-radio v-model="form.state" :label="0">损坏</el-radio>
        </el-form-item>
     
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
 editWristbandInfo,queryWristbandByPage,getWristBandById
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
      formDialogVisible: false,
      userInfo: {},
   
      staticForm:{
        title:'添加'
      },
      form: {
        ope: 1,
        id: "",
        state: 1,
        // 手环号
        no:''
      },
      tableData: [
        {
        ope: 1,
        id: "",
        state: 1,
        no:'',
        },
      ],
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        state: 1,
        // 手环号
         no:''
      },
      formRules: {
        no: [{ required: true, message: "请输入", trigger: "blur" }],
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
        const res = await editStudentInfo({ id, ope: 0 });
        if (res.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryStudentByPage();
        }
      });
    },
    alertUpdate() {
      this.staticForm = {
        title: "修改",
      };
      this.formDialogVisible = true;
      // 将查询到的数据回显
      const res = this.getWristBandById();
      if (res.data.code == 100) {
        Object.assign(this.form, res.data.data);
        this.form.ope = 1;
      }
    },
    alertAdd() {
      this.staticForm = {
        title: "增加",
      };
      this.userForm = {
        ope: 1,
        id: "",
        state: 1,
        no:''
      };

      this.formDialogVisible = true;
    },
    // 分页查询
    async reqQueryByPage() {
      const res = await queryWristbandByPage(this.queryParams);
      this.total = res.data.dataSize;
      this.tableData = res.data.data;
    },
    async reqSubmitForm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await editWristbandInfo(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.reqQueryByPage();
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
.avatar-uploader::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
