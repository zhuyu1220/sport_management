<template>
  <div class="wrapper">
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
          <el-form-item label="姓名">
            <el-input type="text" v-model="queryParams.name"></el-input>
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
        <el-button
          type="success"
          @click="batchPass(1)"
          size="mini"
          :disabled="multipleSelection.length < 1"
          icon="el-icon-s-check"
          >批量通过</el-button
        >
        <el-button
          type="warning"
          @click="batchPass(2)"
          size="mini"
          :disabled="multipleSelection.length < 1"
          icon="el-icon-s-check"
          >批量拒绝</el-button
        >
      </div>
    </el-card>
    <!-- 工具栏结束 -->
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60px">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
      <el-table-column label="照片" width="width">
        <template scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.pic"
            fit="contain "
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="身高" width="width">
      </el-table-column>
      <el-table-column prop="weight" label="体重" width="width">
      </el-table-column>
      <el-table-column prop="phone" label="联系方式" width="width">
      </el-table-column>
      <el-table-column label="审核状态" width="width">
        <template slot-scope="scope">
          {{ scope.row.state }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="batchPass(1, scope.row.id)"
            >通过</el-button
          >
          <el-button type="text" @click="batchPass(2, scope.row.id)"
            >拒绝</el-button
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
  </div>
</template>

<script>
import { checkVistorInfo, queryVisitorByPage } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,

      multipleSelection: [],
      tableData: [],

      // 查询账号所需参数
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        name: "",
      },
      total: 0,
    };
  },
  methods: {
    //批量审核 + 单个审核
    async batchPass(ope, id) {
      let ids = [];
      // 判断是批量操作还是单个操作
      if (id) {
        ids.push(id);
      } else {
        this.multipleSelection.forEach((item) => {
          ids.push(item.id);
        });
      }
      const res = await checkVistorInfo({ ids, ope });
      if (res.data.code == 100) {
        this.$message({
          type: "success",
          message: "操作成功",
        });
        this.reqQueryByPages();
      }
    },
    // 将表格多选的值 赋值给multipleSelection
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      this.queryParams.name = "";
    },
    //点击查询按钮 发送分页查询请求
    handleSearchList() {
      this.queryParams.currentPage = 1;
      this.reqQueryByPages();
    },
    //表单信息初始化
    resetForm() {
      this.form = {
        ope: 1,
        id: "",
        state: 0,
        no: "",
        name: "",
        gender: "1",
        height: "",
        weight: "",
        schoolCode: "",
        phone: "",
        pic: [],
        isRegiste: "",
      };
    },
    // 分页+条件查询
    async reqQueryByPages() {
      this.loading = true;
      try {
        const res = await queryVisitorByPage(this.queryParams);
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
  mounted() {
    this.reqQueryByPages();
  },
};
</script>

<style lang="scss" scoped>
.el-table__heade::v-deep .tableHeader {
  color: red;
  background-color: #fff;
}
</style>
>
