import { uniFetch } from './uni-fetch.js'

export function getNotityListAPI(
    contentType,
    query = { page: 1, pageSize: 10 }
) {
    return uniFetch({
        url: '/driver/messages/page',
        method: 'GET',
        data: {
            contentType,
            ...query,
        },
    })
}

//获取公告

//全部已读通知
export function readAllAPI(contentType) {
    return uniFetch.put(`/driver/messages/readAll/${contentType}`)
}
