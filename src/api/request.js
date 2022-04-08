import axios from 'axios'
import nProgress from 'nprogress';

let request = axios.create({
    // 为所有的请求路径基础上添加一个/api 为后续的代理配置跨域做准备
    baseURL: "/api",
    timeout:5000
})

// 对浏览器发出的请求做处理
request.interceptors.request.use((config) => {
    nProgress.start();
    return config;
})
// 对服务器传回来的数据做处理  第一个回调参数是成功回调,第二个参数则是失败回调
request.interceptors.response.use((data) => {
    nProgress.done()

    return data;
  
 }, (res) => {
  
})
  


export default request;