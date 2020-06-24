
import Taro,{ FC, useState, login } from '@tarojs/taro'
import { View, Input } from "@tarojs/components";
import { AtIcon, AtButton, AtToast } from "taro-ui";
import { connect } from '@tarojs/redux'
import classnames from "classnames";


import { login_api } from './services'

import './index.scss'


type InputType = 'phone' | 'password'

// FC 是函数自建的type
const Page: FC = () => {

  const [phone, setPhone] = useState<string>('13091277303')
  const [password, setPassword] = useState<string>('mimashi123')
  const [showLoading, setShowLoading] = useState<boolean>(false)
  const [showTip, setShowTip] = useState<boolean>(false)
  const [tip, setTip] = useState<string>("");

  function handleChange(type: InputType, event) {
    console.log(event)
    const {value } = event.detail
    if(type === 'phone') {
      setPhone(value)
    } else {
      setPassword(value)
    }
  }

  function login() {
    if (!phone) {
      Taro.showToast({
        title: '请输入手机号',
        duration: 2000
      })
      return;
    }

    if (!password) {
      Taro.showToast({
        title: '请输入密码',
        duration: 2000
      })
      return;
    }

    // setShowLoading(true)


    login_api({phone, password}).then(res => {
      console.log(res)
      useLoginStatus(res)
    }).finally(() => {
      setShowLoading(false);
    })
  }

  function useLoginStatus(res: any): void {
    const { code } = res

    let tip = '登录成功'
    if(code != 200 ) {
      tip = res.msg || '登录失败'
    }

    setShowTip(true)
    setTip(tip)
    setTimeout(() => {
      setShowTip(false);
    }, 2000)

    if(code === 200) {
      Taro.setStorageSync('userInfo', res)
      Taro.setStorageSync('userId', res.account.id)
      Taro.switchTab({
        url: '/pages/me/index'
      })
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

        <View className="login_content__item">
          <AtIcon value="lock" size="24" color="#ccc"></AtIcon>
          <Input
            type="text"
            password
            placeholder="密码"
            className="login_content__input"
            onInput={(e): void => {
              handleChange("password", e);
            }}
          />
        </View>

        <AtButton className="login_content__btn" onClick={() => login()}>登录</AtButton>
      </View>

      <AtToast isOpened={showLoading} text="加载中..." status="loading" hasMask duration={30000000}></AtToast>
      <AtToast isOpened={showTip} text={tip} hasMask duration={2000}></AtToast>
    </View>
  )
}

Page.config = {
  navigationBarTitleText: '登录'
}

export default Page