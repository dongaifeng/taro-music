import http from '../../http/http'

// 获取banner
export function login_api(data) {
  return http.get({
    url: '/login/cellphone',
    data
  })
}
