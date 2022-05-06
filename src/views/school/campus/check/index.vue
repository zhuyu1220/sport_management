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
         <el-table-column
      type="selection"
      width="55"/>
      <el-table-column type="index" label="序号" width="60px">
     
    </el-table-column>
 
      <el-table-column prop="title" label="标题" width="width">
      </el-table-column>
      <el-table-column prop="startTime" label="开始日期" width="width">
      </el-table-column>
         <el-table-column prop="endTime" label="结束日期" width="width">
      </el-table-column>
       <el-table-column  label="照片" width="width">
          <template scope="scope">
             <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.pic"
                fit="contain "></el-image>
          </template>
      </el-table-column>
      <el-table-column prop="msg" label="内容" width="width">
      </el-table-column>
      <el-table-column  label="审核状态" width="width">
        <template slot-scope="scope">
            {{scope.row.state}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
         <el-button type="text" 
           @click="batchPass(1,scope.row.id)"
            >通过</el-button
          >
           <el-button type="text"
           @click="batchPass(2,scope.row.id)"
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

import {
  checkMsgSchoolInfo
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
      tableData:[
        {
        id: "",
        ope: "",
        state:'1',
        scope: "",
        title: "",
        picId: "",
        msg: "",
        startTime: "",
        endTime: "",
      },
      ],
      staticForm: {
        title: "添加",
      },

      queryParams: {
        currentPage: 1,
        pageSize: 10,
        title: "",
        startTime: "",
        endTime: "",
        state: "",
      },
      total: 1,
    };
  },
  methods: {
 
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
        ope: "",
        state:'1',
        scope: "",
        title: "",
        picId: "",
        msg: "",
        startTime: "",
        endTime: "",
      };
    },
        //批量审核 + 单个审核
    async batchPass(ope,id){
        let ids =[]
        // 判断是批量操作还是单个操作
        if(id){
           ids.push(id)
        }else{
          this.multipleSelection.forEach(item=>{
          ids.push(item.id)
        })
        }
      const res =   await checkMsgSchoolInfo({ids,ope})
      if(res.data.code ==100){
         this.$message({
            type: "success",
            message: "操作成功",
          });
          this.reqQueryByPages();
      }
    },
    // 分页+条件查询
    async reqQueryByPages() {
      this.loading = true;
      try {
        const res = await getMsgSchoolInfoByPage(this.queryParams);
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
};
</script>

<style scoped lang="scss">

</style>
