import router from "./router";
import store from './store'
import { Message } from "element-ui";
import NProgress from "nprogress";
import 'nprogress/nprogress'
import getPageTitle from "./utils/get-page-title";
// 负责页面跳转这一块的各种配置

// 白名单 就是不需要登录 就可以跳转的页面
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
    NProgress.start()
    document.title = getPageTitle(to.meta.title)
    console.log('获取token之前');
    
    const token = localStorage.getItem('TOKEN')
    if (token) {
        console.log('token有咯');
        // 登录了  跳转登录页面 的话就帮你 重定向到首页
        if (to.path =='/login') {
            next( '/home' )
            NProgress.done()
        } else {
                next()
        }
    } else {
        // 如果没登录
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
            NProgress.done()
        }
    }
})
router.afterEach(() => {
    // finish progress bar
    NProgress.done()
  })