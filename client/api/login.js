import { fetch } from '../utils/fetch'

export function loginByPhone (phone, password) {
  const data = {
    phone,
    password
  }
  return fetch({
    url: '/api/user/login',
    method: 'post',
    params: data
  })
}

export function logout () {
  return fetch({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function fetchUser (query) {
  return fetch({
    url: '/user',
    method: 'get',
    params: query
  })
}

export function setManager (id) {
  return fetch({
    url: 'user',
    method: 'patch',
    params: {id: id}
  })
}

export function offManager (id) {
  return fetch({
    url: 'user',
    method: 'delete',
    params: {id: id}
  })
}
