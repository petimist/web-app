<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer app clipped color="#BDBDBD" width="200">
        <v-list class="black--text">
          <v-list-item
            exact
            v-for="link of links"
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

      <v-main>
        <!-- Provides the application the proper gutter -->
        <v-container fluid>
          <v-form>
            <h1 align="left">
              Pet Info
              <v-dialog v-model="dialog" persistent max-width="600px">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn fab color="orange" dark v-bind="attrs" v-on="on">
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-text>
                    <v-container>
                      <v-layout align-center justify-center>
                        <v-col cols="18" sm="11" md="6">
                          <v-text-field
                            label="Name"
                            background-color="grey"
                            outlined
                            color="red"
                            type="name"
                            hint="Please enter your pet's name"
                            v-model="petToAdd.name"
                          ></v-text-field>

                          <v-text-field
                            label="Birthday"
                            background-color="grey"
                            outlined
                            color="red"
                            hint="Please enter your pet's birthday"
                            v-model="petToAdd.birthday"
                          ></v-text-field>

                          <v-text-field
                            label="Specie"
                            background-color="grey"
                            outlined
                            color="red"
                            hint="Please enter your pet's specie"
                            v-model="petToAdd.specie"
                          ></v-text-field>

                          <v-btn
                            @click="createPet"
                            class="ma-2"
                            color="green"
                            dark
                          >
                            Add
                            <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                          </v-btn>

                          <v-btn
                            class="ma-2"
                            color="red"
                            dark
                            @click="closepop"
                          >
                            Close
                            <v-icon dark> mdi-cancel </v-icon>
                          </v-btn>
                        </v-col>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </h1>
            <br />
            <v-divider style="background-color: black"></v-divider>
          </v-form>
          <h4><v-btn @click="readPets">read</v-btn></h4>
          <h1>{{ this.getPets }}</h1>
          <!-- TEST BACKEND -->
          <!-- <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Name</th>
                  <th class="text-left">id</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pet in this.getPets" :key="pet.id">
                  <td>{{ pet.name }}</td>
                  <td>{{ pet.id }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table> -->
          <!-- TEST BACKEND -->
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../plugins/firebase';

export default {
  data: () => ({
    petToAdd: {
      name: '',
      birthday: '',
      specie: '',
    },
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
  computed: {
    ...mapGetters(['getUser', 'getPets']),
  },
  methods: {
    createPet() {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .add(this.petToAdd)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.readPets();
          this.closepop();
          // clear petToAdd
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    readPets() {
      const tmpPets = [];
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tmpPets.push(doc.data());
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
          });
          this.$store.dispatch('setPetsAction', tmpPets);
        });
    },
    closepop() {
      this.dialog = false;
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
