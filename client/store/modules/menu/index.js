import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

const state = {
  items: [
    {
      name: '询盘管理',
      path: '/inquiry',
      meta: {
        icon: 'fa-rocket',
        link: 'auth/Inquiry.vue'
      },
      component: lazyLoading('product', true)
    },
    {
      name: '新闻管理',
      path: '/news',
      meta: {
        icon: 'fa fa-newspaper-o',
        link: 'auth/News.vue'
      },
      component: lazyLoading('news', true)
    },
    {
      name: '产品管理',
      path: '/product/0',
      meta: {
        icon: 'fa fa-linode',
        link: 'auth/Product.vue'
      },
      component: lazyLoading('product', true)
    },
    {
      name: '工厂图片',
      path: '/product/1',
      meta: {
        icon: 'fa fa-picture-o',
        link: 'auth/Product.vue'
      },
      component: lazyLoading('product', true)
    },
    {
      name: '公众号',
      path: '/user',
      meta: {
        icon: 'fa fa-picture-o',
        link: 'auth/User.vue'
      },
      component: lazyLoading('user', true)
    }
  ]
}

const mutations = {
  [types.EXPAND_MENU] (state, menuItem) {
    if (menuItem.index > -1) {
      if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
        state.items[menuItem.index].meta.expanded = menuItem.expanded
      }
    } else if (menuItem.item && 'expanded' in menuItem.item.meta) {
      menuItem.item.meta.expanded = menuItem.expanded
    }
  }
}

export default {
  state,
  mutations
}
