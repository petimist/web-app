<template>
  <v-app>
  <div id="app">
    <v-app-bar color="#FFD180">
      <v-app-bar-nav-icon @click.stop="drawer1 = !drawer1"></v-app-bar-nav-icon>
    </v-app-bar>
    <router-view/>
  </div>
  </v-app>
</template>

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
