import { uniFetch } from './uni-fetch.js'

//获取待提货列表
export function taskListpAPI(status, query) {
    return uniFetch({
        url: '/driver/tasks/list',
        method: 'GET',
        data: {
            status,
            ...query,
        },
    })
}

//获取在途列表

//获取任务详情
export function pickUpDetailAPI(jobId) {
    return uniFetch.get(`/driver/tasks/details/${jobId}`)
}

//延迟提货
export function suspendPickup(delayReason, delayTime, id) {
    return uniFetch.put('/driver/tasks/delay', { delayReason, delayTime, id })
}

//提货接口
export function pickUpGoods(postData) {
    return uniFetch.post('/driver/tasks/takeDelivery', postData)
}

//交付接口
export function finishDispatchedAPI(postData) {
    return uniFetch.post('/driver/tasks/deliver', postData)
}

//上报异常
export function reportUnUsualAPI(postData) {
    return uniFetch.post('/driver/tasks/reportException', postData)
}

//回车登记
export function reportTaskDoneAPI(recordData) {
    if (!recordData.id) return
    return uniFetch.post('/driver/tasks/truckRegistration', recordData)
}
