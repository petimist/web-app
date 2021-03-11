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
                  <v-toolbar color="#FFD180" light flat dense class="mb-6">
                    <v-icon class="mr-2">mdi-notebook-edit</v-icon>
                    <v-toolbar-title>Please fill out the information below in English</v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>

                    <v-form>
                          <v-text-field
                            label="Name"
                            outlined
                            color="red"
                            type="name"
                            hint="Please enter your pet's name"
                            v-model="petToAdd.name"
                          ></v-text-field>

                          <v-text-field
                            label="Birthday"
                            type="date"
                            outlined
                            color="red"
                            hint="Please enter your pet's birthday"
                            v-model="petToAdd.birthday"
                          ></v-text-field>

                          <v-text-field
                            label="Species"
                            outlined
                            color="red"
                            hint="Please enter your pet's specie"
                            v-model="petToAdd.species"
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
                            @click="closePop"
                          >
                            Close
                            <v-icon dark> mdi-cancel </v-icon>
                          </v-btn>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </h1>
            <br />
            <v-divider style="background-color: black"></v-divider>
          </v-form>
          <!-- TEST BACKEND -->

          <v-container v-if="pets.length > 0">
            <v-slide-x-reverse-transition
                class="py-0"
                group
            >
              <v-card v-for="pet in pets" :key="pet.id" class="mb-2" color="#FFD180" height="60" >
                <v-layout class="black--text">
                  <v-icon color="black" class="ml-3 mb-1"> mdi-dog-side </v-icon>
                  <h3 class="MyFont5 mt-4 ml-5">
                    Name: {{pet.name}}
                  </h3>
                  <v-spacer></v-spacer>

                  <v-col cols="auto">
                    <v-dialog
                        transition="dialog-top-transition"
                        max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                        >edit</v-btn>
                      </template>

                      <template v-slot:default="dialog">
                        <v-card>
                          <v-toolbar
                              class="mb-6 black--text"
                              color="#FFD180"
                              light
                              dense
                          >Please edit your pet's information</v-toolbar>
                          <v-card-text>
                            <v-text-field label="pet's name" v-model="pet.name" ></v-text-field>
                            <v-text-field type="date" label="pet's birthday" v-model="pet.birthday" ></v-text-field>
                            <v-text-field label="pet's species" v-model="pet.species" ></v-text-field>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn @click="updatePet(pet.id, pet)">ConfirmEdit</v-btn>
                            <v-btn
                                @click="dialog.value = false"
                            >Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>

                  <v-btn class="mt-3 ml-3 mr-8" @click="deletePet(pet.id)">delete </v-btn>
                </v-layout>
              </v-card>
            </v-slide-x-reverse-transition>
          </v-container>
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
      species: '',
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
  created() {
    this.readPets();
  },
  computed: {
    ...mapGetters(['getUser', 'getPets']),
    pets() {
      return this.getPets;
    },
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
          this.closePop();
          // clear petToAdd
          this.clearInput();
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
            const tmpDocData = doc.data();
            tmpDocData.id = doc.id;
            tmpDocData.editing = false;
            tmpPets.push(tmpDocData);
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
          });
          this.$store.dispatch('setPetsAction', tmpPets);
        });
    },

    updatePet(id, pet) {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .doc(id)
        .set(pet)
        .then(() => {
          console.log('Document successfully written!');
          this.readPets();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },

    deletePet(id) {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.readPets();
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },

    closePop() {
      this.dialog = false;
    },
    clearInput() {
      this.petToAdd.name = '';
      this.petToAdd.birthday = '';
      this.petToAdd.species = '';
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

.MyFont5 {
  font-size: 0.5cm;
  font-family: "Architects Daughter", cursive;
}
</style>
