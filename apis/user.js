import { uniFetch } from './uni-fetch.js'

export function loginAPI(data) {
    return uniFetch({
        url: '/driver/login/account',
        method: 'POST',
        data,
    })
}
