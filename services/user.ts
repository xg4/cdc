import { request } from '../helpers'
import { User } from '../types'

export function getCurrentUser(): Promise<User> {
  return request.get('auth')
}

export function login(data: {
  username: string
  password: string
}): Promise<{ accessToken: string }> {
  return request.post('auth/signin', data)
}

export function signup(data: {
  username: string
  password: string
}): Promise<{ accessToken: string }> {
  return request.post('auth/signup', data)
}
