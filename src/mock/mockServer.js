import Mock from 'mockjs'
// 导入mockjs 拦截ajax请求 生成模拟数据
//Mock.mock(url,method,data)

// 登录 获取领牌
Mock.mock('/login', 'post', (options) => {
    // console.log(typeof options.body,options.body.password);
    if (options.body.includes('zhangsan') && options.body.includes('12315456')) {
        return {
            code: 200,
        
                token:'token0001' 
            
        }
    } else {
        return {
            code: 400,
           message:'格式错误' 

        }
     }
      
})
// 获取用户信息
Mock.mock('/getUserInfo', 'get', () => { 
    return {
        code: 200,
        data: {
            name:'zhangsan' 
        }
    }
})
//退出
Mock.mock('/logout', 'get', () => {
    return {
        code: 200,
        data: {
            message:'退出成功' 
        }
    }
})