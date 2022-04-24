
 import { login } from '@/api'


const state = {
    // 保证页面刷新时候  仓库可以一直获取到令牌
    token: localStorage.getItem('TOKEN'),
    // userInfo: JSON.parse(localStorage.getItem('userInfo')),
    userInfo:JSON.parse(localStorage.getItem('userInfo')),
    roleCode:[]
    // 后端返回给我的是该角色所拥有的路由
}
const mutations = {
    USERLOGIN(state, data) {
        state.token = data.token;
        state.userInfo = data.userInfo;
        state.roleCode = data.roleCode;
    },
    USERCLEAR(state) {    
        state.userInfo = {}
        state.token = ''
        state.roleCode = []
        localStorage.removeItem('userInfo')
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 获取令牌 并将其本地持久化
    async userLogin({commit},data) {
        let result = await login(data)
        console.log(result.data.data.userInfo,456);
        
        if (result.data.code) {
            localStorage.setItem("TOKEN", result.data.data.token);
            localStorage.setItem("userInfo",JSON.stringify(result.data.data.userInfo))
            commit('USERLOGIN', result.data.data)
            return Promise.resolve(result.data.data)
        } else {
            return Promise.reject(new Error('失败'))
        }
        // console.log(result)
    },

    logout({ commit }) {
      commit('USERCLEAR')
          
    }
}

const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}