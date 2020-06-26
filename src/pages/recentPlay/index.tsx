import { ComponentClass } from "react";
import Taro, { Component, Config } from "@tarojs/taro";
import { AtTabs, AtTabsPane } from "taro-ui";
import { View, ScrollView } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import classnames from "classnames";
import './index.scss'

import {getRecordList } from './services'


type PageDispatchProps = {

} 
type PageStateProps = {}
type PageState = {
  currentTab: number
  tabList: Array<{title: string}>
  list: Array<any>
}


@connect(
  (state) => ({

  }),

  (dispatch) => ({

  })
)
class Page extends Component<PageDispatchProps & PageStateProps, PageState> {

  config: Config = {
    navigationBarTitleText: '最近播放'
  }

  constructor(props) {
    super(props)
    this.state = {
      currentTab: 0,
      list: [],
      tabList: [
        {
          title: "最近7天"
        },
        {
          title: "全部"
        }
      ],
    }
  }

  componentWillMount() {
    this.getData()
  }

  getData() {
    const { currentTab } = this.state
    const userId = Taro.getStorageSync('userId')

    console.log(userId)

    getRecordList({
      uid: userId,
      type: currentTab === 0 ? 1 : 0
    }).then(res => {
      console.log(res, '<----')

      const dataType = currentTab === 0 ? 'weekData' : 'allData'
      if(res && res[dataType] && res[dataType].length > 0) {
        this.setState({
          list: res[dataType]
        })
      }
    })
  }


  const switchTab = (val) => {
    console.log(val)
    this.setState({
      currentTab: val,
      list: []
    },

    () => {
      this.getData()
    }
    )
  }

  const showMore = () => {

  }

  render() {

    const {currentTab, tabList, list} = this.state
    return (<View className='recentPlay_container'>
      <AtTabs
        current={currentTab}
        swipeable={false}
        tabList={tabList}
        onClick={this.switchTab}
      >
        <AtTabsPane current={currentTab} index={0}>

          {
            list.length === 0 ? (<View className='at-icon at-icon-loading-3'></View>)
            : (
              list.map((item, index) => (
                <View key={item.song.id} className='recentPlay__music'>
                  <View
                    className='recentPlay__music__info'
                  
                  >
                    <View className='recentPlay__music__info__name'>
                      {item.song.name}
                    </View>
                    <View className='recentPlay__music__info__desc'>
                      {`${item.song.ar[0] ? item.song.ar[0].name : ""} - ${
                        item.song.al.name
                      }`}
                    </View>
                  </View>
                  <View 
                    className='at-icon at-icon-chevron-right recentPlay__music__icon'
                   
                  ></View>
                </View>
              ))
            )
          }



        </AtTabsPane>
        <AtTabsPane>

        {
            list.length === 0 ? (<View className='at-icon at-icon-loading-3'></View>)
            : (
              list.map((item, index) => (
                <View key={item.song.id} className='recentPlay__music'>
                  <View
                    className='recentPlay__music__info'
                  
                  >
                    <View className='recentPlay__music__info__name'>
                      {item.song.name}
                    </View>
                    <View className='recentPlay__music__info__desc'>
                      {`${item.song.ar[0] ? item.song.ar[0].name : ""} - ${
                        item.song.al.name
                      }`}
                    </View>
                  </View>
                  <View 
                    className='at-icon at-icon-chevron-right recentPlay__music__icon'
                   
                  ></View>
                </View>
              ))
            )
          }


        </AtTabsPane>
      </AtTabs>
    </View>)
  }



}

export default Page as ComponentClass