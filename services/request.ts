import { request } from '../utils'

export function getRequestCount(): Promise<number> {
  return request.get('/requests/count')
}

export function refreshHouses(page = 1): Promise<string> {
  return request.post('/requests', { page })
}
