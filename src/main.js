import vuetify from '@/plugins/vuetify';
import 'firebase/auth';
import store from '@/store';
import router from '@/router';
import Vue from 'vue';
import App from './App.vue';
import '@/plugins/firebase';

Vue.config.productionTip = false;

new Vue({
  render: (createApp) => createApp(App),
  store,
  vuetify,
  router,
}).$mount('#app');
