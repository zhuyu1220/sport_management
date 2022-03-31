import request2 from '@/api/request2'

export const login = (data) => {
    // 通过axios实例发出请求
   return request2({method:'post',url:"/login",data})
}