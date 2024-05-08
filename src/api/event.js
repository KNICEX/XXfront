import request from "@/utils/request.js"

export const addEvent = (data) => {
    return request({
        url: '/voteEvent/add',
        method: 'post',
        data
    })
}

export const getEventList = (params) => {
    return request({
        url: '/voteEvent/all',
        method: 'get',
        params
    })
}

export const updateEvent = (data) => {
    return request({
        url: '/voteEvent/update/' + data.id,
        method: 'put',
        data
    })
}