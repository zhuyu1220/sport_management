import request from '@/api/request2'

const login = (data) => {
   return request({method:'post',url:"/homepage/user/login",data})
} 

const getMenuByToken = () => {
   return request({method:'get',url:"/Homepage/user/menu"})
}
 const logout = () => {
   return request({method:'get',url:"/logout"})
}
export {login,getMenuByToken,logout}