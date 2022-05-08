<template>
  <div>
      
    <el-button type="primary" @click="alertAddInfo">添加</el-button>
    <!-- <el-tree
       default-expand-all
       :data="allOrg"
        node-key="id"
       :props="{
        children: 'children',
        label: 'name'
      }"
    >
     <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>组织编码:{{data.code}}</span>
        <span>学年:{{data.year}}</span>
        <span>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="alertUpdate(data)">
            
          </el-button>
           <el-popconfirm
              title="是否确认删除(下级组织也会被删除)?"
              @confirm="deleteOrg(data)"
            >
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                slot="reference"
              >
              </el-button>
            </el-popconfirm>
         
        </span>
      </span>
    </el-tree> -->
     <el-table
    :data="allOrg"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="name"
      label="名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="code"
      label="组织编码"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="year"
      label="学年">
    </el-table-column>
    <el-table-column label="操作">
       <template slot-scope="scope">
            <el-button
            type="text"
            size="mini"
            @click="alertUpdate(scope.row)">
              修改
          </el-button>
           <el-popconfirm
              title="是否确认删除(下级组织也会被删除)?"
              @confirm="deleteOrg(scope.row)"
            >
              <el-button
                size="mini"
                type="text"
                slot="reference"
              >
              删除
              </el-button>
            </el-popconfirm>
       </template>
    </el-table-column>
  </el-table>

    <el-dialog
      :title="staticForm.title"
      :visible.sync="formDialog"
      width="width"
      
    
    >
      <el-form    ref="ruleForm" label-width="120px" label-position="left"
          :rules="formRules" :model="form">
        <el-form-item label="学校/年级/班级 ">
          <el-select v-model="form.lev" placeholder="">
            <el-option
              :key="item.value"
              v-for="item in levOptions"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="组织编码" prop="code">
            <el-input v-model="form.code" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="上级组织" v-if="form.lev != 1">
          <el-cascader
            :options="allOrg"
            v-model="form.parentId"
            :show-all-levels="false"
            collapse-tags
            :props="{
                emitPath:false,
              checkStrictly: true,
              label: 'name',
              value: 'id',
              multiple: false,
            }"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item
            label="学年"
            prop="year"
           v-if="form.lev != 1"
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
      <div slot="footer">
        <el-button @click="formDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
function treeing(arr) {
  let tree = [];
  const map = {};
  for (let item of arr) {
    // 一个新的带children的结构
    let newItem = (map[item.id] = {
      ...item,
      children: [],
    });
    if (map[item.parentId]) {
      // 父节点已存进map则在父节点的children添加新元素
      let parent = map[item.parentId];
      parent.children.push(newItem);
    } else {
      // 没有父节点，在根节点添加父节点
      tree.push(newItem);
    }
  }
  return tree;
}
import { getAllOrg,editOrg } from "@/api";
export default {
  data() {
    return {
      levOptions: [
        {
          value: "1",
          label: "学校",
        },
        {
          value: "2",
          label: "年级",
        },
        {
          value: "3",
          label: "班级",
        },
      ],
      formDialog: false,
      staticForm:{
        title:"添加"
      },
      form: {
        ope:'1',
        state:"1",
        id:"",
        parentId: '',
        lev: "",
        name: "",
        code: "",
        year: "",
      },

      allOrg: [],
    };
  },
  methods:{
      alertAddInfo(){
        this.form = {
        name: "",
        parentId:'',
        lev: '',
     
        ope: "1",
        code:'',
        state:'1',
        year:""
      };
        this.formDialog = true
      },
    alertUpdate(item) {
      this.form = {
        name: item.name,
        parentId:item.parentId,
        lev:item.lev,
        id:item.id,
        ope: "2",
        code:item.code,
        state:'1',
        year: item.year,
      };
      this.formDialog = !this.formDialog;
    },
        // 上传添加 修改表单
   async submitEditForm() {
        //  if(this.form.parentId.instace){
        //      this.form.parentId = this.form.parentId.pop()
        //  }
         if(!this.form.parentId){
           this.form.parentId =-1
         }
          const res = await editOrg(this.form);
          if(res.data.code ==100){
              this.reqGetAllOrg();
              this.$message.success('操作成功')
          }
    
            this.formDialog = false;
       
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
        this.reqGetAllOrg()
      }
    },
   async reqGetAllOrg(){
     const res = await getAllOrg();
     this.allOrg = treeing(res.data.data);
    },
  },
   mounted() {
    this.reqGetAllOrg()
  },
};
</script>

<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 14px;
    padding-right: 8px;
    text-align: center;
  }

</style>>

