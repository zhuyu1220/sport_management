import axios from 'axios'
import nProgress from 'nprogress';
import {Message} from 'element-ui'
import store from '../store';
let request = axios.create({
    // 为所有的请求路径基础上添加一个/api 为后续的代理配置跨域做准备
    // baseURL: '/mock',
    timeout:3000
})

//对浏览器发出的请求做处理
request.interceptors.request.use((config) => {
    nProgress.start();
    console.log(store.state.user.token);
    // 如果仓库中有令牌 就给请求头添加上
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    
    return config;
},error => {
  Promise.reject(error)  
})
// 对服务器传回来的数据做处理  第一个回调参数是成功回调,第二个参数则是失败回调
request.interceptors.response.use((response) => {
  nProgress.done()

  return response;
   
  
 }, (error) => {
      /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (JSON.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    error.message = '连接服务器失败'
    }
  Message.error(error.message)
  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.resolve(error.response)

})
  


export default request;