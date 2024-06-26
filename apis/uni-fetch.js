// 导入安装好的 uni-app-fetch 模块
import { createUniFetch } from 'uni-app-fetch'
import { useUserStore } from '../store/user-store.js'

// 配置符合自身业务的请求对象
export const uniFetch = createUniFetch({
    loading: { title: '正在加载...' },
    baseURL: 'https://slwl-api.itheima.net',
    intercept: {
        // 请求拦截器
        request(options) {
            // 后续补充实际逻辑
            const useUser = useUserStore()
            options.header = {}
            options.header.Authorization = useUser.token
            return options
        },
        // 响应拦截器
        response(result) {
            //处理401错误 token失效
            if (result.statusCode === 401) {
                const pages = getCurrentPages()
                console.log(pages)
                //取最后一条页面栈的数据，就是自己的路由地址
                const backUrl = '/' + pages[pages.length - 1].route
                uni.navigateTo({
                    url: '/pages/login/index?backUrl=' + backUrl,
                })
                //如果请求出错，就不会进then，而是进入catch
                //如果不想看到异常的错误，可以使用.catch进行补货
                return Promise.reject()
            }
            // 后续补充实际逻辑
            return result.data
        },
    },
})
