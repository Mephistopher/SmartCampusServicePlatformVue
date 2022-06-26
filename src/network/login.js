import {request} from "./request";

/**
 * 登录方法
 * @param userName 用户名
 * @param userPwd 密码
 * @returns ‘{
    "msg": "登录成功",
    "code": 200,
    "result": {
        "userIdStr": "##gM5MjM##QOzkTN1EDM5MjMzYTM",
        "username": "lisi",
        "trueName": "李四"
    }}’
 */
export function loginNetwork(userName, userPwd){
    return request({
        url: '/',
        params: {
            userName,
            userPwd
        }
    })
}