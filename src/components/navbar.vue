<template>
  <v-app-bar
    dense
    color="#FFD180"
    app
    clipped-left
  >
    <v-img
      class="mr-3 mb-3"
      :aspect-ratio="1"
      :max-width="45"
      :max-height="45"
      src="https://media.tenor.com/images/b6816283f39bdc3b46c80a122a603456/tenor.gif"
    ></v-img>
    <h1 class="MyFont2">Petimist</h1>
    <v-spacer></v-spacer>
    <v-btn @click="goToLogout">logout</v-btn>
  </v-app-bar>
</template>

<script>
import { signOut } from '../utils/facebook';

export default {
  methods: {
    goToLogout() {
      signOut();
      this.$router.push('/');
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

.MyFont2 {
  font-size: 1cm;
  font-family: "Architects Daughter", cursive;
}
</style>
