<template>
  <v-app>
    <v-main>
      <!-- fix this, it should disappear on logout -->
      <v-container v-if="this.$store.state.user">
        <nav-bar />
      </v-container>
      <div id="app">
        <router-view />
      </div>
    </v-main>
  </v-app>
</template>

<script>
import navBar from './components/navbar.vue';

export default {
  components: {
    navBar,
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
