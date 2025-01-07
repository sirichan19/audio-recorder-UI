import { createRouter, createWebHistory } from 'vue-router';
import RecordingPage from './../components/recording/RecordingPage.vue';
import HomePage from './../components/HomePage1.vue';

const routes = [
    { path: '/', component: HomePage },
    { path: '/recording', component: RecordingPage }
];

console.log('Routes:', routes);

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;