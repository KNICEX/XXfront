import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfo as userInfoReq } from "@/api/user.js";

export const useUserInfoStore = defineStore('userInfo', () => {
    const userInfo = ref(null)
    async function getUserInfo() {
        if (userInfo.value?.id) {
            return userInfo.value
        } else {
            const res = await userInfoReq()
            userInfo.value = res
            return res
        }
    }

    async function refresh() {
        const res = await userInfoReq()
        userInfo.value = res
        return res
    }

    return { userInfo, getUserInfo, refresh }
})
