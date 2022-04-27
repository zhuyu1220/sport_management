<template>
  <div>
    <el-card>
      <el-button type="primary" @click="alertAdd">增加</el-button>
    </el-card>
    <el-table :data="tableData"  >
    <el-table-column prop="prop" label="序号" type="index"> </el-table-column>
    <el-table-column prop="score" label="积分"> </el-table-column>
    <el-table-column label="增减"> 
        <template slot-scope="scope">
             <span v-if="scope.row.oper == 1">增加</span>
             <span v-else-if="scope.row.oper == 0">扣减</span>
        </template>
    </el-table-column>
    <el-table-column prop="type" label="运动时常/里程"> 
       <template slot-scope="scope">
             <span v-if="scope.row.type == 1">运动时常</span>
             <span v-else-if="scope.row.type == 2">运动里程</span>
        </template></el-table-column>
    <el-table-column prop="amount" label="运动量"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="alertUpdate(scope.row)"
          >修改</el-button
        >
        <el-popconfirm title="这是一段内容确定删除吗？">
          <el-button
            slot="reference"
            type="primary"
            @click="reqDelete(scope.row.id)"
            >删除</el-button
          >
        </el-popconfirm>
      </template>
    </el-table-column>

    </el-table>

    <!-- 编辑积分规则开始 -->
    <el-dialog
      :title="staticForm.title"
      :visible.sync="dialogVisible"
      width="width"
    >
      <el-form
        :model="form"
        ref="form"
        :rules="rules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="增减">
          <el-radio v-model="form.oper" label="1">增加</el-radio>
          <el-radio v-model="form.oper" label="0">扣减</el-radio>
        </el-form-item>
        <el-form-item label="时长/里程">
          <el-select v-model="form.type" placeholder="">
            <el-option
              v-for="(item, index) in timeAndMile"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="unit" prop="amount">
          <el-input-number :min="0" v-model="form.amount"></el-input-number>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input-number :min="0" v-model="form.score"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmitInfo()">确 定</el-button>
      </div>
    </el-dialog>
    <!--编辑积分规则结束  -->
  </div>
</template>

<script>
import {editScoreLevInfo,getScoreLevByPage ,editScoreRuleInfo,getScoreRuleByPage} from '@/api'
export default {
  data() {
    var validateAmount = (rule, value, callback) => {
      if (value == 0 || value == "") {
        callback(new Error("请设置正值"));
      } else {
        callback();
      }
    };
    return {
      timeAndMile: [
        {
          value: '1',
          label: "运动时常",
        },
        {
          value: '2',
          label: "运动里程",
        },
      ],
      dialogVisible: false,
      staticForm: {
        title: "增加",
      },
      form: {
        // 积分
        score: "",
        // 增减
        oper: 1,
        // 运动时常/运动里程
        type: 1,
        // 多少分钟 或者多少公里
        amount: "",
        //修改 增加 删除
        ope: 1,
        id: "",
      },
      tableData: [
        {
          ctime: "2022-04-12 18:32:26",
          id: "11",
          ope: "",
          oper: "1",
          state: "1",
          type: "1",
          score: "5",
          amount: 30,
        },
      ],
      rules: {
        amount: [
          {
            validator: validateAmount,
            trigger: ["blur", "change"],
          },
        ],
        score: [
          {
            validator: validateAmount,
            trigger: ["blur", "change"],
          },
        ],
      },
      queryPrams:{
        currentPage:1,
        pageSize:10
      }
    };
  },
  computed: {
    unit() {
      if (this.form.type == 1) {
        return "分钟";
      } else {
        return "千米";
      }
    },
  },
  methods: {
    alertAdd() {
      this.staticForm.title = "增加";
      (this.form = {
        score: "",
        oper: 1,
        type: 1,
        amount: "",
        ope: 1,
      }),
        (this.dialogVisible = true);
    },
    alertUpdate({ score, oper, type, amount, id }) {
      this.staticForm.title = "修改";
      Object.assign(this.form, { score, oper, type, amount, id });
      this.form.ope = 2;
      this.dialogVisible = true;
    },
    reqSubmitInfo() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const res = await editScoreRoleInfo(this.form);
            if (res.data.code == 100) {
              this.$message.success("操作成功");
              this.dialogVisible = false;
            }
          } catch (err) {
            console.log(err);
          }
        }
      });
    },
     async reqDelete(id) {
      try {
        const res = await editScoreRoleInfo({id,ope:0});
        if(res.data.code ==100){
          this.$message.success("删除成功");
           this.reqGetScoreLevByPage();
        }
      
      } catch (error) {
        console.log(error);
      }
    },
    async reqGetScoreRuleByPage(){
      const res = await   getScoreRuleByPage(this.queryPrams)
    }
  },
  mounted(){
    this.reqGetScoreRuleByPage()
  }
};
</script>

<style></style>
