import { getHouses } from '@/server/services'
import Client from './client'

export const revalidate = 60 * 60 * 12

export default async function Page() {
  const houses = await getHouses()
  return <Client houses={houses} />
}
