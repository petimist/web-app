import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    tip: null,
    pets: [],
    appointments: [],
    products: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPets(state, pets) {
      state.pets = pets;
    },
    setAppointments(state, appointments) {
      state.appointments = appointments;
    },
    setProducts(state, products) {
      state.products = products;
    },
    setTip(state, tip) {
      state.tip = tip;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPets(state) {
      return state.pets;
    },
    getAppointments(state) {
      return state.appointments;
    },
    getProducts(state) {
      return state.products;
    },
    getTip(state) {
      return state.tip;
    },
  },
  actions: {
    setTipAction(context, payload) {
      context.commit('setTip', payload);
    },
    setAppointmentsAction(context, payload) {
      context.commit('setAppointments', payload);
    },
    setPetsAction(context, payload) {
      context.commit('setPets', payload);
    },
    setProductsAction(context, payload) {
      context.commit('setProducts', payload);
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
    signOutAction(context) {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        context.commit('setUser', null);
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

Vue.$store = store;

export default store;
