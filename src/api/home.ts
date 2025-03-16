import { get, post } from '@/http/request';

export type LoginRequest = {
    username: string;
    password: string;
}

export type LoginResponse = {
    username: string;
    roles: string[];
    accessToken: string;
}

export type reLoginRequest = {
    accessToken: string;
}

// 登陆
export const userLogin = async (data?: LoginRequest) => {
    return post<LoginResponse>({}, '/login', data)
}

// 获取用户信息
export const refreshUserInfo = async (data?: reLoginRequest) => {
    return post<LoginResponse>({}, '/getUserInfo', data)
}