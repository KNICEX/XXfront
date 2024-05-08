import {createRouter, createWebHistory} from 'vue-router'

let userInfoStore

const loadUserInfoStore = async () => {
    if (userInfoStore === undefined) {
        userInfoStore = (await import('@/stores/userInfo.js')).useUserInfoStore()
    }
}

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: () => import('@/views/LayoutView.vue'),
            meta: {
                needLogin: true
            },
            children: []
        },

        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/LoginRegister.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/views/LoginRegister.vue')
        }
    ]
})


router.beforeEach(async (to, from, next) => {
    if (to.meta.needLogin) {
        await loadUserInfoStore()
        if (userInfoStore.userInfo) {
            next()
        } else {
            userInfoStore.refresh()
            next()
        }
    } else {
        next()
    }
})
export default router
