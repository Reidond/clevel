import Vue from 'vue';
import VueRouter from 'vue-router';
import ModelBoard from '@/views/ModelBoard.vue';
import Testing from '@/views/Testing.vue';
import Main from '../views/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
  },
  {
    path: '/modelboard',
    name: 'ModelBoard',
    component: ModelBoard,
  },
  {
    path: '/testing',
    name: 'Testing',
    component: Testing,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
