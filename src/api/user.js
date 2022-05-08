import request from '@/api/request2'
// 学生管理
export const editStudentInfo = (data) => {
   return request({method:'post',url:"/system/user/editStudentInfo",data})
} 

export  const checkStudentInfo = (data) => {
   return request({method:'post',url:"/system/user/checkStudentInfo",data})
} 
export const queryStudentByPage = (data) => {
   return request({method:'post',url:"/system/user/queryStudentByPage",data})
} 
export  const getSutdentById = (params) => {
   return request({method:'get',url:"/system/user/getStudentById",params})
} 
//教师管理
export const editTeacherInfo = (data) => {
   return request({method:'post',url:"/system/user/editTeacherInfo",data})
} 

export  const checkTeacherInfo = (data) => {
   return request({method:'post',url:"/system/user/checkTeacherInfo",data})
} 
export  const queryTeacherByPage = (data) => {
   return request({method:'post',url:"/system/user/queryTeacherByPage",data})
} 
export  const getTeacherById = (params) => {
   return request({method:'get',url:"/system/user/getTeacherById",params})
} 
// 访客管理
export  const editVisitorInfo = (data) => {
   return request({method:'post',url:"/system/user/editVistorInfo",data})
} 

export const queryVisitorByPage = (data) => {
   return request({method:'post',url:"/system/user/queryVistorByPage",data})
} 
export  const getVisitorById = (params) => {
   return request({method:'get',url:"/system/user/getVistroById",params})
} 
export const checkVistorInfo = (data) => {
   return request({method:'post',url:"/system/user/checkVistorInfo",data})
} 
// 获取学校下的组织
 export const getOrgsBySchoolId = (data) => {
   return request({method:'post',url:"/system/user/getOrgsBySchoolId",data})
} 
