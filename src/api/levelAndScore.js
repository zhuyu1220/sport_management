import request from '@/api/request2'
const editScoreLevInfo = (data) => {
    return request({method:'post',url:"/editScoreLevInfo",data})
} 
const getScoreLevByPage = (data) => {
    return request({method:'post',url:"/getScoreLevByPage",data})
} 
const editScoreRuleInfo = (data) => {
    return request({method:'post',url:"/editScoreRuleInfo",data})
} 
const getScoreRuleByPage = (data) => {
    return request({method:'post',url:"/getScoreRuleByPage",data})
} 
export {editScoreLevInfo,getScoreLevByPage ,editScoreRuleInfo,getScoreRuleByPage}