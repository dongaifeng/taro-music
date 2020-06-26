import { UPDATESTATE, RESETPLAYLIST, GETPLAYLISTDETAIL } from '../constants/song'

const INITIAL_STATE = {
  currentSongInfo: {
    id: 0,
    name: '',
    ar: [],
    al: {
      picUrl: '',
      name: ''
    },
    url: '',
    lrcInfo: '',
    dt: 0, // 总时长，ms
    st: 0 // 是否喜欢
  },

  playListDetailInfo: {
    coverImgUrl: '',
    name: '',
    playCount: 0,
    tags: [],
    creator: {
      avatarUrl: '',
      nickname: ''
    },
    tracks: []
  },
  playListDetailPrivileges: [],
  canPlayList: []
}

export default function song(state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATESTATE:
      const { isPlaying } = action.payload
      return { ...state, isPlaying }


    // 重置store的播放列表
    case RESETPLAYLIST:
      return {
        ...state,
        playListDetailInfo: INITIAL_STATE.playListDetailInfo,
        playListDetailPrivileges: [],
        canPlayList: []
      }



    // 获取歌单详情
    case GETPLAYLISTDETAIL: 
      const { playListDetailInfo, playListDetailPrivileges } = action.payload
      const canPlayList = playListDetailInfo.tracks.filter((_, index) => {
        return playListDetailPrivileges[index].st !== -200
      })
      return {
        ...state,
        playListDetailInfo,
        playListDetailPrivileges,
        canPlayList
      } 


    default:
      return state
  }
}
