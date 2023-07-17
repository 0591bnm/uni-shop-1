<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-21 15:28:29
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-17 15:42:11
 * @FilePath: \uni-shop-1\src\pages\cart\cart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-21 15:28:29
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-14 15:57:14
 * @FilePath: \uni-shop-1\src\pages\cart\cart.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
<view class="cart-container" v-if="cart.length !== 0">
  <!-- 收货地址组件 -->
  <my-address></my-address>
  
  <!-- 商品列表的标题区域-->
  <view class="cart-title">
    <!-- 左侧的图标 -->
    <uni-icons type="shop" size="30"></uni-icons>
    <!-- 右侧的文本 -->
    <text class="cart-title-text">购物车</text>
  </view>

    <!-- 循环渲染购物车中的商品信息 -->    
    <uni-swipe-action>
        <block v-for="(goods,i) in cart" :key="i">
          <uni-swipe-action-item :right-options="options" @click="swiperItemClickHandler(goods)">
            <my-goods :goods="goods" :show-radio="true" :show-num="true" @radio-change="radioChangeHandler" @num-change="numberChangeHandler"></my-goods>
          </uni-swipe-action-item>
        </block>
    </uni-swipe-action>

    <!-- 使用自定义的结算组件 -->
    <my-settle></my-settle>
</view>

    <!-- 空白购物车的区域 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" class="empty-img"></image>
      <text class="tip-text">空空如也~</text>
    </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState,mapMutations } from 'vuex';
  import myAddress from '../../components/my-address/my-address.vue';


  export default {
  components: { myAddress },

    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart',['cart'])
    },
    data () {
        return {
          options: [{
            text: '删除',
            style: {
              backgroundColor: '#C00000'
            }
          }]
        };
    },
    methods: {
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChangeHandler(e) {
        // console.log(e)
        this.updateGoodsState(e)
      },
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
      },
      swiperItemClickHandler(goods) {
        this.removeGoodsById(goods.goods_id)
      }
    }
  }
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
}
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #EFEFEF;

  .cart-title-text {
    font-size: 14px;
    margin-left: 10px;
  }
}

.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  .empty-img {
    width: 90px;
    height: 90px;
  }
  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>