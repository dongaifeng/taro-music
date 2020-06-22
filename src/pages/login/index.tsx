
import Taro,{ FC, useState } from '@tarojs/taro'
import { View, Input } from "@tarojs/components";
import { AtIcon, AtButton, AtToast } from "taro-ui";
import { connect } from '@tarojs/redux'
import classnames from "classnames";


import { signOut } from './services'

import './index.scss'


type InputType = 'phone' | 'password'

const Page: FC = () => {

  const [phone, setPhone] = useState<string>('')

  function handleChange(type: InputType, event) {
    const {value } = event.detail
    if(type === 'phone') {
      setPhone(value)
    }
  }




  return (
    <View className="login_container">
      <View className="login_content">
        <View className="login_content__item">
          <AtIcon value="iphone" size="24" color="#ccc" />
          <Input
            type="text"
            placeholder="手机号"
            className="login_content__input"
            onInput={(e): void => { handleChange('phone', e) }}
          />
        </View>
      </View>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '登录'
}

export default Page