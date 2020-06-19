import http from '../../http/http'

// 获取banner
export function getBannerDao() {
  return http.get({
    url: '/banner?type=2',
  })
}

// 获取推荐歌单
export function getRecommendPlayListDao() {
  return http.get({
    url: '/personalized',
  })
}

// 获取推荐电台
export function getRecommendDjDao() {
  return http.get({
    url: '/personalized/djprogram',
  })
}