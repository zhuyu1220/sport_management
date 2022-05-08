import request from '@/api/request2'
// 赛事发布
// 增删改赛事
export const editRaceInfo = (data) => {
   return request({method:'post',url:"/Running/Race/edit",data})
} 
// 查询单个赛事信息
export const getRaceInfoById = (data) => {
    return request({method:'post',url:"/Running/Race/getRaceInfoById",data})
} 
// 分页查询赛事信息
export const getRaceInfoByPage = (data) => {
    return request({method:'post',url:"/Running/Race/getRaceInfoByPage",data})
} 
 //增删改赛事项目明细
 export const editRaceProjectDetail = (data) => {
    return request({method:'post',url:"/Running/Race/ProjectDetail/edit",data})
} 
// 赛事项目明细查询
 export const getRaceProjectDetailByRaceId = (params) => {
    return request({method:'get',url:"/Running/Race/ProjectDetail/getRaceId",params})
} 
//  赛事项目报名编辑
 export const editRaceUser= (data) => {
    return request({method:'post',url:"/Running/Race/User/edit",data})
} 
//   赛事项目报名查询
 export const getRaceUserAll = (data) => {
    return request({method:'post',url:"/Running/Race/User/getRaceUserAll",data})
} 
//   赛事报名人员审核
 export const checkRaceUser = (data) => {
    return request({method:'post',url:"/Running/Race/User/checkRaceUser",data})
} 
//  赛事项目报名人员查询
 export const getRaceUser = (data) => {
    return request({method:'post',url:"/Running/Race/User/getRaceUserByProjectDetailId",data})
 } 

