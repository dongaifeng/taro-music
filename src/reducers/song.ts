import { UPDATESTATE } from '../constants/song'

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
}

export default function song (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATESTATE:
      const { isPlaying } = action.payload
      return {...state, isPlaying }
   
    
     default:
       return state
  }
}
