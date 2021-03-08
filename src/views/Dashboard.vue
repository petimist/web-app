<template>
  <v-container>
    <h1>This is Dashboard Page</h1>
    <v-btn
      color="#FFD180"
      class="mr-16 ma-2 MyFont1"
      @click="logout"
    >
      Log out
    </v-btn>
  </v-container>
</template>

<script>
import { signOut } from '../utils/facebook';

export default {
  name: 'Dashboard',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    logout() {
      signOut();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
</style>
