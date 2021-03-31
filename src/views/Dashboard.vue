<template>
  <div id="app">
    <div>
      welcome
      <!-- <button @click="getTip">get tip</button> -->
    </div>
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
  </div>
</template>

<script>
import { signOut } from '../utils/facebook';
// import { db } from '../plugins/firebase';

export default {
  data: () => ({
    links: [
      {
        title: 'Appointment',
        icon: 'book-open-outline',
        to: '/appointment',
      },
      // {
      //   title: 'Product',
      //   icon: 'food-variant',
      //   to: '/product',
      // },
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
    // getTip() {
    //   const tips = [];
    //   db.collection('tips').get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //     // doc.data() is never undefined for query doc snapshots
    //       // console.log(doc.id, ' => ', doc.data());
    //       tips.push(doc.data().name);
    //     });
    //     return tips[Math.floor(Math.random() * tips.length)];
    //   });
    // },
  },
  computed: {
    // tip() {
    //   return this.getTip();
    // },
  },

};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont2 {
  font-size: 1cm;
  font-family: 'Architects Daughter', cursive;
}
</style>
