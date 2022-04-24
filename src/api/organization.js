import request from '@/api/request2'

/*
  添加/修改/删除学校年级班级接口
  @params
	"code": "组织编码",
	"id": "1",
	"lev": "1-学校;2-年级;3-班级",
	"name": "组织名称",
	"ope": "1-新增;2-修改;0-删除",
	"parentId": "上一级的ID，若是学校则是-1",
	"state": "1-在用;0-禁用",
	"year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
*/
const editOrg = (data) => {
   return request({method:'post',url:"/system/org/crud",data})
} 


/*
  通过学校查询年级班级接口
  查询机构下学校、年级、班级
  @params
  {"val":"-1"}
  val上级机构的ID
  @return {"code":"100","data":[{"code":"机构编码","id":"1","lev":"1-学校;2-年级;3-班级","name":"组织名称","ope":"1-新增;2-修改;0-删除","parentId":"上一级的ID，若是学校则是-1","state":"1-在用;0-禁用","year":"学校不需要，年级和班级，这个字段存的是学年信息的年份"}],"dataSize":"12","msg":"通信成功"}
*/
const getOrgByParentId = (params) => {
   return request({method:'get',url:"/system/org/queryParent",params})
} 

/*
  .通过班级查询学生信息列表接口
  查询机构下学校、年级、班级
  @params
  {"currentPage":"1","pageSize":"10","val":"-1"}
  val机构的ID
  currentPage当前页码
  pageSize单个页面的数量
  @return {
	"code": "100",
	"data": [
		{
			"className": "一班",
			"gradeName": "一年级",
			"name": "张三",
			"no": "20220412"
		}
	],
	"dataSize": "1",
	"dataTotal": "12",
	"msg": "通信成功"
}
*/
const getStudentByOrgId = (data) => {
   return request({method:'post',url:"/system/org/queryStudent",data})
} 
/*
  查询机构详情
  @params
  @return 
*/

//同步学生年级信息
const syncStudentGradeInfo = () => {
   return request({method:'get',url:"/syncStudentGradeInfo",})
} 

export { editOrg,getOrgByParentId,getStudentByOrgId,syncStudentGradeInfo}