import request from '@/api/request2'
const editScoreLevInfo = (data) => {
    return request({method:'post',url:"/system/score/editScoreLevInfo",data})
} 
const getScoreLevByPage = (params) => {
    return request({method:'get',url:"/system/score/getScoreLevByPage",params})
} 
const editScoreRuleInfo = (data) => {
    return request({method:'post',url:"/system/score/editScoreRoleInfo",data})
} 
const getScoreRuleByPage = (params) => {
    return request({method:'get',url:"/system/score/getScoreRuleByPage",params})
} 
export {editScoreLevInfo,getScoreLevByPage ,editScoreRuleInfo,getScoreRuleByPage}