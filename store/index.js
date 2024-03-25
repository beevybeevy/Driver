//引入 piniaPluginPersistedstate
import { createPersistedState } from 'pinia-plugin-persistedstate'
//引入
import { createPinia } from 'pinia'

//创建Pinia实例
const pinia = createPinia()

//创建Pinia的 持久化 实例
const piniaUniStorageState = createPersistedState({
    key: (id) => `_persisted_${id}`,
    //如果进行存储和读写
    storage: {
        //读取
        getItem: (key) => {
            return uni.getStorageSync(key)
        },
        //写入
        setItem: (key, value) => {
            uni.setStorageSync(key, value)
        },
    },
})

//给Pinia注册，持久化 插件
pinia.use(piniaUniStorageState)

//导出给main.js使用
export default pinia
