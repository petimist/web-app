import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
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
  },
});
