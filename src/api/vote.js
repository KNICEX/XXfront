import request from "@/utils/request.js"

export const getVoteList = (params) => {
    return request({
        url: '/voteEvent/all',
        method: 'get',
        params
    })
}

export const vote = (data) => {
    return request({
        url: '/vote/add',
        method: 'post',
        data
    })
}