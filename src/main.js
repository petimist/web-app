import Vue from 'vue';
import './plugins/firebase';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';
import './plugins/firebase';

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
