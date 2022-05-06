<template>
  <div>
    <el-card shadow="never"  style="margin:15px 0;">
       <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <div style="float:right;margin-right:15px">
      <el-button type="" size="mini" @click="alertAddInfo()">添加</el-button>
      <el-button type="primary"  size="mini" @click="goback()">返回上级</el-button>
       </div>
    </el-card>
    <el-table v-loading="loading" :data="org" style="width: 100%">
      <el-table-column prop="code" label="组织编码" width="width">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="width">
      </el-table-column>
      <el-table-column prop="year" label="学年" width="width">
      </el-table-column>
      <el-table-column width="width" label="设置">
        <template slot-scope="scope">
          <el-button
            v-show="scope.row.lev != 3"
            type="text"
            @click="queryLower(scope.row.id)"
          >
            查看下级</el-button
          >

          <!-- <el-button v-show="scope.row.lev !=1" type="text" @click="reqGetOrgByParentId(scope.row.parentId)"> 返回上级</el-button> -->
        </template>
      </el-table-column>
      <el-table-column width="200px" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="alertUpdate(scope.row)"
            style="margin-right:15px"
          >
            编辑</el-button
          >
          <el-popconfirm
            title="是否确认删除(下级组织也会被删除)?"
            @confirm="deleteOrg(scope.row)"
          >
            <el-button type="danger" size="mini" slot="reference"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :title="staticForm.title + levName"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        label-position="top"
        :model="form"
        ref="ruleForm"
        :rules="formRules"
      >
        <el-form-item :label="levName + '名称'" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="组织编码" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学年" prop="year" v-if="curOrgLev != 1">
          <el-date-picker
            v-model="form.year"
            type="year"
            placeholder="选择年"
            format="yyyy 年 "
            value-format="yyyy"
            :picker-options="staticForm.pickerOptions"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { editOrg, getOrgByParentId, getQueryOrg } from "@/api/index.js";
export default {
  data() {
    return {
      loading: false,
      org: [],
      dialogFormVisible: false,
      form: {
        code: "",
        id: "1",
        lev: "",
        name: "",
        ope: "",
        parentId: "",
        state: "1",
        year: "",
      },

      staticForm: {
        title: "",
        orgName: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      formRules: {
        code: [{ required: true, message: "请输入组织编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        year: [{ required: true, message: "请输入学年", trigger: "change" }],
      },
      curOrgLev: 1,
    };
  },

  computed: {
    levName() {
      let val = this.curOrgLev;
      if (val == 1) {
        return "学校";
      } else if (val == 2) {
        return "年级";
      } else if (val == 3) {
        return "班级";
      } else {
        return "";
      }
    },
  },
  methods: {
    async alertUpdate(item) {
      this.staticForm = {
        title: "修改",
      };
      // 修改之前先查询 因为其它人可能在此期间修改了数据
      try {
        const res = await getQueryOrg({ id: item.id });
        if (res.data.code == 100) {
          Object.assign(this.form, res.data.data);
          this.form.ope = 2;
           this.$nextTick(() => {
               this.$refs['ruleForm'].clearValidate()
            })
        }
      } catch (error) {
        console.log(error);
      }

      this.dialogFormVisible = !this.dialogFormVisible;
    },
    alertAddInfo() {
      this.staticForm = {
        title: "添加",
      };
      this.form = {
        ope: "1",
        state: "1",
        name: "",
        parentId: this.parentId,
        lev: this.curOrgLev,
        id: "",
        code: "",
        year: "",
      };
         this.$nextTick(() => {
        this.$refs['ruleForm'].clearValidate()
      })
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    // 上传添加 修改表单
    submitEditForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            const res = await editOrg(this.form);
            if (res.data.code == 100) {
              this.reqGetOrgByParentId(this.parentId);
              this.dialogFormVisible = false;
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    },

    async deleteOrg({ id, parentId }) {
      const res = await editOrg({
        id,
        ope: "0",
      });
      if (res.data.code == 100) {
        this.$message({
          message: "删除成功",
          type: "success",
        });

        this.reqGetOrgByParentId(parentId);
      }
    },
    async reqGetOrgByParentId(parentId) {
      this.loading = true;
      this.parentId = parentId;
      try {
        const res = await getOrgByParentId({ parentId });
        if (res.data.code == 100) {
          this.org = res.data.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      } catch (err) {
        this.loading = false;
      }
    },
    queryLower(id) {
      if (this.curOrgLev < 4) {
        this.curOrgLev += 1;
        console.log("curOrgLev", this.curOrgLev);
      }
      this.reqGetOrgByParentId(id);
    },
    goback() {
      this.curOrgLev = 1;
      this.reqGetOrgByParentId(-1);
    },
  },
  mounted() {
    this.reqGetOrgByParentId(-1);
  },
};
</script>

<style></style>
