import request from "@/utils/request.js"

export const getAllUser = (params) => {
    return request({
        url: '/user/all',
        method: 'get',
        params
    })
}

export const banUser = (data) => {
    return request({
        url: '/user/ban',
        method: 'post',
        data
    })
}

export const unbanUser = (data) => {
    return request({
        url: '/user/free',
        method: 'post',
        data
    })
}

export const getAllVotes = (params) => {
    return request({
        url: '/vote/all',
        method: 'get',
        params
    })
}