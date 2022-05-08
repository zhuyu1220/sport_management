import request from '@/api/request2'
const editWristbandInfo = (data) => {
    return request({method:'post',url:"/Running/Wristband/edit",data})
} 
const queryWristbandByPage = (data) => {
    return request({method:'post',url:"/Running/Wristband/queryWristbandByPage",data})
} 
const getWristBandById = (params) => {
    return request({method:'get',url:"/Running/Wristband/queryWristbandById",params})
} 
 
export {editWristbandInfo,queryWristbandByPage,getWristBandById}