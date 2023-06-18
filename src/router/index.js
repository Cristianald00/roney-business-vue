import { createRouter, createWebHistory } from 'vue-router'
import authorizationMiddleware from '../middleware/authorization'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import OutlinesView from '../views/OutlinesView.vue'
import RegisterView from '../views/RegisterView.vue'
import OrganizationsView from '../views/OrganizationsView.vue'

const routes = [
    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        meta: {
            allowsPublicAccess: true,
            requiresAuth: true
        }
    },
    {
        path: '/expenses',
        name: 'expenses',
        component: ExpensesView,
        meta: {
            allowsPublicAccess: true,
            requiresAuth: true
        }
    },
    {
        path: '/home',
        name: 'home',
        component: HomeView,
        meta: {
            allowsPublicAccess: false,
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: {
            allowsPublicAccess: true,
            requiresAuth: false
        }
    },
    {
        path: '/organizations',
        name: 'organizations',
        component: OrganizationsView,
        meta: {
            allowsPublicAccess: false,
            requiresAuth: true
        }
    },
    {
        path: '/outlines',
        name: 'outlines',
        component: OutlinesView,
        meta: {
            allowsPublicAccess: false,
            requiresAuth: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: {
            allowsPublicAccess: true,
            requiresAuth: false
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(authorizationMiddleware);

export default router;
