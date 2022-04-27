import request from '@/api/request2'
// 编辑角色
const editRole = (data) => {
    return request({method:'post',url:"/system/Role/crud",data})
} 
// 获取角色信息
const getRoleById = (params) => {
    return request({method:'get',url:"/system/Role/getrole",params})
}
//  获取所有角色
const getAllRoles = () => {
    return request({method:'get',url:"/system/Role/getAllroles"})
 } 
//  根据当前组织id获取角色
 const getRolesByOrgId = (params) => {
    return request({method:'get',url:"/system/Role/getroles",params})
} 
// 角色和学校架构关联接口
const editRoleOrgLinkInfo = (data) => {
    return request({method:'post',url:"/system/Role/roleorgLink",data})
}
 export { editRole,getRoleById,getAllRoles,getRolesByOrgId,editRoleOrgLinkInfo}