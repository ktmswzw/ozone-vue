import { deleteProduct, fetchList, save, upload } from '../../api/product'

const product = {
  state: {
    type: 0
  },

  mutations: {
    gotoType (state, type) {
      state.type = type
    }
  },

  actions: {
    SaveProduct ({commit}, info) {
      return new Promise((resolve, reject) => {
        save(info.id, info.name, info.description, info.model, info.images, info.price, info.type).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DeleteProduct ({commit}, id) {
      return new Promise((resolve, reject) => {
        deleteProduct(id).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    ListProduct ({commit}, query) {
      return new Promise((resolve, reject) => {
        fetchList(query).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    UploadFile ({commit}, formData) {
      return new Promise((resolve, reject) => {
        upload(formData).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default product
