 import request from '@/api/request2'
 export const editRaceBaseProject = (data) => {
    return request({method:'post',url:"/editRaceBaseProject",data})
} 
export const queryRaceBaseProjectByPage = (data) => {
    return request({method:'post',url:"/queryRaceBaseProjectByPage",data})
} 
export const getRaceBaseProjectById = (data) => {
    return request({method:'post',url:"/getRaceBaseProjectById",data})
} 