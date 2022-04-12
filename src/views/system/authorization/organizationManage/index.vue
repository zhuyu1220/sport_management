<template>
  <div>
    <div class="windowAddForm">
      <el-dialog title="添加" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="组织名称" >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="windowdeleteForm"></div>
    <div class="wrapper">
      <div class="panel">
        <el-button type="" @click="alertAddInfo('school')">添加学校</el-button>
        <ul>
          <li>阳光小学 <el-button type="plain">删除</el-button></li>
        </ul>
      </div>
      <div class="panel">
        <el-button type="" @click="alertAddInfo('grade')">添加年级</el-button>
        <ul>
          <li>阳光小学 <el-button type="plain">删除</el-button></li>
        </ul>
      </div>
      <div class="panel">
        <el-button type="" @click="alertAddInfo('class')">添加班级</el-button>
        <ul>
          <li>阳光小学 <el-button type="plain">删除</el-button></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
         dialogFormVisible:false,
         curOrganization:'',
         reqOrganizationData:{
              id:"1",
              schoolId:'111',
              schoolName:'阳光小学',
              info:[{grade:'一年级',children:['一班','二班','三班']}]
               
         },
         form:{
            name:""
         },
      isShow: {
        dialogFormVisible:""
      },
    };
  },
  methods: {
    alertAddInfo(organization) {
      this.curOrganization = organization;
      this.dialogFormVisible = !this.dialogFormVisible
      // if (organization == "class") {
    
      // } else if (organization == "grade") {

      // } else {
 
      // }
    },
    reqOrganiztionInfo(schoolId){
      //  获取该学校的信息
    }
  },
  mounted(){
    this.reqOrganiztionInfo()
  }
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
}
.panel {
  flex: 1;
  min-height: 400px;
  border: 1px solid #cccccc;
  & li {
    list-style: none;
    width: 200px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid skyblue;
  }
}
</style>
