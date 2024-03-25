import { readAllAPI } from '../../../apis/message.js'
import { onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

export function messageModule(fn, contentType) {
    const query = ref({
        page: 1,
        pageSize: 10,
    })

    const dataList = ref([])
    const isLoading = ref(false)
    const total = ref(0)
    function getMessage() {
        isLoading.value = true
        return fn(contentType, query.value)
            .then((res) => {
                console.log(res)
                if (!res.data.items) return
                dataList.value.push(...res.data.items)
                total.value = res.data.counts
            })
            .finally(() => {
                isLoading.value = false
            })
    }

    const refreshing = ref(false)
    function doRefresh() {
        query.value.page = 1
        refreshing.value = true
        dataList.value = []
        getMessage().then(() => {
            refreshing.value = false
        })
    }

    function doScrollToLower() {
        if (isLoading.value === true) {
            return
        }
        if (dataList.value.length >= total.value) {
            uni.utils.toast('已经到底了')
            return
        }
        query.value.page++
        getMessage()
    }

    function changeReadStatus() {
        readAllAPI(contentType).then(() => {
            uni.utils.toast('全部已读')
            query.value.page = 1
            dataList.value = []
            getMessage()
        })
    }
    function doClick(id) {
        for (let i = 0; i < dataList.value.length; i++) {
            if (dataList.value[i].id === id) {
                dataList.value[i].isRead = 1
                return
            }
        }
    }
    return {
        getMessage,
        dataList,
        refreshing,
        doRefresh,
        doScrollToLower,
        doClick,
        changeReadStatus,
    }
}
