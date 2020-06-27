import Taro, { FC } from '@tarojs/taro'
import { AtIcon } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import './index.scss'



type Props = {
  userInfo: {
    avatarUrl: string,
    nickname: string,
    signature?: string,
    gender: number,
    userId: number
  },
  clickFunc?: (number) => any
}

const Page: FC<Props> = ({ userInfo, clickFunc }) => {


  console.log('userInfo--------', userInfo)


  function goDetail() {


    if (clickFunc) {
      clickFunc(userInfo.userId)
    }
  }
  if (!userInfo) return null


  return (
    <View className='userListItem_components' onClick={() => goDetail()}>
          <Image 
            src={`${userInfo.avatarUrl}?imageView&thumbnail=250x0`}
            className='userListItem__avatar'
          />
          <View className='userListItem__info'>
          <View className='userListItem__info__name'>
            {userInfo.nickname}
            {
              userInfo.gender === 1 ? <AtIcon value='clock' size='30' color='#F00'></AtIcon> : ''
            }
            {
              userInfo.gender === 2 ? <AtIcon value='clock' size='30' color='#F00'></AtIcon> : ''
            }
          </View>
          <View className='userListItem__info__signature'>{userInfo.signature || ''}</View>
          </View>
      </View>
  )
}


export default Page