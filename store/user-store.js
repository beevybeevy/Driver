import {
    defineStore
} from 'pinia'
import {
    ref
} from 'vue'

// 定义一个用户 store ，来管理用户信息，包括用户的登录状态token
export const useUserStore = defineStore(
    'user',
    () => {
        const token = ref('')

        const setToken = (val) => (token.value = val)

        // 必须要返回。以对象的形似返回
        return {
            token,
            setToken
        }
    }, {
        persist: true,
    }
)