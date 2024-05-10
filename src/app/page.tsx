import houses from '@/data.json'
import Client from './client'

export default async function Page() {
  return <Client houses={houses} />
}
