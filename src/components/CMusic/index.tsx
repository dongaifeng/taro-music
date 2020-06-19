import Taro, {useState, FC, memo } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtIcon, AtFloatLayout } from 'taro-ui'
import classnames from 'classnames' // 动态class插件

import './index.scss'



type IProps = {
  isHome?: boolean,
  onUpdatePlayStatus: (object) => any,
  songInfo: {
    currentSongInfo: currentSongInfoType;
    isPlaying: boolean;
    canPlayList: Array<MusicItemType>;
  };
}



const CMusic: FC<IProps> = ({ songInfo, isHome, onUpdatePlayStatus }) => {
  let { currentSongInfo, isPlaying, canPlayList } = songInfo;



  return (
    <View className={classnames({
      music_components: true,
        isHome: isHome
    })}>
      <Image
        className={classnames({
          music__pic: true,
          "z-pause": false,
          circling: isPlaying
        })}
        src={currentSongInfo.al.picUrl}
      />

      <View className="music__info">
      <View className="music__info__name">{currentSongInfo.name}</View>
        <View className="music__info__desc">
          {currentSongInfo.ar[0] ? currentSongInfo.ar[0].name : ''} -{' '}
          {currentSongInfo.al.name}
        </View>
      </View>
    </View>
  )
}

CMusic.defaultProps = {
  songInfo: {
    currentSongInfo: {
      id: 0,
      name: "",
      ar: [],
      al: {
        picUrl: "",
        name: ""
      },
      url: "",
      lrcInfo: "",
      dt: 0, // 总时长，ms
      st: 0 // 是否喜欢
    },
    canPlayList: [],
    isPlaying: false
  }
}

// 通过memo来避免不必要的渲染,提高响应速度
export default memo(CMusic, (prevProps, nextProps) => {
  console.log("prevProps =>", prevProps);
  console.log("nextProps =>", nextProps);

  if(
    nextProps.songInfo.isPlaying !== prevProps.songInfo.isPlaying || 
    nextProps.songInfo.currentSongInfo.name !== prevProps.songInfo.currentSongInfo.name
  ) {
    return false // 返回false本次则会渲染，反之则不会渲染
  }

  return true
})









// export default class CMusic extends Component<IProps, PageState> {

//   config: Config = {
//     navigationBarTitleText: '首页'
//   }

//   constructor(props){
//     super(props)
//     this.state = {
//       isOpened: false
//     }
//   }


//   render () {
//     if ( !this.props.songInfo ) return <View>无内容</View>
//     const { currentSongInfo } = this.props.songInfo
//     return (
//       <View className={classnames({
//         music_components: true,
//         isHome: this.props.isHome
//       })}>
        
//         <Image 
//           className={classnames({
//             music__pic: true,
//             'z-pause': false,
//           })}
//           src={currentSongInfo.al.picUrl+'?imageView&thumbnail=80x80'}
//         />


//       </View>
//     )
//   }
// }