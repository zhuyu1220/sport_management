
 import { login,logout } from '@/api'


const state = {
    // 保证页面刷新时候  仓库可以一直获取到令牌
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
    // 后端返回给我的是该角色所拥有的路由
}
const mutations = {
    USERLOGIN(state, data) {
        state.token = data.token;
        state.userInfo = data
    },
    USERCLEAR(state) {    
        state.userInfo = {}
        state.token = ''
        localStorage.removeItem('TOKEN')
    }
}
const actions = {
    // 获取令牌 并将其本地持久化
    async userLogin({commit},data) {
        let result = await login(data)
        if (result.data.code) {
            localStorage.setItem("TOKEN",result.data.data.token)
            commit('USERLOGIN', result.data.data)
            return Promise.resolve(result.data.data)
        } else {
            return Promise.reject(new Error('失败'))
        }
        // console.log(result)
    },

    async logout({ commit }) {
        const result = await logout();
        if (result) {
            commit('USERCLEAR')
            return Promise.resolve()
        } else {
            return Promise.reject(new Error('失败'))
        }
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