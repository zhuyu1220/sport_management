import Mock from 'mockjs'
// 导入mockjs 拦截ajax请求 生成模拟数据
//Mock.mock(url,method,data)

// 登录
Mock.mock('/login', 'post', () => {
        return {
            code: 200,
            data: {
                toekn:'token0001' 
            }
        }
})
// 获取用户信息
Mock.mock('/getUerInfo', 'post', (options) => {
    console.log(options);
    return {
        code: 200,
        data: {
            name:'zhangsan' 
        }
    }
})