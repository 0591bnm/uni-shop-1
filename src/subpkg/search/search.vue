<!--
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-25 18:20:57
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-06-26 20:32:24
 * @FilePath: \uni-shop-1\src\subpkg\search\search.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <view class="search-box">
      <uni-search-bar cancelButton="none" :radius="100" @input="input" placeholder="请输入搜索内容"></uni-search-bar>
    </view>

    <!-- 搜索建议列表 -->
    <view class="sugg-list" v-if="searchResults.length !==0">
      <view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item)">
        <view class="goos-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="20" @click="clean"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :custom-style="'margin-right:5px;color: #000;background-color: #efefef; border-color: #efefef;'" 
        :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
import uniIcons from '../../components/uni-icons/uni-icons.vue';
  export default{
  components: { uniIcons },
    data() {
      return {
          timer: null,
          kw: '',
          // 搜索的结果列表
          searchResults: [],
          // 搜索历史的数组
          historyList: []
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    methods: {
      input(e) {
        // 清除 timer 对应的延时器
        clearTimeout(this.timer)
        // 重新启动一个延时器，并把 timerId 赋值给 this.timer
        this.timer = setTimeout(() => {
          // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
          this.kw = e
          this.getSearchList()
        }, 500);
      },
      async getSearchList() {
        if(this.kw.length == 0) {
          this.searchResults = []
          return
        }

        const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query: this.kw})
        if(res.meta.status !=200) return uni.$showMsg()

        this.searchResults = res.message

      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
        this.saveSearchHistory()
      },
      saveSearchHistory() {
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)

        this.historyList = Array.from(set)

        // 对搜索历史数据,进行持久化的存储
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      clean() {
        this.historyList = []
        uni.setStorageSync('kw','[]')
      },
      gotoGoodList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    },
    computed: {
      histories() {
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    .goos-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    height: 40px;
    align-items: center;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }
  .history-list {
    display: flex;
    flex-wrap: wrap;
    margin-top:5px;
  }
}
</style>