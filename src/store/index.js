import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  actions: {
    setUserAction(context, payload) {
      context.commit('setUser', payload);
    },
    signInAction(context, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          // Signed in
          const { user } = userCredential;
          // ...
          context.commit('setUser', user);
        })
        .catch((error) => {
          // alert(error.message);
          // fix this later for better front-End
          console.log(error.message);
        });
    },
    signOutAction() {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
        console.log(error.message);
      });
    },
  },
  modules: {
  },
});
