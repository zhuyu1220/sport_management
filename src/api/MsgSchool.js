import request from '@/api/request2'
// 学校公告信息
export const editMsgSchoolInfo = (data) => {
    return request({method:'post',url:"/MsgSchool/School/editInfo",data})
} 
// 分页查询学校公告信息
export const getMsgSchoolInfoByPage = (data) => {
    return request({method:'post',url:"/MsgSchool/School/getMsgSchoolInfoByPage",data})
} 
//
export const getMsgSchoolInfoById = (params) => {
    return request({method:'get',url:"/MsgSchool/School/getMsgInfoById",params})
} 
//学校状态审核
export const checkMsgSchoolInfo = (params) => {
    return request({method:'get',url:"/MsgSchool/School/checkMsgSchoolInfo",params})
} 
// 大屏公告
export const editMsgScreenInfo = (data) => {
    return request({method:'post',url:"/MsgSchool/Screen/editMsgScreen",data})
} 
export const getMsgScreenInfoByPage = (data) => {
    return request({method:'post',url:"/MsgSchool/Screen/getMsgScreenInfoByPage",data})
} 
export const getMsgScreenInfoById = (params) => {
    return request({method:'get',url:"/MsgSchool/Screen/getMsgScreenInfoById",params})
} 
export const checkMsgScreenInfo = (params) => {
    return request({method:'get',url:"/MsgSchool/Screen/checkMsgScreen",params})
} 