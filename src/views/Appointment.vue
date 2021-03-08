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
              <v-icon>mdi-{{ link.icon }}</v-icon>
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
        <v-btn to="/">logout</v-btn>
      </v-app-bar>

      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <v-form>
            <div>
              <h1 align="left"> Appointment
                <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn fab color="orange" dark
                           v-bind="attrs"
                           v-on="on">
                      <v-icon dark>
                        mdi-plus
                      </v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-layout align-center justify-center>
                          <v-col
                              cols="18"
                              sm="11"
                              md="6"
                          >
                            <v-text-field
                                label="Name"
                                background-color="grey"
                                outlined color="red"
                                type="name"
                                hint="Please enter your pet's name"
                            ></v-text-field>

                            <v-text-field
                                label="Birthday"
                                background-color="grey"
                                outlined color="red"
                                hint="Please enter your pet's birthday"
                            ></v-text-field>

                            <v-text-field
                                label="Specie"
                                background-color="grey"
                                outlined color="red"
                                hint="Please enter your pet's specie"
                            ></v-text-field>

                            <v-btn
                                class="ma-2"
                                color="green"
                                dark
                            >
                              Add
                              <v-icon dark>
                                mdi-checkbox-marked-circle
                              </v-icon>
                            </v-btn>

                            <v-btn
                                class="ma-2"
                                color="red"
                                dark
                                @click="closePopUp"
                            >
                              Close
                              <v-icon dark>
                                mdi-cancel
                              </v-icon>
                            </v-btn>
                          </v-col>
                        </v-layout>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-dialog>
              </h1>
              <br>
              <v-divider style="background-color:black"></v-divider>
            </div>
          </v-form>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
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
    dialog: false,
  }),
  methods: {
    closePopUp() {
      this.dialog = false;
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
