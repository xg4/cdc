import { request } from '../helpers'

export function getRequestCount(): Promise<number> {
  return request.get('request/count')
}

export function refreshHouses() {
  return request.get('request')
}
