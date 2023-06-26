<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-24 23:21:39
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-06-25 18:40:51
 * @FilePath: \uni-shop-1\src\components\my-search\my-search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-24 23:21:39
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-06-25 18:18:16
 * @FilePath: \uni-shop-1\components\my-search\my-search\my-search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="my-search-container" :style="{ 'background-color' :
bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{ 'border-radius' : radius + 'px' }">
      <!-- 使用 uni-ui 提供的图标组件 -->
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
    // 背景颜色
    bgcolor: {
      type: String,
      default: '#C00000'
    },
    // 圆角尺寸
    radius: {
      type: Number,
      default: 18 //px
    }
  },
    data() {
      return {

      };
    },
    methods: {
      searchBoxHandler() {
        this.$emit('click')
      }
    } 
  }
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  // background-color: #C00000;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box {
    height: 36px;
    background-color: #FFFFFF;
    // border-radius: 18px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
    }
  }
}
</style>