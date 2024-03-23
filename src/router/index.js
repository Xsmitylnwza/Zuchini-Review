import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/components/Homepage/Homepage.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import MovieDes from '@/components/descriptionpage/MovieDescriptionPage.vue'
import NotFound from '@/views/NotFound.vue'

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
            path: '/movie/:id',
            component: MovieDes,
        },
        {
            path: '/:notfound(.*)',
            component: NotFound
        }
    ]

})

export default router