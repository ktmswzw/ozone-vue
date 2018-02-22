import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAnalytics from 'vue-analytics'
import * as filters from './filters'
import { TOGGLE_SIDEBAR } from 'vuex-store/mutation-types'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage)
Vue.router = router
Vue.use(VueAxios, axios)
Vue.use(VueAnalytics, {
  id: 'UA-104086460-1'
})
Vue.use(ElementUI)
Vue.use(NProgress)

window.IMAGE_GET = process.env.SERVER_API + '/download/image/'

// Enable devtools
Vue.config.devtools = true

sync(store, router)

const {state} = store

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const whiteList = ['/', '/login', '/webHome', '/home', '/webInquiry', '/webFactory', '/webContact', '/webProducts', '/webNews', '/webAbout']// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (state.app.device.isMobile && state.app.sidebar.opened) {
    store.commit(TOGGLE_SIDEBAR, false)
  } else {
    store.commit(TOGGLE_SIDEBAR, true)
  }
  if (state.user.token) {
    // console.log(to.path + '====已登陆不跳转')
    const size = to.path.indexOf('/product')
    if (size !== -1) {
      store.commit('gotoType', to.path.substr(9, 1))
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log(to.path + '====直接进入')
      next()
    } else {
      // console.log(to.path + '====重定向登陆')
      NProgress.done()
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
