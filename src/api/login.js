import request from '@/api/request2'

const login = (data) => {
   return request({method:'post',url:"/login",data})
} 

const getMenuByToken = () => {
   return request({method:'get',url:"/getMenuByToken"})
}
 const logout = () => {
   return request({method:'get',url:"/logout"})
}
export {login,getMenuByToken,logout}