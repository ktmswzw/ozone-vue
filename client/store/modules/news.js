import { save, deleteNews, fetchList } from '../../api/news'

const news = {
  state: {
  },

  mutations: {
  },

  actions: {
    SaveNews ({commit}, info) {
      return new Promise((resolve, reject) => {
        save(info.id, info.title, info.description, info.productId).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteNews ({commit}, id) {
      return new Promise((resolve, reject) => {
        deleteNews(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListNews ({commit}, query) {
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

export default news
