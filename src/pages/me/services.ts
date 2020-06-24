import http from '../../http/http'

// 获取banner
export function signOut() {
  return http.get({
    url: '/logout',
  })
}
export function getPlayList(data) {
  return http.get({
    url: '/user/playlist',
    data
  })
}
