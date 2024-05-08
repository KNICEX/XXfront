import request from '@/utils/request'

export const login  = (data) => {
    return request({
        url: '/user/login',
        method: 'post',
        data
    })
}
export const register  = (data) => {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}

export const userInfo = (params) => {
    return request({
        url: '/user/info',
        method: 'get',
        params
    })
}