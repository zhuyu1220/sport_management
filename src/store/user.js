
 import { login, getUserInfo,logout } from '@/api'


const state = {
    // 保证页面刷新时候  仓库可以一直获取到令牌
    token: localStorage.getItem('TOKEN'),
    userInfo:{}
}
const mutations = {
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, data) {
        state.userInfo  = data
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
        if (result.data.code == 200) {
            localStorage.setItem("TOKEN",result.data.token)
            commit('USERLOGIN',result.data.token)
        } else {
            return Promise.reject(new Error('失败'))
        }
        // console.log(result)
    },
    async getUserInfo({ commit }) {
        let result = await getUserInfo()
        if (result.data.code == 200) {
            commit('USERINFO',result.data.data)
        } else {
            return Promise.reject(new Error('失败'))
        }
    },
    async logout({ commit }) {
        const result = await logout();
        if (result.data.code == 200) {
            commit('USERCLEAR')
        } else {
            return Promise.reject(new Error('失败'))
        }
    }
}

const getters = {

}

export default {
    state,
    mutations,
    actions,
    getters
}