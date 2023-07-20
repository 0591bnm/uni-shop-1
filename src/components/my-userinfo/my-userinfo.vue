<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 21:34:40
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-20 21:43:14
 * @FilePath: \uni-shop-1\src\components\my-userinfo\my-userinfo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="my-userinfo-container">
    <!-- 头像昵称位置 -->
    <view class="top-box">
      <!-- 头像 -->
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <!-- 昵称 -->
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>
    
    <!-- 面板区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item"> 
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>代付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item"> 
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item"> 
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    data() {
      return {
        
      };
    },
    computed: {
    ...mapState('m_user',['userinfo'])
    },
    methods: {
      ...mapMutations('m_user',['updateAddress','updateUserInfo','updateToken']),
      async logout() {
        const res = await uni.showModal({
          title: '提示',
          content: '确认退出登录吗？',
          
        })
        if (res.confirm) {
            console.log(res)
            this.updateAddress({})
            this.updateUserInfo({})
            this.updateToken('')
          } else if (res.cancel) {
              
          }
      }
    }
  }
</script>

<style lang="scss">
.my-userinfo-container {
  height: 100%;
  background-color: #F4F4F4;
  
  // 为整个组件的结构添加浅灰色的背景

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .avatar {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid #FFF;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      font-size: 16px;
      color: #FFF;
      font-weight: bold;
      margin-top: 10px;
    }
  }
}

// 面板区域
.panel-list {
  padding: 0 10px;
  position: relative;
  top: -10px;
  // 第一个面板
  .panel {
    background-color: white;
    border-radius: 3px;
    margin-bottom: 8px;

    .panel-title {
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #F4F4F4;
    }

    .panel-body {
      display: flex;
      justify-content: space-around;
      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 10px 0;
        font-size: 13px;
      
      }

      .icon {
        width: 35px;
        height: 35px;
      }
    }
  }
}

.panel-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
  line-height: 45px;
}
</style>