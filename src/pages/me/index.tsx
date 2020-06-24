import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtButton, AtSearchBar, AtIcon, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux'
import classnames from "classnames";

import { add, minus, asyncAdd } from '../../actions/counter'

import { signOut, getPlayList } from './services'

import './index.scss'


type ListItemInfo = {
  id: number;
  coverImgUrl: string;
  name: string;
  trackCount: number;
  playCount: number;
};

type PageStateProps = {
  counter: {
    num: number,
  },
  song: PlaySong
}

type PageDispatchProps = {
  add: () => void
  dec: () => void
  asyncAdd: () => any
}

type PageOwnProps = {}

type PageState = {
  searchValue: string;
  userInfo: {
    account: {
      id: number;
    };
    level: number;
    profile: {
      avatarUrl: string;
      backgroundUrl: string;
      nickname: string;
      eventCount: number;
      newFollows: number;
      followeds: number;
      userId: number;
    };
  };
  userCreateList: Array<ListItemInfo>,
  userCollectList: Array<ListItemInfo>,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
  props: IProps;
}

@connect(
  (state) => ({
    song: state.song,
  }),

  (dispatch) => ({
    add() {
      dispatch(add())
    },
    dec() {
      dispatch(minus())
    },
    asyncAdd() {
      dispatch(asyncAdd())
    }
  }))
class Index extends Component<IProps, PageState> {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)

    this.state = {
      searchValue: '',
      userInfo: Taro.getStorageSync('userInfo'),
      userCreateList: [],
      userCollectList: []

    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount() { }

  componentDidShow() { 
    if (!this.state.userInfo) {
      Taro.navigateTo({
        url: "/pages/login/index"
      });
      return;
    }
    this.getPlayList();
  }

  componentDidHide() { }

  goSearch() {
    Taro.navigateTo({
      url: `/pages/search/index`
    })
  }

  signOut() {
    Taro.clearStorage();
    signOut().then(res => {
      console.log(res)
    })

    // Taro.redirectTo({
    //   url: "/pages/login/index"
    // })
  }

  jumpPage() {
    Taro.navigateTo({
      url: `/pages/${name}/index`
    })
  }
  jumpEventPage() {
    const { userId } = this.state.userInfo.profile
    Taro.navigateTo({
      url: `/pages/myEvents/index?uid=${userId}`
    })
  }
  showToast() {
    Taro.showToast({
      title: '还没有实现',
      icon: 'none'
    })
  }

  goDetail({id, name}) {
    Taro.navigateTo({
      url: `/pages/playListDetail/index?id=${id}&name=${name}`
    })
  }

  getPlayList() {
    const { userId } = this.state.userInfo.profile
    getPlayList({uid: userId, limit: 300}).then(res => {
      console.log(res, 'getPlayList')
      if(res.playlist && res.playlist.length > 0) {
        this.setState({
          userCreateList: res.playlist,
          userCollectList: res.playlist
        })
      }
    })

  }

  render() {
    const { searchValue, userInfo, userCreateList } = this.state
    console.log(userCreateList, '-----------')
    if(!userInfo ) {
     return null
    }
    return (
      <View className={classnames({
        my_container: true,
        hasMusicBox: !!this.props.song.currentSongInfo.name
      })}>
        {/* 搜索框 */}
        <View>
          <AtSearchBar
            actionName='搜一下'
            value={searchValue}
            onChange={this.goSearch.bind(this)}
          />
        </View>


        {/* 用户信息栏 */}
        <View className="header">
          <View className="header__left">
            <Image className="header__img" src={`${userInfo.profile.avatarUrl}?imageView&thumbnail=250x0`} />

            <View className="header__info">
              <View className="header__info__name">
                {userInfo.profile.nickname}
              </View>
              <View>
                <Text className="header__info__level" >lv:0</Text>
              </View>
            </View>
          </View>

          <AtIcon value="share-2" size="25" color="#d43c33" className="exit_icon" onClick={this.signOut.bind(this)} />
        </View>
        {/* 关注 */}
        <View className="user_count">
          <View className="user_count__sub" onClick={this.jumpEventPage.bind(this)}>
            <View className="user_count__sub--num">
              {userInfo.profile.eventCount || 0}
            </View>
            <View>动态</View>
          </View>

          <View
            className="user_count__sub"
            onClick={this.jumpPage.bind(this, "myFocus")}
          >
            <View className="user_count__sub--num">
              {userInfo.profile.newFollows || 0}
            </View>
            <View>关注</View>
          </View>
          <View
            className="user_count__sub"
            onClick={this.jumpPage.bind(this, "myFans")}
          >
            <View className="user_count__sub--num">
              {userInfo.profile.followeds || 0}
            </View>
            <View>粉丝</View>
          </View>
        </View>


        {/* tab栏 */}
        <View className="user_brief">
          <View className="user_brief__item">
            <Image className="user_brief__item__img" src={require('../../assets/images/my/recent_play.png')} />
            <View className="user_brief__item__text" onClick={this.jumpPage.bind(this, 'recentPlay')}>
              <Text>最近播放</Text>
              <Text className="at-icon at-icon-chevron-right"></Text>
            </View>
          </View>
          <View className="user_brief__item">
            <Image
              className="user_brief__item__img"
              src={require("../../assets/images/my/my_radio.png")}
            />
            <View
              className="user_brief__item__text"
              onClick={this.showToast.bind(this)}
            >
              <Text>我的电台</Text>
              <Text className="at-icon at-icon-chevron-right"></Text>
            </View>
          </View>
          <View className="user_brief__item">
            <Image
              className="user_brief__item__img"
              src={require("../../assets/images/my/my_collection_icon.png")}
            />
            <View
              className="user_brief__item__text"
              onClick={this.showToast.bind(this)}
            >
              <Text>我的收藏</Text>
              <Text className="at-icon at-icon-chevron-right"></Text>
            </View>
          </View>
        </View>


        {/* 歌单 */}
        <View className="user_playlist">
          <View className="user_playlist__title">
            我的歌单
            <Text className="user_playlist__title__desc">{userCreateList.length}</Text>
          </View>

          {userCreateList.length == 0 ? <AtToast isOpened text="loading" icon="loading-3"></AtToast> : ''}

          <View>
            {userCreateList.map(item => (
              <View
                key={item.id}
                className="user_playlist__item"
                onClick={this.goDetail.bind(this, item)}
              >
                <Image
                  className="user_playlist__item__cover"
                  src={`${item.coverImgUrl}?imageView&thumbnail=250x0`}
                />
                <View className="user_playlist__item__info">
                  <View className="user_playlist__item__info__name">
                    {item.name}
                  </View>
                  <View className="user_playlist__item__info__count">
                    {item.trackCount}首, 播放{item.playCount}次
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
        
      </View>
    )
  }
}


export default Index as ComponentClass<PageOwnProps, PageState>
