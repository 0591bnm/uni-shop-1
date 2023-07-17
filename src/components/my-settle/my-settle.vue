<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 13:12:35
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-17 15:29:46
 * @FilePath: \uni-shop-1\src\components\my-settle\my-settle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="my-settle-container">
    <!-- 全选 -->
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
    </label>

    <!-- 合计 -->
    <view class="amount-box">
      合计：<text class="amount">¥{{checkedGoodsAmount}}</text>
    </view>

    <!-- 结算按钮 -->
    <view class="btn-settle">结算({{ checkedCount }})</view>
  </view>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
      isFullCheck() {
        return this.total === this.checkedCount
      }
    },
    methods: {
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllState() {
        this.updateAllGoodsState(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;

  .radio {
    display: flex;
    align-items: center;
  }
  .amount-box {
    .amount {
      color: #C00000;
      font-weight: bold;
    }
  }
  .btn-settle {
    background-color: #C00000;
    height: 50px;
    color: white;
    line-height: 50px;
    padding: 0 10px;
    min-width: 100px;
    text-align: center;
  }
}
</style>