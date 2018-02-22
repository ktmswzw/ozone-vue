
import { fetch } from '../utils/fetch'

export function fetchList (query) {
  return fetch({
    url: '/api/inquiry',
    method: 'get',
    params: query
  })
}

export function solved (id) {
  return fetch({
    url: '/api/inquiry',
    method: 'patch',
    params: {id: id}
  })
}

export function send (id, name, email, question) {
  const data = {
    id,
    name,
    email,
    question
  }
  return fetch({
    url: '/api/inquiry',
    method: 'post',
    params: data
  })
}
