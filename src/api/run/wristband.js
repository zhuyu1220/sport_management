import request from '@/api/request2'
const editWristbandInfo = (data) => {
    return request({method:'post',url:"/editWristbandInfo",data})
} 
const queryWristbandByPage = (data) => {
    return request({method:'post',url:"/queryWristbandByPage",data})
} 
const getWristBandById = (data) => {
    return request({method:'post',url:"/getWristBandById",data})
} 
 
export {editWristbandInfo,queryWristbandByPage,getWristBandById}