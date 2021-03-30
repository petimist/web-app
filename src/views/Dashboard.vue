<template>
  <div id="app">
      <v-navigation-drawer
          app
          clipped
          color="#BDBDBD"
          width="200"
      >
        <v-list class="black--text">
        <v-list-item
            exact v-for="link of links"
            :key="link.title"
            :to="link.to"
        >
          <v-list-item-action>
            <v-icon>mdi-{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
      </v-navigation-drawer>

        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>

    <h1 style="font-size: 50px; color: black">Welcome to Petimist!</h1>
    <br>
    <h2 style="font-size: 40px; color: black">..... There are four options for you ....</h2>
    <br>
    <h3 style="font-size: 30px; color: black">1.You can click on the dog's icon to navigate to your pets</h3>
    <br>
    <h3 style="font-size: 30px; color: black">2.You can click on the calendar icon to navigate to your appointments</h3>
    <br>
    <h3 style="font-size: 30px; color: black">3.You can click on the product icon to navigate to your pet's products</h3>
    <br>
    <h3 style="font-size: 30px; color: black">4.You can click on the logout button to logout</h3>

    <div class="d-flex flex-column align-center">
      <v-img
          src="https://diaryofsarita.files.wordpress.com/2015/01/01508-language2bseparator.png?w=1400"
          max-width="800"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { signOut } from '../utils/facebook';

export default {
  data: () => ({
    links: [
      {
        title: 'Appointment',
        icon: 'book-open-outline',
        to: '/appointment',
      },
      {
        title: 'Product',
        icon: 'food-variant',
        to: '/product',
      },
      {
        title: 'My pet',
        icon: 'dog',
        to: '/mypet',
      },
    ],
  }),
  methods: {
    goToLogout() {
      signOut();

      this.$router.push('/');
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont2{
  font-size: 1cm;
  font-family: 'Architects Daughter', cursive
}

</style>
