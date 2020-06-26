import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import classnames from "classnames";
import { connect } from "@tarojs/redux";

import "./index.scss";

import { getPlayListDetail } from "../../actions/song";

type PageStateProps = {
  song: songType
};

type PageDispatchProps = {
  getPlayListDetail: (object) => any
  getSongInfo: (object) => any
  updatePlayStatus: (object) => any
};

type PageState = {};

@connect(
  state => ({
    song: state.song
  }),

  dispatch => ({
    getPlayListDetail(payload) {
      dispatch(getPlayListDetail(payload));
    }
  })
)
class Page extends Component<PageDispatchProps & PageStateProps, PageState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  config: Config = {
    navigationBarTitleText: "歌单详情"
  };

  componentWillMount() {
    // 获取路由参数
    const { id, name } = this.$router.params;

    // 设置title
    Taro.setNavigationBarTitle({
      title: name
    });

    // 发送dispatch 请求播放列表，并保存到store
    this.props.getPlayListDetail({
      id
    });
  }

  render() {
    const { playListDetailInfo, 
      playListDetailPrivileges,
      currentSongInfo, } = this.props.song;

    console.log(this.props, '<------')

    return (
      <View
        className={classnames({
          playList_container: true,
          hasMusicBox: !!currentSongInfo.name
        })}
      >
        <View className='playList__header'>
          {/* 背景 */}
          <Image 
            src={playListDetailInfo.coverImgUrl}
            className='playList__header__bg'
          />


        {/* 头像 */}
          <View  className='playList__header__cover'>
            <Image
              src={playListDetailInfo.coverImgUrl}
              className='playList__header__cover__img'
            />
            <Text className='playList__header__cover__desc'>歌单</Text>
            <View className='playList__header__cover__num'>
              <Text className='at-icon at-icon-sound'></Text>
              {playListDetailInfo.playCount}
            </View>
          </View>
        </View>



          <View className='playList__header--more'>
            <View className='playList__header--more__tag'>
              标签：
              {
                playListDetailInfo.tags.map(tag => (
                  <Text key={tag} className='playList__header--more__tag__item'>
                    {tag}
                  </Text>
                ))
              }
              {playListDetailInfo.tags.length === 0 ? "暂无" : ""}
            </View>

            <View className='playList__header--more__desc'>
              简介：{playListDetailInfo.description || "暂无"}
            </View>
          </View>



            <View  className='playList__content'>
              <View  className='playList__content__title'>歌曲列表</View>

              <View className='playList__content__list'>
                {
                  playListDetailInfo.tracks.map((track, index) => (
                    <View
                      key={index}
                      className={classnames({
                        playList__content__list__item: true,
                        disabled: playListDetailPrivileges[index].st === -200
                      })}
                    >
                      <Text>{index+1}</Text>

                      <View className='playList__content__list__item__info'>
                        <View className='playList__content__list__item__info__name'>
                            {track.name}
                        </View>

                        <View className='playList__content__list__item__info__desc'>
                          {track.ar[0] ? track.ar[0].name : ''} - {track.al.name}
                        </View>
                      </View>
                      <Text className='at-icon at-icon-chevron-right'></Text>
                    </View>
                  ))
                }
              </View>
            </View>

      </View>
    );
  }
}

export default Page as ComponentClass;
