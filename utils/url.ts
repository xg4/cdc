export function getUrlQuery(url: string) {
  return Object.fromEntries(new URL(url).searchParams.entries())
}
