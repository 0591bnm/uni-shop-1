<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-21 15:28:29
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-06-23 20:14:58
 * @FilePath: \uni-shop-1\src\pages\home\home.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 轮播的区域 -->
    <swiper class="" indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <!-- 轮播 item 项 -->
      <swiper-item v-for="(item,i) in swiperList" :key="i">
        <!-- 轮播地址和图片 -->
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
          <image class="" :src="item.image_src">

          </image>
        </navigator>
      </swiper-item>
    </swiper>
  </view>
  <!-- 分类导航区域 -->
  <view class="nav-list">
    <!-- 分类 item 项 -->
    <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
      <!-- 分类图片 -->
      <image :src="item.image_src" class="nav-img"></image>
    </view>
  </view>
  <!-- 楼层区域 -->
  <view class="floor-list">
    <!-- 楼层 item 项 -->
    <view class="floor-item" v-for="(item,i) in floorList" :key="i">
      <!-- 楼层标题 -->
      <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层的图片区域 -->
        <view class="floor-img-box">
        <!-- 左侧大图片的盒子 -->
        <navigator class="left-img-box" :url="item.product_list[0].url">
          <image :src="item.product_list[0].image_src" :style="{width:item
            .product_list[0].image_width+'rpx'}" mode="widthFix">
          </image>
        </navigator>
        <!-- 右侧4 个小图片的盒子 -->
        <view class="right-img-box">
          <navigator class="right-img-item" v-for="(item2,i2) in item
          .product_list.slice(1)" :key="i2" :url="item2.url">
            <image :src="item2.image_src" :style="{width:item2.image_width+'rpx'}"
             mode="widthFix"></image>
          </navigator>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 这是轮播图的数据列表
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层的数据
        floorList:[]
      };
    },
    onLoad() {
      //调用方法，获取轮播图的数据
      this.getSWiperList()
      //调用方法，获取分类导航的数据
      this.getNavList()
      //调用方法，获取楼层的数据
      this.getFloorList()
    },
    methods: {
      // 轮播图
      async getSWiperList () {
       const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
       //请求失败
       if(res.meta.status !==200) return uni.$showMsg() 

       this.swiperList = res.message
      },
      // 分类导航
      async getNavList() {
       //请求失败
       const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
       if(res.meta.status !==200) return uni.$showMsg()
       
       this.navList = res.message
      },
      // 跳转到分类导航
      navClickHandler(item) {
        if (item.name == '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 楼层
      async getFloorList() {
       //请求失败
       const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
       if(res.meta.status !==200) return uni.$showMsg()
      

       // 对数据进行处理
       res.message.forEach(floor =>{
        floor.product_list.forEach(prod => {
          prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url
          .split('?')[1]
        })
       })
       this.floorList = res.message
      },
    }
  }
</script>

<style lang="scss">
//轮播图
swiper{
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
//分类导航
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;


  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
//楼层
.floor-title {
  height: 60rpx;
  width: 100%;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.floor-img-box {
  display: flex;
  padding-left: 10rpx;
}
</style>