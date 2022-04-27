<template>
  <div>
    <el-card>
      <el-button type="primary" @click="alertAdd">添加</el-button>
    </el-card>
    <el-table :data="gradeTable">
      <el-table-column label="名称" prop="name"> </el-table-column>
      <el-table-column label="积分" prop="name"> </el-table-column>
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
    <el-dialog
      :title="staticForm.title"
      :visible.sync="dialogVisible"
      width="width"
    >
      <el-form
        :model="form"
        label-position="left"
        ref="form"
        :rules="rulesForm"
        label-width="80px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="积分" prop="score">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="等级" prop="grade">
          <el-select v-model="form.grade">
            <el-option
              v-for="(item, index) in lev"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="照片" prop="pic">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reqSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {editScoreLevInfo,getScoreLevByPage ,editScoreRuleInfo,getScoreRuleByPage} from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      staticForm: {
        title: "添加",
      },
      lev: [
        { value: 1, label: "一级" },
        { value: 2, label: "二级" },
        { value: 3, label: "三级" },
        { value: 4, label: "四级" },
        { value: 5, label: "五级" },
        { value: 6, label: "六级" },
      ],
      form: {
        name: "",
        score: "",
        lev: "",
        pic: "",
        ope: "1",
      },
      rulesForm: {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
        score: [
          {
            required: true,
            message: "请输入积分",
            trigger: "blur",
          },
        ],
        grade: [
          {
            required: true,
            message: "请选择等级",
            trigger: "change",
          },
        ],
        pic: [
          {
            required: true,
            message: "请上传",
            trigger: "change",
          },
        ],
      },
      gradeTable: [
        {
          id: 1,
          name: "星星",
          pic: "",
          score: "100",
          lev: 1,
        },
        {
          id: 2,
          name: "月亮",
          pic: "",
          score: "100",
          lev: 2,
        },
      ],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.pic = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    alertAdd() {
      this.staticForm.title = "添加";
      this.form = {
        name: "",
        score: "",
        lev: "",
        pic: "",
        ope: "1",
      };
      this.dialogVisible = true;
    },
    alertUpdate(row) {
      this.staticForm.title = "修改";
      Object.assign(this.form, row);
      this.dialogVisible = true;
    },
    reqSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const res = await editScoreLevInfo(this.form);
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.reqGetScoreLevByPage();
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    async reqDelete(id) {
      try {
        const res = await editScoreLevInfo(id);
        if(res.data.code ==100){
          this.$message.success("删除成功");
           this.reqGetScoreLevByPage();
        }
      
      } catch (error) {
        console.log(error);
      }
    },
    reqGetScoreLevByPage() {},
    },
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
