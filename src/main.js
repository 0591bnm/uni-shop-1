/*
 * @Author: Jie你的账 2805889238@qq.com你邮箱地
 * @Date: 2023-06-20 21:18:04
 * @LastEditors: Jie你的账 2805889238@qq.com你邮箱地
 * @LastEditTime: 2023-07-20 22:33:02
 * @FilePath: \uni-shop-1\src\main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {createSSRApp} from "vue";
import App from "./App.vue";
//导入网络请求的包
import { $http } from '@escook/request-miniprogram'
import store from "./store/store";

// 引入 uni-ui 组件库
uni.$http = $http

//请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'
//请求拦截器
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中..."
	})

	// 判断当前请求的是否为有权限的接口
	if (options.url.indexOf('/my/') !== -1) {
		options.header = {
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
		}
	}
}

//响应拦截器
$http.afterRequest = function(options) {
	uni.hideLoading()
}

// 封装弹框的方法
uni.$showMsg = function(title = '数据请求失败!' , duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}
export function createApp() {
	const app = createSSRApp(App);
	app.use(store)
	return {
		app,
		store
	};
}
