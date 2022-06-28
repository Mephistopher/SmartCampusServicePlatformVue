import {request} from "@/network/request";


export function noticeQueryNetwork(page=1){
    return request({
        url:'/announce/pageQuery',
        method: 'post',
        data:{
            page
        }
    })
}