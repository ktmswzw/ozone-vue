import Vue from 'vue'
import Router from 'vue-router'
// import menuModule from 'vuex-store/modules/menu'
import home from '../views/Home.vue'
import layout from '../components/layout/Layout.vue'
Vue.use(Router)

export default new Router({
  mode: 'hash', // Demo is living in GitHub.io, so required!
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: '运营',
      path: '/layout',
      component: layout,
      redirect: '/home',
      hidden: true,
      children: [
        {
          name: '首页',
          path: '/home',
          component: home,
          hidden: true
        },
        {
          name: '新闻',
          path: '/news',
          component: require('../views/auth/News')
        },
        {
          name: '询盘',
          path: '/inquiry',
          component: require('../views/auth/Inquiry')
        },
        {
          name: '产品&工厂',
          path: '/product/:type',
          component: require('../views/auth/Product')
        },
        {
          name: '公众号用户',
          path: '/user',
          component: require('../views/auth/User.vue')
        }
        // ,...generateRoutesFromMenu(menuModule.state.items)
      ]
    },
    {
      name: '登陆',
      path: '/login',
      component: require('../views/auth/Login')
    },
    {
      name: 'WebHome',
      path: '/',
      redirect: '/webFactory',
      component: require('../views/web/WebHome'),
      children: [
        {
          name: '工厂介绍',
          path: '/webFactory',
          component: require('../views/web/Factory'),
          hidden: true
        },
        {
          name: '产品介绍',
          path: '/webProducts',
          component: require('../views/web/Products'),
          hidden: true
        },
        {
          name: '公司新闻',
          path: '/webNews',
          component: require('../views/web/News'),
          hidden: true
        },
        {
          name: '关于我们',
          path: '/webAbout',
          component: require('../views/web/AboutUs'),
          hidden: true
        },
        {
          name: '客户询盘',
          path: '/webInquiry',
          component: require('../views/web/Inquiry'),
          hidden: true
        },
        {
          name: '联系我们',
          path: '/webContact',
          component: require('../views/web/Contact'),
          hidden: true
        }
      ]
    }
  ]
})
//
// // Menu should have 2 levels.
// function generateRoutesFromMenu (menu = [], routes = []) {
//   for (let i = 0, l = menu.length; i < l; i++) {
//     let item = menu[i]
//     if (item.path) {
//       routes.push(item)
//     }
//     if (!item.component) {
//       generateRoutesFromMenu(item.children, routes)
//     }
//   }
//   return routes
// }
