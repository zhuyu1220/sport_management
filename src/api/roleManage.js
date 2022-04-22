import request from '@/api/request2'
// 编辑角色
const editRole = (data) => {
    return request({method:'post',url:"/editRole",data})
} 
// 获取角色信息
const getRoleById = (data) => {
    return request({method:'post',url:"/getRoleById",data})
}
//  获取所有角色
const getAllRoles = () => {
    return request({method:'get',url:"/getAllRoles"})
 } 
//  根据当前组织id获取角色
 const getRolesByOrgId = (data) => {
    return request({method:'post',url:"/getRolesByOrgId",data})
} 
// 角色和学校架构关联接口
const editRoleOrgLinkInfo = (data) => {
    return request({method:'post',url:"/editRoleOrgLinkInfo",data})
}
 export { editRole,getRoleById,getAllRoles,getRolesByOrgId,editRoleOrgLinkInfo}