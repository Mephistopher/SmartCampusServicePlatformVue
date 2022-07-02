import {request} from "@/network/request";


/**
 *  根据课程和学期查询课程
 */
export function querySemesterCourseNetwork(userId, semester){
    return request({
        url: '/courseRecord/conditionPageQuery',
        data:{
            page:1,
            size: 100,
            userId,
            semester
        },
        method: 'post'
    })
}

/**
 * 查询不及格的课程
 * @param userId
 */
export function queryUnPassCourseNetwork(userId){
    return request({
        url: '/courseRecord/queryUserUnPassCourse',
        data:{
            userId
        },
        method: 'post'
    })
}

/**
 * 根据id查询课程全部信息
 */
export function queryCourseTotalInfoByIdsNetwork(courseIdArray){
    return request({
        url: '/course/queryByIds',
        data: courseIdArray,
        method: 'post'
    })
}