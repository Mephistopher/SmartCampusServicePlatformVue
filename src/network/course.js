import {request} from "@/network/request";
import Qs from "qs";


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
 * 查询用户学分情况，
 *  选传semester（学期），不穿代表查询全部
 * @param userId
 * @param semester
 */
export function queryUserCreditNetwork(userId, semester){
    return request({
        url: '/courseRecord/queryUserCredit',
        data: {
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

/**
 *  条件查询课程
 *      查询类型queryType = 9
 * @param query
 * @returns {AxiosPromise}
 */
export function conditionPageQueryNetwork(query){
    return request({
        url: '/course/conditionPageQueryCourse',
        data: query,
        method: 'post'
    })
}

/**
 * 查询当前学期课程
 */
export function queryCurSemesterCourseNetwork(query){
    console.log(query)
    if(query.type === 0) {
        return request({
            url: '/course/currentSemesterCourse',
            method: 'post'
        })
    }
    if(query.type === 1) {
        return request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // 在请求之前对data传参进行格式转换
            transformRequest: [function(data) {
                data = Qs.stringify(data)
                return data
            }],
            url: '/course/queryCSTCourseByCollage',
            data:{
                collageName: query.context
            },
            method: 'post'
        })
    }
    if(query.type === 2) {
        return request({
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            // 在请求之前对data传参进行格式转换
            transformRequest: [function(data) {
                data = Qs.stringify(data)
                return data
            }],
            url: '/course/queryCSTCourseByName',
            data:{
                courseName: query.context
            },
            method: 'post'
        })
    }
}

/**
 * 查询课余量,以及是否选过
 */
export function queryCourseStockNetwork(courseId, userId){
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }],
        url:'/seckillcourse/querySeckillCourseStock',
        data: {
            courseId,
            userId
        },
        method: 'post'
    })
}

/**
 * 选课，
 * @param courseId
 * @param userId
 */
export function selectCourseNetwork(courseId, userId){
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }],
        url: '/selectCourse/seckillCourse',
        data: {
            courseId,
            userId
        },
        method: 'post'
    })
}

/**
 * 查询用户用过的时间
 */
export function queryUsedTimeNetwork(userId){
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }],
        url: '/selectCourse/queryUserCourseTime',
        data: {
            userId
        },
        method: 'post'
    })
}


/**
 * 查询用户当前选课阶段选到的课
 * @param userId
 * @returns {AxiosPromise}
 */
export function queryNowSelectedCourseNetwork(userId){
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }],
        url: '/selectCourse/userSeckillCourseId',
        data: {
            userId
        },
        method: 'post'
    })
}


/**
 * 取消选课
 * @param courseId
 * @param userId
 */
export function cancelSelectCourseNetwork(courseId, userId){
    return request({
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // 在请求之前对data传参进行格式转换
        transformRequest: [function(data) {
            data = Qs.stringify(data)
            return data
        }],
        url: '/selectCourse/cancelSeckillCourse',
        data:{
            courseId,
            userId
        },
        method: 'post'
    })
}