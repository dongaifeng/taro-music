import {
  UPDATESTATE,
  RESETPLAYLIST,
  GETPLAYLISTDETAIL
} from '../constants/song'
import http from '../http/http'

export const updateState = (payload) => ({
  type: UPDATESTATE,
  payload
})


export const getPlayListDetail = payload => {
  console.log(payload)
  const {id } = payload

  return dispatch => {

    // 重置store的播放列表
    dispatch({
      type: RESETPLAYLIST
    })


    // 获取播放列表
    http.get({
      url: '/playlist/detail',
      data: { id }
    }).then(res => {
      
      const playListDetailInfo = res.playlist
      playListDetailInfo.tracks = playListDetailInfo.tracks.map((item) => {
        const temp: any = {}
        temp.name = item.name
        temp.id = item.id
        temp.ar = item.ar
        temp.al = item.al
        temp.copyright = item.copyright
        return temp
      })

      // 保存 播放列表
      dispatch({
        type: GETPLAYLISTDETAIL,
        payload: {
          playListDetailInfo,
          playListDetailPrivileges: res.privileges
        }
      }) 
    })

    
  }
}