import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/extensions
import Register from '@/views/Register';
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
      icon: '/circle.png',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: true,
      title: 'Login',
      icon: '/circle.png',
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      auth: true,
      title: 'Register',
      icon: '/circle.png',
    },
  },
];

const router = new VueRouter({
  routes,
});

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} | Petimist`;
    const link = document.querySelector("[rel='icon']");
    link.setAttribute('href', to.meta.icon);
  }
});

export default router;
