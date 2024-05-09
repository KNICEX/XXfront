import request from "@/utils/request.js"

export const vote = (data) => {
    return request({
        url: '/vote/add',
        method: 'post',
        data
    })
}

