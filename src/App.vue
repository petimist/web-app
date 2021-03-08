<template>
  <v-app>
    <v-container v-if="userExist">
      <nav-bar />
    </v-container>
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex';
import navBar from './components/navbar.vue';

export default {
  components: {
    navBar,
  },
  computed: {
    ...mapGetters(['getUser']),
    userExist() {
      console.log(this.getUser);
      return this.getUser;
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
