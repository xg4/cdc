export default function buildUrl(url: string, params?: Record<string, any>) {
  if (!params) {
    return url
  }

  const serializedParams =
    typeof URLSearchParams !== 'undefined'
      ? new URLSearchParams(params).toString()
      : Object.entries(params)
          .map(p => p.map(encodeURIComponent).join('='))
          .join('&')

  if (serializedParams) {
    const hashmarkIndex = url.indexOf('#')

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}
