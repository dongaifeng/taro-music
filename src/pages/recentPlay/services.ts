import http from '../../http/http'


export function getRecordList(data) {
  return http.get({
    url: '/user/record',
    data
  })
}
