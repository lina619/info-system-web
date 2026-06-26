import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import HikariView from '../views/HikariView.vue'
import ApplyView from '../views/ApplyView.vue'
import RegisterView from '../views/RegisterView.vue'
import ApiTestView from '../views/ApiTestView.vue'
import UserView from '../views/UserView.vue'

const routes = [

    {
        path: '/',
        component: HomeView
    },

    {
        path: '/hikari',
        component: HikariView
    },

    {
        path: '/apply',
        component: ApplyView
    },

    {
        path: '/register',
        component: RegisterView
    },

    {
        path: '/apitest',
        component: ApiTestView
    },

    {
        path: '/user',
        component: UserView
    }

]

const router = createRouter({

    history: createWebHistory(),

    routes

})

export default router