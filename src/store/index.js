import Vue from 'vue';
import Vuex from 'vuex';

import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
// <<<<<<< feature/PET-43
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
// =======
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.user.loggedIn;
    },
  },
  mutations: {
    setLogin(state, data) {
      state.user.loggedIn = data;
    },
    setUser(state, data) {
      state.user.data = data;
    },
  },
  actions: {
    userRegister({ commit }, payload) {
      if (payload) {
        commit('setUser', payload);
        commit('setLogin', payload === null);
      } else {
        commit('setUser', null);
      }
    },
    userLogin({ commit }, payload) {
      commit('setLogin', payload !== null);
      commit('setUser', payload);
    },
// >>>>>>> develop
  },
});
