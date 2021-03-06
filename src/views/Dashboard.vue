<template>
  <div id="app">
    <v-app>
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
            <v-icon>mdi-{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> {{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar dense color="#FFD180"
                 app
                 clipped-left
      ><v-img
          class="mr-3 mb-3"
          :aspect-ratio="1"
          :max-width="45"
          :max-height="45"
          src="https://media.tenor.com/images/b6816283f39bdc3b46c80a122a603456/tenor.gif"
      ></v-img>
        <h1 class="MyFont2">Petimist</h1>
        <v-spacer></v-spacer>
        <v-btn to="../login"> log out </v-btn>
      </v-app-bar>

      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import Appointment from './Appointment.vue';
import Product from './Product.vue';
import Mypet from './Mypet.vue';

Vue.use(VueRouter);

const routes = new VueRouter({
  routes: [
    {
      path: '/appointment',
      name: 'Appointment',
      component: Appointment,
    },
    {
      path: '/product',
      name: 'Product',
      component: Product,
    },
    {
      path: '/mypet',
      name: 'Mypet',
      component: Mypet,
    },
  ],
});

// eslint-disable-next-line no-new
export default ({
  routes,
  router,
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
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont2{
  font-size: 1cm;
  font-family: 'Architects Daughter', cursive
}
</style>
