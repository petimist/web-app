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
          <v-form>
            <h1 align="left"> Product </h1>
            <br>
            <v-divider style="background-color:black"></v-divider>
          </v-form>
        </v-container>
  </div>
</template>

<script>
// not used
export default ({
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
