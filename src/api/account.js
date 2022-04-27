import request from '@/api/request2';
const getAccountByPage = (data) => {
    return request({ method:'post',url:'/system/account/AccountPage',data})
}
const editAccountInfo = (data) => {
    return request({ method:'post',url:'/system/account/editinfo',data})
}
const accountLinkRoleOrg = (data) => {
    return request({ method:'post',url:'/system/account/accountLinkRoleOrg',data})
}
const getAccountDetail = (params) => {
    return request({ method:'get',url:'/system/account/detail',params})
}
export {getAccountByPage,editAccountInfo,accountLinkRoleOrg,getAccountDetail}