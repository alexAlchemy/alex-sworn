import { createRouter, createWebHistory } from '@ionic/vue-router';
import AboutPage from '../views/AboutPage.vue';
import AssetDetailPage from '../views/AssetDetailPage.vue';
import AssetListPage from '../views/AssetListPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import HomePage from '../views/HomePage.vue';
import RandomTableDetail from '../views/RandomTableDetail.vue';
import RandomTableList from '../views/RandomTableList.vue';
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
        path: '/tables',
        name: 'RandomTableList',
        component: RandomTableList
    },
    {
        path: '/tables/:id',
        name: 'RandomTableDetail',
        component: RandomTableDetail
    },
    {
        path: '/assets',
        name: 'AssetList',
        component: AssetListPage
    },
    {
        path: '/assets/:id',
        name: 'AssetDetail',
        component: AssetDetailPage
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
