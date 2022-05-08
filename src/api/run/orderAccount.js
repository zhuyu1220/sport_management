import request from '@/api/request2'
const editOrderAccount = (data) => {
    return request({method:'post',url:"/Running/OrderAccount/edit",data})
} 
const getOrderAccountById = (params) => {
    return request({method:'get',url:"/Running/OrderAccount/getOrderAccountById",params})
} 
const queryOrderAccountByPage = (data) => {
    return request({method:'post',url:"/Running/OrderAccount/queryByPage",data})
} 
export {editOrderAccount,getOrderAccountById,queryOrderAccountByPage }