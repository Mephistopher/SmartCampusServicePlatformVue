import {request} from "@/network/request";


/**
 * 查询考试根据，用户id和课程id
 * @param userId
 * @param courseId
 * @returns {AxiosPromise}
 */
export function queryTestByUserIdAndCourseIdNetwork(userId, courseId){
    return request({
        url: '/userTestRecord/conditionPageQuery',
        data:{
            userId,
            courseId
        },
        method: 'post'
    })
}