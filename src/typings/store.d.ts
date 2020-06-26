
interface Song {
  name: string
  id: number
  alia: Array<string>
  ar: Array<Artist>
  al: Album
  dt: number // 总时长，ms
  st: number // 是否喜欢 0/1
  copyright: number
  current?: boolean // 当前播放
}


interface songType {
  playListDetailInfo: playListDetailInfoType
  playListDetailPrivileges: Array<{
    st: number
  }>
  // 可播放歌曲列表
  canPlayList: Array<MusicItemType>
  // 是否正在播放
  isPlaying: boolean
  // 推荐歌单
  recommendPlayList: Array<{}>
  // 推荐歌单
  recommendDj: Array<{}>
  // 推荐新音乐
  recommendNewSong: Array<{}>
  // 推荐精彩节目
  recommend: Array<{}>
  // 我创建的歌单
  myCreateList: Array<{}>
  // 我收藏的歌单
  myCollectList: Array<{}>
  // 当前播放的歌曲id
  currentSongId: string
  // 当前播放的歌曲详情
  currentSongInfo: currentSongInfoType
  // 当前播放的歌曲在播放列表中的索引,默认第一首
  currentSongIndex: number
  // 播放模式
  playMode: 'loop' | 'one' | 'shuffle'
  // 喜欢列表
  likeMusicList: Array<number>
  recentTab: number
}

interface playListDetailInfoType {
  coverImgUrl: string
  playCount: number
  name: string
  description?: string
  tags: Array<string | undefined>
  creator: {
    avatarUrl: string
    nickname: string
  }
  tracks: Array<MusicItemType>
}

interface MusicItemType {
  name: string
  id: number
  ar: Array<{
    name: string
  }>
  al: {
    name: string
  }
  song: {
    id: number
  }
  copyright: number
  st?: number
  current?: boolean
}

interface Album {
  name: string
  id: number
  picUrl: string
  blurPicUrl: string
  songs: Array<Song>
  artist: Artist
  artists: Array<Artist>
}

interface Artist {
  name: string
  id: number
  picUrl: string
}


interface PlaySong {
  // 可播放歌曲列表
  canPlayList: Array<Song>
  // 是否正在播放
  isPlaying: boolean
  // 当前播放的歌曲id
  currentSongId: string
  // 当前播放的歌曲详情
  currentSongInfo: Song
  // 当前播放的歌曲在播放列表中的索引,默认第一首
  currentSongIndex: number
  // 播放模式
  playMode: 'loop' | 'one' | 'shuffle'
  // 喜欢列表
  recentTab: number
}

interface Banner{
  pic: string
  targetType: number // 1歌曲 10专辑 3000h5
  targetId: number //
  url?: string
  typeTitle: string
}



declare namespace API {
  export interface Response {
    data: any
    errMsg: string
    statusCode: number
    header: any
    cookies: Array<{
      name: string
      value: string
      expires: string
      path: string
    }>
  }
}





interface currentSongInfoType {
  id: number
  name: string
  ar: Array<{
    name: string
  }>
  al: {
    picUrl: string
    name: string
  }
  url: string
  lrcInfo: any
  dt: number // 总时长，ms
  st: number // 是否喜欢
}

interface MusicItemType {
  name: string
  id: number
  ar: Array<{
    name: string
  }>
  al: {
    name: string
  }
  song: {
    id: number
  }
  copyright: number
  st?: number
  current?: boolean
}