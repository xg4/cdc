export default function buildURL(url: string, params?: Record<string, any>) {
  if (!params) {
    return url
  }

  const hashmarkIndex = url.indexOf('#')

  if (hashmarkIndex !== -1) {
    url = url.slice(0, hashmarkIndex)
  }

  const serializerParams = new URLSearchParams(params).toString()

  if (serializerParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializerParams
  }

  return url
}
