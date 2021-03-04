import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import Register from '@/views/Register';
// eslint-disable-next-line import/extensions
import Dashboard from '@/views/Dashboard';
// eslint-disable-next-line import/extensions
import Login from '../views/Login';
import Home from '../views/Homepage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
      title: 'Home',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: true,
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      auth: true,
      title: 'Register',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
      title: 'Dashboard',
    },
  },
];

const router = new VueRouter({
  routes,
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} | Petimist`;
  }
});

export default router;
