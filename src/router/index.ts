import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EventsView from '@/views/EventsView.vue';
import AboutUsView from '@/views/AboutUsView.vue';
import TeamView from '@/views/TeamView.vue';
import Login from '@/views/Login/Login.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/events', name: 'events', component: EventsView },
    { path: '/about', name: 'about', component: AboutUsView },
    { path: '/team', name: 'team', component: TeamView },
    { path: '/login', name: 'login', component: Login },

  ],
});

export default router;