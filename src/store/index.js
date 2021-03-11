import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    pets: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPets(state, pets) {
      state.pets = pets;
    },
    setAppointment(state, appointment) {
      state.appointment = appointment.pets;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPets(state) {
      return state.pets;
    },
  },
  actions: {
    setPetsAction(context, payload) {
      context.commit('setPets', payload);
    },
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
          alert(error.message);
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
    userRegister({ commit }, payload) {
      if (payload) {
        commit('setUser', payload);
      } else {
        commit('setUser', null);
      }
    },
    userLogin({ commit }, payload) {
      commit('setLogin', payload !== null);
      commit('setUser', payload);
    },
  },
  modules: {
  },
});
