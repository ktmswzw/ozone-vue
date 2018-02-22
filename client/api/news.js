/**
 * Created by vincent on 4/30/17.
 */
import { fetch } from '../utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/api/news',
    method: 'get',
    params: query
  })
}

export function deleteNews (id) {
  return fetch({
    url: '/api/news',
    method: 'delete',
    params: {id: id}
  })
}

export function save (id, title, description, productId) {
  const data = {
    id,
    title,
    description,
    productId
  }
  return fetch({
    url: '/api/news',
    method: 'post',
    params: data
  })
}
