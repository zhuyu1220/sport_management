import request from '@/api/request2'
const editOrderAccount = (data) => {
    return request({method:'post',url:"/editOrderAccount",data})
} 
const getOrderAccountById = (data) => {
    return request({method:'post',url:"/getOrderAccountById",data})
} 
const queryOrderAccountByPage = (data) => {
    return request({method:'post',url:"/queryOrderAccountByPage",data})
} 
export {editOrderAccount,getOrderAccountById,queryOrderAccountByPage }