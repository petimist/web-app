import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import store from './store';

import { firebaseConfig } from './plugins/firebase';

Vue.config.productionTip = false;

// check if firebase is initialise
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
// constantly checking for authentication
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('setUserAction', user);
  } else {
    store.dispatch('setUserAction', null);
  }
});

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
