<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 15:44:45
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-20 15:21:59
 * @FilePath: \uni-shop-1\src\pages\my\my.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 15:44:45
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-17 21:38:08
 * @FilePath: \uni-shop-1\src\pages\my\my.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>

    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  import { mapState } from 'vuex';

  export default{
    mixins: [badgeMix],
    data () {
        return {
  
        };
      },
    computed: {
      ...mapState('m_user',['token'])
    }
  }
</script>

<style lang="scss">
page, .my-container {
  height: 100%;
}
</style>