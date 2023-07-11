<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-23 20:18:10
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-11 14:14:21
 * @FilePath: \uni-shop-1\src\subpkg\goods_list\goods_list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="goods-list">
    <view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
       <my-goods :goods="goods"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj:{
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goodsList: [],
        total:0,
        isloading: true
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''

      this.getGoodsList()
    },
    methods: {
      async getGoodsList (cb) {
        // 打开节流阀
        this.isloading = true
       const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
       //请求失败
       if(res.meta.status !==200) return uni.$showMsg() 

       this.goodsList = [...this.goodsList,...res.message.goods]
       this.total = res.message.total
       // 关闭节流阀
       this.isloading = false
       cb && cb()
      },
      gotoDetail(goods) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods.goods_id
        })
      }
    },
    //页面上拉触底事件的处理函数
    onReachBottom() {
      // 当前的页码值 * 每页显示多少条数据 >= 总数条数
      // pagenum * pagesize >= this.total

      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')

      // 判断是否正在请求其他数据，如果是，则不发起额外请求
      if(this.isloading) return
      // 让页码值自增 +1
      this.queryObj.pagenum++
      this.getGoodsList
    },
    onPullDownRefresh() {
      // 重置关键数据
      this.queryObj.pagenum = 1
      this.total = 0
      this.isloading = false
      this.goodsList = []

      // 重新发起数据请求
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">

</style>