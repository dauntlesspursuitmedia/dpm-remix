/* eslint-disable no-param-reassign */
export const normalizePath = (path: string) => {
  if (!path?.endsWith(`/`)) {
    path = `${path}/`
  }

  if (!path?.startsWith(`/`)) {
    path = `/${path}`
  }

  return path
}
