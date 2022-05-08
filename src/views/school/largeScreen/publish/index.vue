<template>
  <div>
    <!-- 搜索开始 -->
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
          <el-form-item label="标题">
            <el-input type="text" v-model="queryParams.title"></el-input>
          </el-form-item>
          <el-form-item label="有效日期">
            <el-date-picker
              v-model="queryParams.startTime"
                 format="yyyy年 MM 月 dd 日"
            
              type="date"
              placeholder="开始日期"
            >
            </el-date-picker>
            -
            <el-date-picker
              v-model="queryParams.endTime"
                 format="yyyy 年 MM 月 dd 日"
    
              type="date"
              placeholder="结束日期"
            />
          </el-form-item>
          <el-form-item label="审核状态">
              <el-select v-model="queryParams.state" placeholder="">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 搜索结束-->
    <!-- 工具栏开始 -->
    <el-card shadow="never" style="margin: 15px 0">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div style="float: right; margin-right: 15px">
        <el-button size="mini" @click="alertAdd">添加</el-button>
      </div>
    </el-card>
    <!-- 工具栏结束 -->
     <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
   
      <el-table-column type="index" label="序号" width="60px">
     </el-table-column>
      <el-table-column prop="title" label="标题" width="width">
      </el-table-column>
      <el-table-column prop="startTime" label="开始日期" width="width">
      </el-table-column>
         <el-table-column prop="endTime" label="结束日期" width="width">
      </el-table-column>
      <el-table-column prop="msg" label="内容" width="width">
      </el-table-column>
      <el-table-column  label="审核状态" width="width">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.state ==2" type="success" >
                 审核通过
           </el-tag>
           <el-tag v-else-if="scope.row.state ==3" type="danger">
                  审核拒绝
           </el-tag>
            <el-tag  v-else type="info" >
                    待审核
           </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="alertUpdate(scope.row.id)">编辑</el-button>
          <el-button type="text" @click="reqDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div style="float: right">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
   
    <el-dialog
      width="70%"
      height="800px"
      :title="staticForm.title"
      :visible.sync="formDialog"
    >
      <el-form
        :model="form"
        label-position="left"
        ref="form"
        :rules="rulesForm"
        label-width="80px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="有效日期" prop="startTime">
          <el-date-picker
            v-model="form.startTime"
            format="yyyy 年 MM 月 dd 日"     
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
          -
          <el-date-picker
            v-model="form.endTime"
            format="yyyy 年 MM 月 dd 日"
            type="date"
            placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="内容" prop="msg">
           <el-input type="textarea" v-model="form.msg" placeholder=""></el-input>
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
  editMsgScreenInfo,
  getMsgScreenInfoById,
  getMsgScreenInfoByPage,
} from "@/api/index.js";
export default {
  name: "",

  data() {
    return {
      loading: true,
      formDialog: false,
      stateOptions:[{
        label:"提交后待审核",value:'1'
      },{
        label:"审核通过",value:'2'
      },{
        label:"审核退回",value:'3'
      },{
        label:"待提交",value:'4'
      },],
      scope: [
        { value: 1, label: "学校" },
        { value: 2, label: "年级" },
        { value: 3, label: "班级" },
      ],
      tableData:[],
      staticForm: {
        title: "添加",
      },
      form: {
        id: "",
        ope: "",
        state:'1',
        scope: "",
        title: "",
        msg: "",
        startTime: "",
        endTime: "",
      },
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        startTime: "",
        endTime: "",
        state: "",
      },
      rulesForm: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        startTime: [{ required: true, message: "请输入有效日期", trigger: "blur" }],

        msg: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      total: 1,
    };
  },
  methods: {
    onChangeFile(file, fileList) {
      this.form.pic = fileList;
    },
    //  fileList 需要上传的文件列表  file 上传的文件 file.raw raw 是文件
    onRemoveFile(file, fileList) {
      this.form.pic = fileList;
    },
    // 修改每页展示条数
    handleSizeChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.pageSize = val;
      this.reqQueryByPages();
    },
    // 修改页码
    handleCurrentChange(val) {
      this.queryParams.currentPage = 1;
      this.queryParams.currentPage = val;
      this.reqQueryByPages();
    },
    // 条件查询初始化  将分页查询中的条件置空
    handleResetSearch() {
      this.queryParams.title = "";
      this.queryParams.startTime = "";
      this.queryParams.endTime = "";
      this.queryParams.state = "";
    },
    //点击查询按钮 发送分页查询请求
    handleSearchList() {
      this.queryParams.currentPage = 1;
      this.reqQueryByPages();
    },
    //表单信息初始化
    resetForm() {
      this.form = {
        id: "",
        ope: 1,
        state:'1',
        title: "",
        msg: "",
        startTime: "",
        endTime: "",
      };
    },
    //增加信息弹框
    alertAdd() {
      this.resetForm();
      this.staticForm.title = "添加";
      this.formDialog = true;
      this.$nextTick(() => {
        this.$refs["form"].clearValidate();
      });
    },
    //修改信息弹框
    async alertUpdate(id) {
      this.staticForm.title = "修改";
      if (id) {
        try {
          const res = await getMsgScreenInfoById({ val:id });
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
    //添加信息 修改信息 请求
    reqEditInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          //   let formData = new FormData();
          // for (let item in Object.keys(this.form)) {
          //   if (item == "pic") {
          //     formData.append(item, this.form[item][0].raw);
          //   }
          //   formData.append(item, this.form[item]);
          // }
           console.log(editMsgScreenInfo,555555555);
           
          const res = await editMsgScreenInfo(this.form);
          if (res.data.code == 100) {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$refs.form.resetFields();
            this.formDialog = false;
          }
          this.reqQueryByPages();
        }
      });
    },
    // 删除信息请求
    async reqDelete(id) {
      let params = {
        id,
        ope: 0,
      };
      const res = await this.$confirm(
        "此操作将会永久删除该信息, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      );
      if (res) {
        const editRes = await editMsgScreenInfo(params);
        if (editRes.data.code == 100) {
          this.$message({
            type: "success",
            message: "删除成功",
          });
          this.reqQueryByPages();
        }
      }
    },
    // 分页+条件查询
    async reqQueryByPages() {
      this.loading = true;
      try {
        const res = await getMsgScreenInfoByPage(this.queryParams);
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
  },
  mounted(){
    this.reqQueryByPages()
  }
};
</script>

<style scoped lang="scss">
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
