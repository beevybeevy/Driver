import { ref } from 'vue'
import { defineStore } from 'pinia'

//定义仓库
//这里导出的是一个函数，只用调用这个函数，才会得到return里面的数据
export const useCounterStore = defineStore(
    'counter',
    () => {
        //准备需要共享的数据
        const count = ref(0)
        //修改数据的方法
        const plus = function () {
            count.value++
        }
        const minus = function () {
            count.value--
        }

        //以对象的方式返回需要使用的数据/方法
        return { count, plus, minus }
    },
    {
        persist: {
            paths: ['count'],
        },
        //也可以直接写成 persisit:true
    }
)
