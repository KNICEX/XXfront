import request from "@/utils/request.js"

export const getAllUser = (params) => {
    return request({
        url: '/user/all',
        method: 'get',
        params
    })
}