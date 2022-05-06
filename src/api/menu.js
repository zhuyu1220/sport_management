import request from '@/api/request2'
// 查询菜单
export const getMenuListByParentId = (data)=> {
    return request({method:"post",url:"getMenuListByParentId",data})
}
export const editMenuInfo = (data)=> {
    return request({method:"post",url:"/system/menu/editMenu",data})
}
export const menuLinkRole = (data) => {
    return request({method:"post",url:"menuLinkRole",data})
}

export const getRoleByMenuId = (data) => {
    return request({method:"post",url:"getRoleByMenuId",data})
}
export const getMenuList = (params) => {
    return request({method:"get",url:"system/menu/getMenuList",params})
}   
export const getMenuListAll = (params) => {
    return request({method:"get",url:"/system/menu/getMenuListAll",params})
}   
export const queryByIdMenu = (params) => {
    return request({method:"get",url:"/system/menu/queryByIdMenu",params})
}
