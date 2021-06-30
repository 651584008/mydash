/**
这是一个微信小程序常用封装请求代码的文件，这个可以用promise封装使用


使用方法，新建一个home.js
import request from '@/utils/request.js'

export function goodsList(data) {
    return request({
        url: '/app/sfy_shop_api.php?i=2&r=creditshop.lists.getlist',
        data,
    })
}

在vue页面中使用
getChangeList().then(res=>{
})

**/




//判断环境
// #ifndef TEST-WEIXIN
//非测试环境下、开发环境/生产环境
const baseUrl = process.env.NODE_ENV === 'development' ? 'https://micro-mall.fuanna.com' : 'https://ms.fuanna.com';
// #endif
// #ifdef TEST-WEIXIN
//测试环境下域名配置
const baseUrl = "https://micro-mall.fuanna.com"
// #endif

const http = (opt) =>{
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'GET';
	//后续的每个请求都要加上header
	let sessid = uni.getStorageSync("sessid")
	// let token = uni.getStorageSync("token");
	opt.header = opt.header || {
		"Content-Type": "application/json",
		 "SESSID": sessid
		// "Authorization": token ? 'Bearer ' + token : ''
	};
	return new Promise((resolve,reject) =>{
		if(opt.loadText){
			uni.showLoading({
				title:opt.loadText,
				mask:true
			})
		}
		uni.request({
			url:baseUrl+opt.url,
			data:opt.data,
			header:opt.header,
			timeout:10000,
			method:opt.method,
			dataType:'json',
			success:(res)=>{
				if(res.statusCode == 200){
					resolve(res.data);
				}else{
					reject("error");
				}
			
				if(res.data.code ==-1){
					uni.showToast({
						title:res.data.msg,
						mask:true,
						icon:'none'
					})
					uni.navigateTo({
						url: '/pages/public/login'
					})
				}
				
			},
			complete: () => {
				if(opt.loadText){
					uni.hideLoading();
				}
			},
			fail: () => {
				reject('error');
			}
		})
	})
}

export default http
