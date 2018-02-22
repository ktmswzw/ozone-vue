
import Cookies from 'js-cookie'
import { fetchUser, loginByPhone, logout, offManager, setManager } from '../../api/login'

const user = {
  state: {
    name: '',
    token: Cookies.get('XECODER-TOKEN')
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    LOGOUT_USER: (state) => {
      state.token = undefined
    }
    // increment: state => state.count++
  },

  actions: {
    LoginByPhone ({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        loginByPhone(userInfo.phone, userInfo.password).then(response => {
          const data = response.result
          Cookies.set('XECODER-TOKEN', data._jwt)
          commit('SET_TOKEN', data._jwt)
          commit('SET_NAME', userInfo.phone)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut ({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('LOGOUT_USER')
          Cookies.remove('XECODER-TOKEN')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询用户
    FetchUser ({commit}, query) {
      return new Promise((resolve, reject) => {
        fetchUser(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetManager ({commit}, id) {
      return new Promise((resolve, reject) => {
        setManager(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    OffManager ({commit}, id) {
      return new Promise((resolve, reject) => {
        offManager(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default user
