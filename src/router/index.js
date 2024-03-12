import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '@/components/Homepage/Homepage.vue'
import LoginView from '@/components/Homepage/Homepage.vue'
import Homepage from '@/components/Homepage/Homepage.vue'
import Test from '@/components/DescriptionPage/Test.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Homepage
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/test',
            name: 'test',
            component: Test
        }
    ]
})

export default router