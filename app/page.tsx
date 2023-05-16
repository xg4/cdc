import { getHouses } from '@/server/services'
import Client from './client'

export default async function Page() {
  const houses = await getHouses()

  return <Client houses={houses} />
}
