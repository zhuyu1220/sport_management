import { getMenuListAll } from '@/api'
console.log(getMenuListAll,1111111111);

import { asyncRouterMap, constantRouterMap } from '@/router/index';
function generateAsyncRoute(menus, asyncRouterMap) {
    let asyncRouter = {
      path: "/",
      component: () => import("@/layout/index.vue"),
      children: [],
    };
  //  根据后端返回的路由 和前端写好的全部路由  比较筛选出 动态路由
  // 好处在于:格式已经写好了 前端可以添加一些非菜单类的路由
    asyncRouterMap[0].children.forEach((item) => {
      if (item.hidden) {
        asyncRouter.children.push(item);
      } else {
        let res = menus.find((menu) => item.url == menu.url);
        if (res) {
          asyncRouter.children.push(item);
        }
      }
    });
    console.log(asyncRouter);
    return asyncRouter;
 
}
//将后端返回的路由数组 形式转化为树形结构形式
// 不仅仅如此 还需要对数组进行排序 已经过滤掉hidden的菜单
function treeing (arr) {
    let tree = []
    const map = {}
    for (let item of arr) {
      // 一个新的带children的结构
      let newItem = map[item.id] = {
        ...item,
        children: []
      }
      if (map[item.parentId]) { // 父节点已存进map则在父节点的children添加新元素
        let parent = map[item.parentId]
        parent.children.push(newItem)
      } else { // 没有父节点，在根节点添加父节点
        tree.push(newItem)
      }
    }
    return tree
}

function sortTree(arr) { 
  arr.forEach((item) => {
    item.children?.sort(compare('sort'));
       item?.children?.forEach(item2=>{
           item2?.children?.sort(compare('sort'));
        })
  });

  arr.sort(compare('sort'))
  return arr
}
function compare(p) { 
  return function (m, n) {
    return m[p] - n[p]
  }
}
// 
const state = {
     //基础路由
     routers: constantRouterMap,
     // 动态路由
    addRouters: [],
    //  左侧菜单
   menu: JSON.parse(localStorage.getItem('menu'))

}
const mutations = {
    SET_ROUTERS: (state, routers) => {
        state.addRouters = routers;
        state.routers = constantRouterMap.concat(routers);
    },
    SET_MENU: (state, menu) => {
      state.menu = menu;
      localStorage.setItem('menu',JSON.stringify(menu))
    }
}

const actions = {
    // 生成动态路由
    async generateRoutes({ commit },data) {
        // 从后端获取左侧菜单数据 将asyncRouter中的路由hidden为falsy的过滤掉  以及返回中不存在值 
        // getMenuListAll.then(res => {
        //   const asyncRoute = generateAsyncRoute(res,data.data, asyncRouterMap)
        //   commit('SET_ROUTERS',asyncRoute)
        // })
           

    },
    // 生成菜单
  async generateLeftMenu({ commit }, data) {
            // const menu = treeing(data)
            // commit('SET_MENU',menu)
    // getMenuListAll.then(res => {
    //     console.log(res,1111111111);
        
    //      commit('SET_MENU',sortTree(res.data.data))
    //    })
    const res = await getMenuListAll()
    let menu = treeing(res.data.data)
    commit('SET_MENU',menu)
      
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