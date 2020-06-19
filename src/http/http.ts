import Taro from '@tarojs/taro'
import qs from 'qs'

export const IS_DEV = process.env.NODE_ENV === 'development'
export const BASE_URL = IS_DEV ? 'http://localhost:3000' : 'http://localhost:3000'

export const HTTP_ERROR = {
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
}

/**
 * 检查http状态值
 * @param response
 * @returns {*}
 */
function checkHttpStatus(response: API.Response, resolve, reject) {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    resolve(response.data)
  } else {
    const message = HTTP_ERROR[response.statusCode] || `ERROR CODE: ${response.statusCode}`
    response.data.errorCode = response.statusCode
    response.data.error = message
    reject(response.data)
  }
}

function setCookie(response: API.Response) {
  if (response.cookies && response.cookies.length > 0) {
    let cookies = ''
    response.cookies.forEach((cookie, index) => {
      // windows的微信开发者工具返回的是cookie格式是有name和value的,在mac上是只是字符串的
      if (cookie.name && cookie.value) {
        cookies += index === response.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
      } else {
        cookies += `${cookie};`
      }
    });
    Taro.setStorageSync('cookies', cookies)
  }
  if (response.header && response.header['Set-Cookie']) {
    Taro.setStorageSync('cookies', response.header['Set-Cookie'])
  }
  return response
}

export default {
  request(options: any, method?: string) {
    const { url } = options

    return new Promise((resolve, reject) => {
      Taro.request({
        ...options,
        method: method || 'GET',
        url: `${BASE_URL}${url}`,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          cookie: Taro.getStorageSync('cookies'),
          ...options.header
        },
      }).then(setCookie)
        .then((res) => {
          checkHttpStatus(res, resolve, reject)
        })
    })
  },
  get(options: any) {
    return this.request({
      ...options
    })
  },
  post(options: any) {
    return this.request({
      ...options,
      data: qs.stringify(options.data)
    }, 'POST')
  },
  put(options: any) {
    return this.request({
      ...options,
      data: qs.stringify(options.data)
    }, 'PUT')
  },
  delete(options: any) {
    return this.request({
      ...options,
      data: qs.stringify(options.data)
    }, 'DELETE')
  }
}