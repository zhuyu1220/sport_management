 import request from '@/api/request2'
 export const editRaceBaseProject = (data) => {
    return request({method:'post',url:"/Running/BaseProject/edit",data})
} 
export const queryRaceBaseProjectByPage = (data) => {
    return request({method:'post',url:"/Running/BaseProject/BaseProjectByPage",data})
} 
export const getRaceBaseProjectById = (params) => {
    return request({method:'get',url:"/Running/BaseProject/BaseProjectById",params})
} 