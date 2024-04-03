import { createRouter, createWebHistory } from 'vue-router'
import Homepage from '@/components/homepage/Homepage.vue'
import RegisterView from '@/views/RegisterView.vue'
import LoginView from '@/views/LoginView.vue'
import MovieDescPage from '@/components/descriptionpage/MovieDescPage.vue'
import NotFound from '@/views/NotFound.vue'
import ReviewModal from '@/components/reviewpage/ReviewModal.vue'
import UserCommentView from '@/views/UserCommentView.vue'

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
            component: MovieDescPage,
        },
        {
            path: '/:notfound(.*)',
            component: NotFound
        },
        {
            name: 'review',
            path: '/review/:id',
            component: ReviewModal,
        },
        {
            path: '/commented',
            name: 'commented',
            component: UserCommentView,
        },
    ]

})

export default router
