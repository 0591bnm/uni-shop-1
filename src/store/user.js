/*
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-07-17 15:44:45
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-20 21:28:00
 * @FilePath: \uni-shop-1\src\store\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    namespaced: true,
    state: () => ({
        address: JSON.parse(uni.getStorageSync('address') || '{}'),
        token: '',
        // 用户信息对象
        userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
        // 重定向的 Object 对象
        redirectInfo: null
    }),

    mutations: {
        // 更新收获地址
        updateAddress(state, address) {
            state.address = address

            this.commit('m_user/saveAddressToStorage')
        },
        saveAddressToStorage(state) {
            uni.setStorageSync('address', JSON.stringify(state.address))
        },
        updateUserInfo(state, userinfo) {
            state.userinfo = userinfo

            this.commit('m_user/saveUserInfoToStorage')
        },
        saveUserInfoToStorage(state) {
            uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
        },
        updateToken(state,token) {
            state.token = token,

            this.commit('m_user/saveTokenToStorage')
        },
        saveTokenToStorage(state) {
            uni.setStorageSync('token',state.token)
        },
        updateRedirectInfo(state,info) {
            state.redirectInfo = info
            console.log(state.redirectInfo)
        }
    },
    getters: {
        addstr(state) {
            if(!state.address.provinceName) return ''
    
            return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
          }
    }
}