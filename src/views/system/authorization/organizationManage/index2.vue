<template>
  <div>
    <!-- {{form}} -->
    <div class="windowAddForm">
      <el-dialog
        :title="staticForm.edit + staticForm.orgName"
        :visible.sync="dialogFormVisible"
      >
        <el-form
          label-position="top"
          :model="form"
          ref="ruleForm"
          :rules="formRules"
        >
          <el-form-item :label="staticForm.orgName + '名称'" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="组织编码" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="学年"
            prop="year"
            v-if="staticForm.orgName != '学校'"
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
    <div class="windowdeleteForm"></div>
    <el-card>
    
     <div class="wrapper">
      <div class="panel">
        <el-button
          type=""
          @click="alertAddInfo({id:1, lev: 1, parentId: '-1', orgName: '学校',edit:'添加' })"
          >添加学校</el-button
        >
        <ul>
          <li class="active" v-for="item in orgInfo.school" :key="item.id">
            {{ item.name }}
            <div>
           <el-popconfirm
              title="是否确认删除(下级组织也会被删除)?"
              @confirm="deleteOrg(item)"
            >
              <el-button
                type="text"
                icon="el-icon-remove-outline"
                slot="reference"
              ></el-button>
            </el-popconfirm>
            <el-button slot="reference" type="text" icon="el-icon-edit-outline"  @click="alertUpdate({item, orgName: '学校',edit:'修改' })"></el-button>
            </div>
           
            <!-- <el-button type="primary" @click="reqGetGradeOrg(item.id)">查询年级</el-button> -->
          </li>
        </ul>
      </div>
      <div class="panel">
        <el-button
          type=""
          @click="
            alertAddInfo({
              id:1,
              lev: 2,
              parentId: orgInfo.school[0].id,
              edit:'添加',
              orgName: '年级',
            })
          "
          >添加年级</el-button
        >
        <ul> 
          <li :class=" currentIndex == index ? 'active' :'' " v-for="(item,index) in orgInfo.grade"
           :key="item.id" >
           <span>
                 {{ item.name }}
           </span>
         
            <!-- 删除需要传递当前组织id 父亲id  -->
          <div>
          <el-popconfirm
              title="是否确认删除(下级组织也会被删除)?"
              @confirm="deleteOrg(item)"
            >
                <el-button
                type="text"
                icon="el-icon-remove-outline"
                slot="reference"
              ></el-button>
          </el-popconfirm>
         <el-button slot="reference" type="text" icon="el-icon-edit-outline" @click="alertUpdate({ item, edit:'修改', orgName: '年级'})"></el-button>
         <el-button type="text" icon="el-icon-zoom-in" @click="reqGetClassOrg(item.id,index)"></el-button>
          </div>
          
          </li>
        </ul>
      </div>
      <div class="panel">
        <el-button
          type=""
          @click="
            alertAddInfo({id:1, lev: 3, parentId: curSeletedGrade, orgName: '班级', edit:'添加'})
          "
          >添加班级</el-button
        >
        <ul>
          <li v-for="item in orgInfo.class" :key="item.id" :data-org="item">
            {{ item.name }}
            <div>
           <el-popconfirm
              title="是否确认删除"
              @confirm="deleteOrg(item)"
            >
                <el-button
                type="text"
                icon="el-icon-remove-outline"
                slot="reference"
              ></el-button>
          </el-popconfirm>
    
                <el-button slot="reference" type="text" icon="el-icon-edit-outline" @click="alertUpdate({ item,edit:'修改', orgName: '班级'})"></el-button>
              </div> 
          </li>
        </ul>
      </div>
      <!-- <div class="studentTable">
            <el-table
              :data="student.items"
              style="width: 100%">
              <el-table-column
                prop="className"
                label="班级"
                width="width">
              </el-table-column>
                 <el-table-column
                prop="className"
                label="班级"
                width="width">
              </el-table-column>
                 <el-table-column
                prop="name"
                label="姓名"
                width="width">
              </el-table-column>
                 <el-table-column
                prop="no"
                label="学号"
                width="width">
              </el-table-column>
            </el-table>
      </div> -->
    </div>
    </el-card>
  </div>
</template>

<script>
import { editOrg, getOrgByParentId, getStudentByOrgId } from "@/api/index.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      currentIndex :0,
      curSchool: null,
      curSeletedGrade: null,
      curSeletedClass: null,
      reqOrganizationData: {},
      staticForm: {
        edit:'',
        orgName: "",
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
        },
      },
      form: {
        code: "",
        id: "1",
        lev: "",
        name: "",
        ope: "",
        parentId: "",
        state: "1",
        year: "2022",
      },
      formRules: {
        code: [{ required: true, message: "请输入组织编码", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        year: [{ required: true, message: "请输入学年", trigger: "change" }],
      },
      isShow: {
        dialogFormVisible: "",
      },
      orgInfo: {
        school: [],
        grade: [],
        class: [],
      },
      student: {
        items: [],
        currentPage: "",
        pageSize: "10",
      },
    };
  },
  methods: {
    alertUpdate({item, orgName, edit} ) {
      this.staticForm = {
         orgName,
         edit
       };
      this.form = {
        name: item.name,
        parentId:item.parentId,
        lev:item.lev,
        id:item.id,
        ope: "2",
        code:item.code,
        state:'1',
        year: "2022",
      };
      this.dialogFormVisible = !this.dialogFormVisible;
    },
    alertAddInfo({id, lev, parentId, orgName,edit }) {
      if (parentId != null) {
       this.staticForm = {
         orgName,
         edit
       };
      this.form = {
        name: "",
        parentId,
        lev: lev,
        id,
        ope: "1",
        code:'',
        state:'1',
        year:""
      };
        this.dialogFormVisible = !this.dialogFormVisible;
      } else {
        this.$message({
          type: "error",
          message: "请选中上级组织",
        });
      }
    },
    // 上传添加 修改表单
    submitEditForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const res = await editOrg(this.form);
          if (res.data.code == 100) {
            if (this.form.lev == 1) {
              this.reqGetOrgByParentId();
            } else if (this.form.lev == 2) {
              this.reqGetGradeOrg(this.curSchool);
            } else if (this.form.lev == 3) {
              this.reqGetClassOrg(this.curSeletedGrade);
            }
            this.dialogFormVisible = false;
          }
        } else {
          return false;
        }
      });
    },

    async deleteOrg(item) {
      const res = await editOrg({
        id:item.id,
        ope:'0'
      });
      if (res.data.code == 100) {
        this.$message({
          message: "删除成功",
          type: "success",
        });
        if (item.lev == 1) {
          this.reqGetOrgByParentId();
        } else if (item.lev == 2) {
          this.reqGetGradeOrg(item.parentId);
        } else {
          this.reqGetClassOrg(item.parentId);
        }
      }
    },
    // 查询学校信息
    async reqGetOrgByParentId() {
      const res = await getOrgByParentId({ parentId: "-1" });
      if (res.data.code == 100) {
        this.orgInfo.school = res.data.data;
        return Promise.resolve(res.data.data);
        // this.reqGetGradeOrg(res.data.data[0].id)
      } else {
        return Promise.error("未获取到信息");
      }
    },
    // 查询年级信息
    async reqGetGradeOrg(parentId) {
      const res = await getOrgByParentId({ parentId: parentId });
      if (res.data.code == 100) {
        this.orgInfo.grade = res.data.data;
        return Promise.resolve(res.data.data);
      } else {
        return Promise.error("未获取到信息");
      }
    },
    // 查询班级信息
    async reqGetClassOrg(parentId,index) {
      this.currentIndex =index
      this.curSeletedGrade = parentId;
      if (this.curSeletedGrade) {
        const res = await getOrgByParentId({ parentId: parentId });
        if (res.data.code == 100) {
          this.orgInfo.class = res.data.data;
          return Promise.resolve(res.data.data);
        } else {
          return Promise.error("未获取到信息");
        }
      } else {
        this.$message({
          type: "error",
          message: "请先选择需要查询的年级",
        });
      }
    },
    // 查询班级学生信息
    // async reqGetStudentByOrgId(orgId){
    //   this.curSeletedClass  = orgId;
    //   if(this.curSeletedClass){
    //       let temp = {
    //         currentPage:this.student.currentPage,
    //         pageSize:this.student.pageSize,
    //         val:orgId
    //      }
    //      const res  = await   getStudentByOrgId(temp);
    //      if(res.data.code == 100){
    //        console.log(res.data,44543654365);
    //        this.student.items = res.data.data;
    //     }
    //   }else{
    //     this.$message({
    //        type:'error',
    //        message:"请先选择需要查询的班级"
    //     })
    //   }

    // },
  },
  mounted() {
    // 进来先查询 学校
    // 查完学校 根据学校的id 再查询 年级
    this.reqGetOrgByParentId().then((res) => {
      this.reqGetGradeOrg(res[0].id);
    });
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}
.panel {
  margin-right: 50px;
  flex: 1;
   &::v-deep .el-icon-edit-outline,  &::v-deep .el-icon-remove-outline,  &::v-deep .el-icon-zoom-in{
     font-size: 24px;
   }

   ul{
      list-style: none;  
      margin: 20px 0 0 0 ;
      padding: 0;
   }
   ul>li{
     display: flex;
     align-items: center;
     justify-content: space-between;
     border: 1px solid #DCDFE6;
     border-top: 0;
     padding: 0 15px;
   }
   ul li:nth-of-type(1) {
    border-top: 1px solid #DCDFE6;
   }
    ul .active{
      color: #409EFF;
   
  
    //  outline:1px solid  #67C23A;
    }
   
}
</style>
