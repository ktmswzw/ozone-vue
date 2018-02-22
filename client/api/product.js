/**
 * Created by vincent on 4/30/17.
 */
import { fetch } from '../utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/api/product',
    method: 'get',
    params: query
  })
}

export function deleteProduct (id) {
  return fetch({
    url: '/api/product',
    method: 'delete',
    params: {id: id}
  })
}

export function save (id, name, description, model, images, price, type) {
  const data = {
    id,
    name,
    model,
    price,
    description,
    images,
    type
  }
  return fetch({
    url: '/api/product',
    method: 'post',
    params: data
  })
}

export function upload (formData) {
  return fetch({
    url: '/api/product/upload',
    method: 'post',
    data: formData
  })
}
