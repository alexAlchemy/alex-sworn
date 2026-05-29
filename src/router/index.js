import { createRouter, createWebHistory } from '@ionic/vue-router';
import AboutPage from '../views/AboutPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import HomePage from '../views/HomePage.vue';
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/history',
        name: 'History',
        component: HistoryPage
    },
    {
        path: '/about',
        name: 'About',
        component: AboutPage
    }
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});
export default router;
