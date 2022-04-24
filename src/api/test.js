import request from '@/api/request2'

 const test = (data) => {
    return request({method:'post',url:"/edu-control/Test",data})
}
export {test}