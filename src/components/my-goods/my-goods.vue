<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-27 21:21:48
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-14 21:03:25
 * @FilePath: \uni-shop-1\src\components\my-goods\my-goods.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="goods-item">
          <!-- 左侧的盒子 -->
          <view class="goods-item-left">
            <radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandle"></radio>
            <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
          </view>
          <!-- 右侧的盒子 -->
          <view class="goods-item-right">
            <!-- 商品的名字 -->
            <view class="goods-name">{{ goods.goods_name }}</view>
            <view class="goods-info-box">
              <!-- 商品价格 -->
              <view class="goods-price">¥{{ parseFloat(goods.goods_price).toFixed(2) }}</view>
              <uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
      },
      showRadio: {
        type: Boolean,
        // 默认情况下，不会展示 radio 组件
        default: false
      },
      showNum: {
        type: Boolean,
        // 默认情况下，不会展示 radio 组件
        default: false
      }
    },
    data() {
      return {
        // 默认图片地址
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    methods: {  
      // radio组件的 点击事件处理函数
      radioClickHandle() {
        this.$emit('radio-change', {
          goods_id: this.goods.goods_id,
          goods_state: !this.goods.goods_state
        })
      },
      // 监听到了 NumberBox 的组件数量变化的事件
      numChangeHandler(val) {
        this.$emit('num-change', {
          goods_id: this.goods.goods_id,
          //转换成真正的数字
          goods_count: +val
        })
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
  .goods-item-right{
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .goods-price {
        color: #C00000;
        font-size: 16px;
      }
    }
  }
}
</style>