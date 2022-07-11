import { request } from '../helpers'

export function getRequestCount(): Promise<number> {
  return request.get('/requests/count')
}

export function refreshHouses() {
  return request.get('/requests')
}
