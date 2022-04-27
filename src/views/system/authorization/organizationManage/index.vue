<template>
  <div>
     <el-card>
        <el-button
          type=""
          @click="alertAddInfo()"
          >添加</el-button
        >
        <el-button type="primary" @click="goback()">返回</el-button>
     </el-card>
      <el-table
          :data="org"
          style="width: 100%">
          <el-table-column
              prop="code"
              label="组织编码"
              width="width">
          </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="width">
          </el-table-column>
            <el-table-column
              prop="year"
              label="学年"
              width="width">
          </el-table-column>
          <el-table-column
              width="width"
              label="设置">
              <template slot-scope="scope">
                 <el-button v-show="scope.row.lev !=3"  type="text" @click="queryLower(scope.row.id)"> 查看下级</el-button>
                 
                 <!-- <el-button v-show="scope.row.lev !=1" type="text" @click="reqGetOrgByParentId(scope.row.parentId)"> 返回上级</el-button> -->
              </template>
          </el-table-column>
             <el-table-column
              width="width">
              <template slot-scope="scope">
                 <el-button type="primary" size="medium"  @click="alertUpdate(scope.row)"> 编辑</el-button>
                    <el-popconfirm
                    title="是否确认删除(下级组织也会被删除)?"
                    @confirm="deleteOrg(scope.row)"
                   >
                   <el-button
                  type="danger"
               size="medium"
                slot="reference"
              >删除</el-button>
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
          <el-form-item
            label="学年"
            prop="year"
            v-if="curOrgLev!= 1"
          >
            <el-date-picker
              v-model="form.year"
              type="year"
              placeholder="选择年"
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
import { editOrg, getOrgByParentId} from "@/api/index.js";
export default {
  data(){
      return{
      org:[],
      dialogFormVisible:false,
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
        title:'',
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
      curOrgLev:1,
 
     
      }
  },

  computed:{
    levName(){
      let val = this.curOrgLev;
        if(val ==1){
            return  '学校'
          }else if(val ==2){
            return '年级'
          }else if(val ==3) {
              return '班级'
          }else{
            return ''
          }
        
    }
  },
  methods:{
    alertUpdate(item) {
      this.staticForm = {
          title:'修改'
       };
      this.form = {
        name: item.name,
        parentId:item.parentId,
        lev:item.lev,
        id:item.id,
        ope: "2",
        code:item.code,
        state:'1',
        year: "",
      };
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    alertAddInfo() {
       this.staticForm = {
         title:"添加"
       };
      this.form = {
        name: "",
        parentId:this.parentId,
        lev: this.curOrgLev,
        id:'111',
        ope: "1",
        code:'',
        state:'1',
        year:""
      };
        this.dialogFormVisible = !this.dialogFormVisible;
     
    },
    // 上传添加 修改表单
    submitEditForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
         try{
          const res = await editOrg(this.form);
          if(res.data.code ==100){
           this.reqGetOrgByParentId(this.parentId);
           this.dialogFormVisible = false;
          }
         }catch(error){
           console.log(error);
           
         }
        }
      
      });
    },

    async deleteOrg({id,parentId}) {
      const res = await editOrg({
        id,
        ope:'0'
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
      this.parentId = parentId;
      const res = await getOrgByParentId({ parentId });
       this.org = res.data.data;
    },
    queryLower(id){
      if(this.curOrgLev<4){
          this.curOrgLev +=1;
          console.log('curOrgLev', this.curOrgLev );
      }
       this.reqGetOrgByParentId(id) 
    },
    goback(){
      this.curOrgLev =1;
      this.reqGetOrgByParentId(-1)
    }
  },
  mounted(){
       this.reqGetOrgByParentId(-1)
  }
}
</script>

<style>

</style>