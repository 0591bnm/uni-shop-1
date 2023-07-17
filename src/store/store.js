/*
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-13 12:14:33
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-16 20:58:24
 * @FilePath: \uni-shop-1\src\store\store.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 1.导入 Vue 和 Vuex
import { createStore } from "vuex";
import moduleCart from '@/store/cart.js'
import moduleUser from '@/store/user.js' 

// 2. 创建Store 的实例对象   
const store = createStore({
    // TODO： 挂载 store 模块
    modules: {
        'm_cart': moduleCart,
        'm_user': moduleUser
    },
  });

// 4. 向外共享 Store 的实例对象
export default store
