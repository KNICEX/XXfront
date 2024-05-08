import request from "@/utils/request.js"

export const vote = (data) => {
    return request({
        url: '/vote/add',
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