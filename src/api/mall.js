import request from '@/api/request2'

const editScoreLevInfo = (data) => {
    return request({method:"post",url:"/editScoreLevInfo",data})
}

const getScoreLevByPage = (data) => {
    return request({method:"post",url:"/getScoreLevByPage",data})
}

export {editScoreLevInfo,getScoreLevByPage }