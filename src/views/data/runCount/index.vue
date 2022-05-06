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
          <el-form-item label="工号/学号">
            <el-input type="text" v-model="queryParams.no"></el-input>
          </el-form-item>
          <el-form-item label="年级/班级">
            <org-info ref="orgInfo" @handlerChange="selectOrg"></org-info>
          </el-form-item>
          <el-form-item label="赛事名称">
             <el-input type="text" v-model="queryParams.raceName"></el-input>
          </el-form-item>
           <el-form-item label="项目名称">
             <el-input type="text" v-model="queryParams.projectName"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 搜索结束-->

    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%"
 
      :headerCellStyle="{ background: '#C0C4CC' }"
      :headerRowStyle="{ color: '#000' }"
    >
    
      <el-table-column type="index" label="排序"  width="60px">
      </el-table-column>
      <el-table-column type="index" prop="className" label="班级"  width="100px" >
      </el-table-column>
       <el-table-column prop="no" label="学号/工号" width="width">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="width">
      </el-table-column>
          <el-table-column prop="raceName" label="赛事名称" width="width">
      </el-table-column>
       <el-table-column prop="projectName" label="项目名称" width="width">
      </el-table-column>
      <el-table-column prop="rank" label="名次" width="width">
      </el-table-column>
      <el-table-column prop="reslut" label="成绩" width="width">
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
import OrgInfo from "@/components/OrgInfo";
import {  getUserRaceExercixeByPage } from "@/api/index.js";

export default {
  components: {
    OrgInfo,
  },
  data() {
    return {
      loading: false,

      multipleSelection: [],
      tableData: [],

      // 查询账号所需参数
      queryParams: {
        name: "",
        no: "",
        gradeCode: "",
        classCode: "",
        raceName: "",
        projectName: "",
        currentPage: 1,
        pageSize: 10,
      },
      total: 0,
    };
  },
  methods: {
    // 选择年级或者班级查询
    selectOrg(item) {
      if (item.lev == 2) {
        this.queryParams.gradeCode = item.id === undefined ? "" : item.id;
        this.queryParams.classCode = "";
      } else {
        this.queryParams.classCode = item.id === undefined ? "" : item.id;
      }
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
      this.queryParams.no = "";
      this.queryParams.gradeCode = "";
      this.queryParams.classCode = "";
      this.queryParams.projectName = "";
      this.queryParams.raceName = "";
       this.$refs.orgInfo.clearOption()
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
        const res = await getUserRaceExercixeByPage(this.queryParams);
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

</style>
>
