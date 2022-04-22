import request from '@/api/request2'
/*
 {val:1.1.0}
 三个数值有着不同含义  
 第一个数值 1:智道 2:计时系统 3:Ai系统  
 第二个数值 1:表格 2:图表  
 第三个数值 表格序号 图标序号
 */

//获取天气接口
const getWeather = () => {
   return request({method:'get',url:"/getWeather"})
} 
//查询校园平台模块
const getModules = () => {
   return request({method:'get',url:"/getModules"})
} 
//查看设备清单
const getEquStatus = (data) => {
   return request({method:'post',url:"/getEquStatus",data})
} 
/*
查询校园赛事计时系统_项目清单  
*/
const getRaceProject = () => {
   return request({method:'get',url:"/getRaceProject"}) 
} 
/*
  @params  {"val":"1.10"}
  查看校园智道_个人活跃top5
  @params {"val":"2.11","code":""}
  查询校园赛事计时系统_成绩TOP10
*/
const getTableVal = (data) => {
   return request({method:'post',url:"/getTableVal",data})
} 

/*
   @params  {"val":"1.20"}
   查看校园智道_大屏七日使用人次
   @params {"val":"3.21"}
   查询校园AI体测系统_班级使用top5
   @params{"val":"3.22"}
   查询校园AI体测系统_七日使用人次
   @params{"val":"3.23"}
   查询校园AI体测系统_活跃时间分布
 
*/
const getChartVal = (data) => {
   return request({method:'post',url:"/getChartVal",data})
} 

export  {getWeather,getModules,getEquStatus,getRaceProject,getTableVal,getChartVal}