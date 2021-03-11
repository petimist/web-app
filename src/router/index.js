import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Login from '../views/Login.vue';
import Home from '../views/Homepage.vue';
import Mypet from '../views/Mypet.vue';
import Product from '../views/Product.vue';
import Appointment from '../views/Appointment.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false,
      isLoggedIn: false,
      title: 'Home',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false,
      isLoggedIn: false,
      title: 'Login',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false,
      isLoggedIn: false,
      title: 'Register',
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
      isLoggedIn: true,
      title: 'Dashboard',
    },
  },
  {
    path: '/mypet',
    name: 'Mypet',
    component: Mypet,
    meta: {
      requiresAuth: true,
      isLoggedIn: true,
      title: 'My pet',
    },
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
    meta: {
      requiresAuth: true,
      isLoggedIn: true,
      title: 'Product',
    },
  },
  {
    path: '/appointment',
    name: 'Appointment',
    component: Appointment,
    meta: {
      requiresAuth: true,
      isLoggedIn: true,
      title: 'Appointment',
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isLoggedIn = to.matched.some((record) => record.meta.isLoggedIn);

  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next('');
  } else if (!isLoggedIn && (await firebase.getCurrentUser())) {
    next('dashboard');
  }
  next();
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} | Petimist`;
  }
});

Vue.$router = router;

export default router;
