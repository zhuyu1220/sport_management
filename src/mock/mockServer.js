import Mock from 'mockjs'
// 导入mockjs 拦截ajax请求 生成模拟数据
//Mock.mock(url,method,data)

Mock.mock('/uploadExcel', 'post', () => {
    console.log('ok');
    
    return {
        code: 100,
        msg:'成功',
        data: {
            token: "ajkdljakljsdklajsd245da435s4d",
            userInfo: {
                username:"王五"
            }
        }
    }
})

// 分页获取教师账号列表
Mock.mock('/queryTeacherByPage', 'post', () => { 
    return {
        code: 100,
        msg:'成功',
        data: [{
            
                id: 1,
                state: 0,
                no: 111,
                name: '张三',
                gender: "1",
                height: "11",
                weight: "22",
                schoolCode: "1",
                phone: "1566666",
                pic: '22',
                isRegiste: "",
              
        }, { 
                id: 2,
                state: 1,
                no: 111,
                name: '张三',
                gender: "1",
                height: "11",
                weight: "22",
                schoolCode: "1",
                phone: "157777",
            pic: {
                    url:"blob:http://localhost:8080/cf98d9e6-b53f-4780-922a-0a2d251e91ce"
                },
                isRegiste: "",
        }],
        total:'20'
    }
})
// 获取教师信息
Mock.mock('/getTeacherById', 'post', () => { 
    return {
        code: 100,
        msg:'成功',
        data: {
               
                id: 1,
                state: 0,
                no: 111,
                name: '张三',
                gender: "1",
                height: "11",
                weight: "22",
                schoolCode: "1",
                phone: "1566666",
                pic:[ {
                url:"blob:http://localhost:8080/cf98d9e6-b53f-4780-922a-0a2d251e91ce"
                }],
                isRegiste: "",
              
        },
        total:'20'
    }
})
// 添加教师信息
Mock.mock('/editTeacherInfo', 'post', () => { 
    return {
        code: 100,
        msg:'成功',
        data: {
            
        }
    }
})
// 获取token 
Mock.mock('/homepage/user/login', 'post', () => {
    console.log('1111');
    
    return {
        code: 100,
        msg:'成功',
        data: {
            token: "ajkdljakljsdklajsd245da435s4d",
            userInfo: {
                username:"王五"
            }
        }
    }
})
// 获取菜单
Mock.mock('/getMenuByToken', 'get', () => { 
    return {
        code: 100,
        msg:'成功',
        data: {
            
        }
    }
})
import menu from '@/mock/menu'
Mock.mock('/system/menu/getMenuListAll', 'get', () => {
    console.log('后台菜单');
    
    return {
        code: 100, 
        msg: '成功',
        data: {
            menu
        }
    }
})
//退出
Mock.mock('/logout', 'get', () => {
    return {
        code: 100,
        msg:'成功',
        data: {
            
        }
    }
})
// 获取天气接口 
Mock.mock('/getWeather', 'get', () => {
    return {
       
            "code": "100",
            "msg": "通信成功",
            "data": {
                "sky": "晴",
                "temperature": "31℃",
                "pm": "1.4"
            }
        
    }
})
// 查询校园平台模块
Mock.mock('/getModules', 'get', () => { 
    return	{
      "code":"100",
       "msg":"通信成功",
        "data":["1","2","3"]
    }
})
//查看设备清单
Mock.mock('/getEquStatus', 'post', (data) => {
    return {
        "code":"100",
        "msg":"通信成功",
        "data":[
        {
        "no":"1",
        "equName":"测试设备1",
        "status":"0",
        "equDes":"无备注",
        "lastTime":"2022-04-12 10:15:48"
        },
        {
        "no":"2",
        "equName":"测试设备2",
        "status":"1",
        "equDes":"无备注",
        "lastTime":"2022-04-12 10:15:48"
        }
        ]
        }
})
//查询校园赛事计时系统_项目清单
Mock.mock('/getRaceProject', 'get', () => {
    return {
        "code": "100",
        "msg": "通信成功",
        "data": [
            {
                "name": "50米",
                "val": "50"
            },
            {
                "name": "100米",
                "val": "100"
            }
        ]
    }
    
})
/*
  @params  {"val":"1.10"}
  查看校园智道_个人活跃top5
  @params {"val":"2.11","code":""}
  查询校园赛事计时系统_成绩TOP10
*/
Mock.mock('/getTableVal', 'post', (data) => {
    return {
        "code":"100",
        "msg":"通信成功",
        "data":[
        [
        "排名",
        "姓名",
        "班级",
        "活跃时长"
        ],
        [
        "1",
        "张三",
        "六(1)",
        "1h"
        ]
        ]
    }
})
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
Mock.mock('/getChartVal', 'post', (data) => {

    return {
        "code":"100",
        "msg":"通信成功",
        "data":[
        [
        {
        "name":"大屏1",
        "x":"1",
        "y":"1"
        },
        {
        "name":"大屏1",
        "x":"2",
        "y":"1"
        },
        {
        "name":"大屏1",
        "x":"3",
        "y":"1"
        },
        {
        "name":"大屏1",
        "x":"4",
        "y":"1"
        }
        ],
        [
        {
        "name":"大屏2",
        "x":"1",
        "y":"2"
        },
        {
        "name":"大屏3",
        "x":"2",
        "y":"2"
        },
        {
        "name":"大屏4",
        "x":"3",
        "y":"2"
        },
        {
        "name":"大屏5",
        "x":"4",
        "y":"2"
        }
        ]
        ]
        }
})

// 查询组织机构信息
// /\/api\/basic*?/
Mock.mock(/\/system\/org\/queryParent*?/ , 'get', (data) => {
     console.log(data.url,1111111111);
     
    if (data.url.includes('-1') ) {
        return {
            "code": "100",
            "data": [
                {
                    "code": "schhol0001",
                    "id": "0",
                    "lev": "1",
                    "name": "双语小学",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                }],
            "dataSize": "12", "msg": "通信成功"
        }
    }
    if (data.url.includes('0')) {
        return {
            "code": "100",
            "data": [
                {
                    "code": "schhol0001",
                    "id": "1",
                    "lev": "2",
                    "name": "一年级",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
                {
                    "code": "schhol0001",
                    "id": "2",
                    "lev": "2",
                    "name": "二年级",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
                {
                    "code": "schhol0001",
                    "id": "3",
                    "lev": "2",
                    "name": "三年级",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
            
            ],
            "dataSize": "12", "msg": "通信成功"
        }
    }
    if (data.url .includes('1')) {
        return {
            "code": "100",
            "data": [
                {
                    "code": "schhol0001",
                    "id": "01",
                    "lev": "2",
                    "name": "一班",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
                {
                    "code": "schhol0001",
                    "id": "02",
                    "lev": "2",
                    "name": "二班",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
                {
                    "code": "schhol0001",
                    "id": "03",
                    "lev": "2",
                    "name": "三班",
                    "ope": "1-新增;2-修改;0-删除",
                    "parentId": "-1",
                    "state": "1",
                    "year": "学校不需要，年级和班级，这个字段存的是学年信息的年份"
                },
            
            ],
            "dataSize": "12", "msg": "通信成功"
        }
    }
  
})
// 添加/修改/删除学校年级班级接口
Mock.mock('/system/org/crud', 'post', (data) => {
    console.log(data,55555)
    return {
        "code": "100",
        "msg": "通信成功"
    }
    
})

//通过班级查询学生信息列表接口
Mock.mock('/getStudentByOrgId', 'post', (data) => {

    
    return {
        "code": "100",
        "data": [
            {
                "className": "一班",
                "gradeName": "一年级",
                "name": "张三",
                "no": "20220412"
            }
        ],
        "dataSize": "1",
        "dataTotal": "12",
        "msg": "通信成功"
    }
})

// 编辑角色
Mock.mock('/editRole', 'post', (data) => {  
    return {
        "code": "100",
        "data": [
            {
                "id": "1",
                "name": "校长",
                "ope": "1-新增;2-修改;0-删除",
                "state": "1"
            }
        ],
    
        "msg": "通信成功"
    }
})
// 获取单个角色信息
Mock.mock('/getRoleById', 'post', (data) => {  
    return {
        "code": "100",
        "data": [
            {
                "id": "1",
                "name": "校长",
                "ope": "1-新增;2-修改;0-删除",
                "state": "1"
            }
        ],
    
        "msg": "通信成功"
    }
})
// 获取所有角色信息
Mock.mock('/system/Role/getAllroles', 'get', (data) => {  
    return {
        "code": "100",
        "data": [
            {
                "id": "1",
                "name": "校长",
                "ope": "1-新增;2-修改;0-删除",
                "state": "1"
            }
        ],
    
        "msg": "通信成功"
    }
})
// (3)查询当前机构下的角色
Mock.mock('/getRolesByOrgId', 'post', (data) => {  
    return {
        "code": "100",
        "data":
            [
                {
                "id": "1",
                "name": "校长",
                "state": "1"
                },{
               
                    "id": "2",
                    "name": "教导主任",
                    "state": "1"
                }
            ],
           "dataSize": "2", "msg": "通信成功"
    }
})

// 角色和学校架构关联接口
Mock.mock('/editRoleOrgLinkInfo', 'post', (data) => {  
    return {
        "code": "100",
       "msg": "通信成功"
    }
})
// ----------------------菜单管理-----------------------------
Mock.mock('getMenuListByParentId', 'post', (data) => {
    return {
        "code": "100",
        "msg": "通信成功",
        data: {
            list: [
                {
                    "id": 1,
                    "parentId": 0,
                    "createTime": "2020-02-02T06:50:36.000+00:00",
                    "title": "首页",
                    "level": 0,
                    "sort": 0,
                    "name": "pms",
                    "icon": "product",
                    "hidden": 0
                  },
                  {
                    "id": 7,
                    "parentId": 0,
                    "createTime": "2020-02-02T08:54:07.000+00:00",
                    "title": "系统管理",
                    "level": 0,
                    "sort": 0,
                    "name": "oms",
                    "icon": "order",
                    "hidden": 0
                  },
                  {
                    "id": 12,
                    "parentId": 0,
                    "createTime": "2020-02-04T08:18:00.000+00:00",
                    "title": "校园天地",
                    "level": 0,
                    "sort": 0,
                    "name": "sms",
                    "icon": "sms",
                    "hidden": 0
                  },
                  {
                    "id": 21,
                    "parentId": 0,
                    "createTime": "2020-02-07T08:29:13.000+00:00",
                    "title": "跑步计时",
                    "level": 0,
                    "sort": 0,
                    "name": "ums",
                    "icon": "ums",
                    "hidden": 0
                  }
            ]
        }
    }
})
Mock.mock('editMenuInfo', 'post', (data) => {
    return {
        "code": "100",
        "msg": "通信成功",
      
    }
})


