import request from '@/api/request2'
// 赛事发布
export const editRaceInfo = (data) => {
   return request({method:'post',url:"/editRaceInfo",data})
} 
export const getRaceInfoById = (data) => {
    return request({method:'post',url:"/getRaceInfoById",data})
} 
export const getRaceInfoByPage = (data) => {
    return request({method:'post',url:"/getRaceInfoByPage",data})
 } 
 export const editRaceProjectDetail = (data) => {
    return request({method:'post',url:"/editRaceProjectDetail",data})
 } 
 export const getRaceProjectDetailByRaceId = (data) => {
    return request({method:'post',url:"/getRaceProjectDetailByRaceId",data})
} 
//  赛事报名
 export const getRaceUserByProjectDetailId = (data) => {
    return request({method:'post',url:"/getRaceUserByProjectDetailId",data})
 } 
 export const editRaceUser = (data) => {
    return request({method:'post',url:"/editRaceUser",data})
} 
//  赛事审核
 export const checkRaceUser = (data) => {
    return request({method:'post',url:"/getRaceBaseProjectById",data})
 } 
 export const getRaceUserByPage = (data) => {
    return request({method:'post',url:"/getRaceUserByPage",data})
 } 
 export const getRaceBaseProjectById = (data) => {
    return request({method:'post',url:"/getRaceBaseProjectById",data})
 } 
