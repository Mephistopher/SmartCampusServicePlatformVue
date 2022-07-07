<<<<<<< HEAD
import {request} from "@/network/request";


/**
 *  查询通过的学分以及课程数量
 */
export function queryTotalCreditNetwork(userId){
    return request({
        url: '/courseRecord/queryUserTotalCredit',
        data:{
            userId
        },
        method: 'post'
    })
}

/**
 * 查询未通过的学分以及课程数量
 * @param userId
 * @returns {AxiosPromise}
 */
export function queryUnPassCreditNetwork(userId){
    return request({
        url: '/courseRecord/queryUserTotalUnPassCredit',
        data:{
            userId
        },
        method: 'post'
    })
}
=======
import {request} from "@/network/request";


/**
 *  查询通过的学分以及课程数量
 */
export function queryTotalCreditNetwork(userId){
    return request({
        url: '/courseRecord/queryUserTotalCredit',
        data:{
            userId
        },
        method: 'post'
    })
}

/**
 * 查询未通过的学分以及课程数量
 * @param userId
 * @returns {AxiosPromise}
 */
export function queryUnPassCreditNetwork(userId){
    return request({
        url: '/courseRecord/queryUserTotalUnPassCredit',
        data:{
            userId
        },
        method: 'post'
    })
}
>>>>>>> yhy
