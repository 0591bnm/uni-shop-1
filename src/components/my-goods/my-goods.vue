<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-27 21:21:48
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-06-29 00:07:58
 * @FilePath: \uni-shop-1\src\components\my-goods\my-goods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="goods-item">
          <!-- 左侧的盒子 -->
          <view class="goods-item-left">
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧的盒子 -->
          <view class="goods-item-right">
            <!-- 商品的名字 -->
            <view class="goods-name">{{ goods.goods_name }}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">¥{{ parseFloat(goods.goods_price).toFixed(2) }}</view>
            </view>
          </view>
       </view>
</template>

<script>
  export default {
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认图片地址
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    }
}

</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left{
    margin-right: 5px;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      .goods-price {
        color: #C00000;
        font-size: 16px;
      }
    }
  }
}
</style>