import { defineStore } from "pinia";
import pinia from '@/store';
import { userLogin } from "@/api/home";
import { IUserState } from './types'


export const useUserStoreHook = defineStore('userInfo', {
    state: (): IUserState => ({
        username: 'admin',
        accessToken: '',
        roles: ['common'],
    }),
    getters: {},
    actions: {
        storeUserLogin(data) {
            return userLogin(data).then((res: any) => {
                this.username = res.username;
                this.accessToken = res.accessToken;
                this.roles = res.roles;
                return res;
            })
        }
    },
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        paths: ['accessToken']
    },
})

export function useUserStore() {
     return useUserStoreHook(pinia)
}