import { fetchList, send, solved } from '../../api/inquiry'
const inquiry = {
  state: {
  },

  mutations: {
  },

  actions: {
    Send ({commit}, info) {
      return new Promise((resolve, reject) => {
        send(info.id, info.name, info.email, info.question).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    Solved ({commit}, id) {
      return new Promise((resolve, reject) => {
        solved(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    FetchList ({commit}, query) {
      return new Promise((resolve, reject) => {
        fetchList(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default inquiry
