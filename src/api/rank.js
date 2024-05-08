import request from '@/utils/request'

export const getRankList = (params) => {
    return request({
        url: '/vote/rankings',
        method: 'get',
        params
    })
}

export const getRankListByEvent = (params) => {
    return request({
        url: '/vote/rankings/event/' + params,
        method: 'get',
    })
}