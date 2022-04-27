import request from '@/api/request2'
// 学生管理
 const editStudentInfo = (data) => {
   return request({method:'post',url:"/editStudentInfo",data})
} 

 const checkStudentInfo = (data) => {
   return request({method:'post',url:"/checkStudentInfo",data})
} 
 const queryStudentByPage = (data) => {
   return request({method:'post',url:"/queryStudentByPage",data})
} 
 const getSutdentById = (data) => {
   return request({method:'post',url:"/getSutdentById",data})
} 
//教师管理
 const editTeacherInfo = (data) => {
   return request({method:'post',url:"/editTeacherInfo",data})
} 

 const checkTeacherInfo = (data) => {
   return request({method:'post',url:"/checkTeacherInfo",data})
} 
 const queryTeacherByPage = (data) => {
   return request({method:'post',url:"/queryTeacherByPage",data})
} 
 const getTeacherById = (data) => {
   return request({method:'post',url:"/getTeacherById",data})
} 
// 访客管理
 const editVistorInfo = (data) => {
   return request({method:'post',url:"/editStudentInfo",data})
} 

 const queryVistorByPage = (data) => {
   return request({method:'post',url:"/checkStudentInfo",data})
} 
 const getVistroById = (data) => {
   return request({method:'post',url:"/getVistroById",data})
} 
 const checkVistorInfo = (data) => {
   return request({method:'post',url:"/checkVistorInfo",data})
} 
// 获取学校下的组织
 const getOrgsBySchoolId = (data) => {
   return request({method:'post',url:"/getOrgsBySchoolId",data})
} 
export {
   editStudentInfo, checkStudentInfo, queryStudentByPage, getSutdentById,
   editTeacherInfo, checkTeacherInfo, queryTeacherByPage, getTeacherById,
   editVistorInfo,queryVistorByPage,getVistroById,checkVistorInfo,getOrgsBySchoolId
   

}