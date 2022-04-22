import request from '@/api/request2'
// 查询菜单
const getMenuListByParentId = (data)=> {
    return request({method:"post",url:"getMenuListByParentId",data})
}
const editMenuInfo = (data)=> {
    return request({method:"post",url:"editMenuInfo",data})
}
const menuLinkRole = (data) => {
    return request({method:"post",url:"menuLinkRole",data})
}
const getRoleByMenuId = (data) => {
    return request({method:"post",url:"getRoleByMenuId",data})
}
export { getMenuListByParentId,editMenuInfo,menuLinkRole,getRoleByMenuId}