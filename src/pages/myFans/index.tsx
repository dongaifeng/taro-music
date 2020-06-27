import Taro, { useState, useEffect, FC } from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import './index.scss'

import http from '../../http/http'
import ListItem from './ListItem'


type userList = Array<{
  avatarUrl: string
  nickname: string
  signature?: string
  gender: number
  userId: number
}>

const Page: FC = () => {

  const  [userList, setUserList ] = useState<userList>([])
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [userId, setUserId ] = useState<number>(Taro.getStorageSync('userId'))



  useEffect(() => {
    getFollowedList()
  
  }, [])

  function goUserDetail() {

  }

  function getFollowedList () {
    http.get({
      url: '/user/follows',
      data: {
        uid: userId,
        limit: 20,
        offset: userList.length
      }
    }).then(res => {
      console.log(res)
      setUserList(res.follow)
      setHasMore(res.more)
    })
  }




  return (
    <View className='my_fans_container'>
    <ScrollView scrollY onScrollToLower={getFollowedList} className='user_list'>
      {
        userList.map((item) => <ListItem 
        userInfo={item} 
        key={item.userId} 
        clickFunc={goUserDetail}
        />)
      }
      
    </ScrollView>
  </View>
  )
}


Page.config = {
  navigationBarTitleText: '我的粉丝'
}


export default Page