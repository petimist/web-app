import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null,
    pets: [],
    species: [],
    appointments: [],
    products: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setPets(state, pets) {
      state.pets = pets.sort((x, y) => x.name + y.name);
    },
    setSpecies(state, species) {
      state.species = species;
    },
    setAppointments(state, appointments) {
      // TODO: date+time sort
      state.appointments = appointments.sort((x, y) => (x.date + x.time) - (y.date + y.time));
    },
    setProducts(state, products) {
      state.products = products;
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getPets(state) {
      return state.pets;
    },
    getSpecies(state) {
      return state.species;
    },
    getAppointments(state) {
      return state.appointments;
    },
    getProducts(state) {
      return state.products;
    },
  },
  actions: {
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
    setSpeciesAction(context, payload) {
      context.commit('setSpecies', payload);
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
