import request from '@/api/request2'

export const login = (data) => {
   return request({method:'post',url:"/login",data})
} 

export const getUserInfo = (data) => {
   return request({method:'get',url:"/getUserInfo",data})
}

export const logout = () => {
   return request({method:'get',url:"/logout"})
}