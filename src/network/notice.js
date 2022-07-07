import {request} from "@/network/request";


export function noticeQueryNetwork(page=1, size=999){
    return request({
        url:'/announce/pageQuery',
        method: 'post',
        data:{
            page,
            size
        }
    })
}
export function noticeListQueryNetwork(page=1, size=15){
    return request({
        url:'/announce/pageQuery',
        method: 'post',
        data:{
            page,
            size
        }
    })
}

export function newsQueryNetwork(page = 1) {
    return request({
        url:'/news/pageQuery',
        method: 'post',
        data:{
            page
        }
    })
}

export function newsListueryNetwork(page = 1, size=15) {
    return request({
        url:'/news/pageQuery',
        method: 'post',
        data:{
            page,
            size
        }
    })
}