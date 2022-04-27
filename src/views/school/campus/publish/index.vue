<template>
  <div>
    <el-button type="primary">添加 </el-button>

     <el-dialog
       title="添加"
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="范围" prop="scope">
          <el-select v-model="form.grade">
            <el-option
              v-for="(item, index) in scope"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="封面" prop="pic">
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
        <el-form-item label="内容" prop="msg">
          <RichText v-if="isShow" v-model="form.msg" />
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
import RichText from "@/components/RichText";
export default {
  name: "",
  components: { RichText },
  data() {
    return {
      dialogVisible:true,
      isShow: true,
      scope: [
        { value: 1, label: "学校" },
        { value: 2, label: "年级" },
        { value: 3, label: "班级" },
     
      ],
      form: {
        id: "",
        ope: "",
        scope: "",
        title: "",
        picId:'',
        msg: "",
      },
    };
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
