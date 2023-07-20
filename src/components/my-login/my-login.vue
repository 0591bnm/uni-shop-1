<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 21:33:01
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-20 21:51:52
 * @FilePath: \uni-shop-1\src\components\my-login\my-login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapMutations,mapState } from 'vuex';

export default {
  data() {
    return {

    };
  },
  computed: {
    ...mapState('m_user',['redirectInfo'])
  },
  methods: {
    ...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
    // 用户授权之后，获取用户的基本信息
    async getUserProfile() {
      const res = await uni.getUserProfile({
        desc: '登录授权'
      }).catch(err => err)
      if (res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权')

      console.log(res)
      console.log(res.userInfo)
      this.updateUserInfo(res.userInfo)

      this.getToken(res)
    },
    async getToken(info) {
      await uni.login({
        provider: 'weixin',
        success(res) {
          const { code } = res;
          
          // 将code发送到服务器进行进一步处理
        },
        fail(err) {
          if (err || err !=='login:ok')
            return uni.$showMsg('登录失败！')
        },
      });
      const query = {
          code: '0f3sMH1w3fvh313aMX2w32OWaM1sMH1x',
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        const {data: loginResult} =await uni.$http.post('/api/public/v1/users/wxlogin',query)
        console.log(loginResult)
        if(loginResult.meta.status !== 400) return uni.$showMsg('登录失败！！')
        this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
        this.navigateBack()
      },
      navigateBack() {
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: ()=> {
              this.updateRedirectInfo(null)
            }
          }) 
        }
      }
  }
}
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  background-color: #F8F8F8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  &::after {
    content: ' ';
    display: block;
    width: 100%;
    height: 40px;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 100%;
    transform: translateY(50%);
  }
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #C00000;
  }
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>