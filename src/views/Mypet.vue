<template>
  <div id="app">
    <v-navigation-drawer app clipped color="#BDBDBD" width="200">
      <v-list class="black--text">
        <v-list-item exact v-for="link of links" :key="link.title" :to="link.to">
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
                <ValidationObserver ref="observer" v-slot="{ invalid }">
                  <v-form>
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                      <v-text-field
                        label="Name"
                        outlined
                        color="red"
                        type="name"
                        hint="Please enter your pet's name"
                        v-model="petToAdd.name"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Birthday" rules="required">
                      <v-text-field
                        label="Birthday"
                        type="date"
                        outlined
                        color="red"
                        hint="Please enter your pet's birthday"
                        v-model="petToAdd.birthday"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Species" rules="required">
                      <v-select
                        v-model="petToAdd.species"
                        :items="species"
                        :error-messages="errors"
                        label="Select"
                        data-vv-name="select"
                        required
                      ></v-select>
                    </ValidationProvider>

                    <v-btn :disabled="invalid" @click="createPet" class="ma-2" color="green">
                      Add
                      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" dark @click="closePop">
                      Close
                      <v-icon dark> mdi-cancel </v-icon>
                    </v-btn>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
            </v-card>
          </v-dialog>
        </h1>
        <br />
        <v-divider style="background-color: black"></v-divider>
      </v-form>
      <!-- TEST BACKEND -->
      <v-container class="pa-4 text-center">
        <v-row class="fill-height" align="center" justify="center">
          <v-slide-x-reverse-transition class="py-0" group>
            <template v-for="(pet, i) in pets">
              <v-col :key="i">
                <v-hover v-slot="{ hover }">
                  <v-card
                    @click="choosePetToShow(pet)"
                    :elevation="hover ? 12 : 2"
                    class="mb-2"
                    color="#FFD180"
                    :class="{ 'on-hover': hover }"
                    width="900"
                  >
                    <v-layout class="black--text">
                      <v-icon color="black" class="ml-3 mb-1"> mdi-dog-side </v-icon>
                      <h3 class="MyFont5 mt-4 ml-5">{{ pet.name }}</h3>
                      <v-spacer></v-spacer>
                      <v-col cols="auto">
                        <v-btn @click="choosePetToEdit(pet)">edit</v-btn>
                      </v-col>
                      <v-btn class="mt-3 ml-3 mr-8" @click="deletePet(pet.id)">delete </v-btn>
                    </v-layout>
                  </v-card>
                </v-hover>
              </v-col>
            </template>
          </v-slide-x-reverse-transition>
        </v-row>
      </v-container>
      <v-container v-if="showPet">
        <v-overlay :value="overlayShow">
          <v-card light width="700">
            <v-toolbar color="#FFD180" light flat dense class="mb-6">
              <v-icon class="mr-2">mdi-notebook-edit</v-icon>
              <v-toolbar-title>Pet information</v-toolbar-title> <v-spacer></v-spacer>
              <v-btn @click="overlayShow = false">Close</v-btn>
            </v-toolbar>
            <v-card-text>
              <h3 class="MyFont5 mt-4 ml-5">Name: {{ showPet.name }}</h3>
              <h3 class="MyFont5 mt-4 ml-5">Birthday: {{ showPet.birthday }}</h3>
              <h3 class="MyFont5 mt-4 ml-5 mb-6 ">Species: {{ showPet.species }}</h3>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-overlay>
      </v-container>
      <v-container v-if="editPet">
        <v-overlay :value="overlay">
          <v-card light width="700">
            <v-toolbar color="#FFD180" light flat dense class="mb-6">
              <v-icon class="mr-2">mdi-notebook-edit</v-icon>
              <v-toolbar-title> Please edit your pet's information</v-toolbar-title></v-toolbar
            >
            <v-card-text>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                  <v-form>
                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                      <v-text-field
                        label="Name"
                        outlined
                        color="red"
                        type="name"
                        hint="Please enter your pet's name"
                        v-model="editPet.name"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Birthday" rules="required">
                      <v-text-field
                        label="Birthday"
                        type="date"
                        outlined
                        color="red"
                        hint="Please enter your pet's birthday"
                        v-model="editPet.birthday"
                        :error-messages="errors"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Species" rules="required">
                      <v-text-field
                        v-model="editPet.species"
                        outlined
                        :error-messages="errors"
                        label="Species"
                        hint="Please enter your pet's species"
                        required
                      ></v-text-field>
                    </ValidationProvider>

                    <v-btn :disabled="invalid" @click="updatePet" class="ma-2" color="yellow">
                      Confirm Edit
                      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" dark @click="overlay = !overlay; editPet = null">
                      Close
                      <v-icon dark> mdi-cancel </v-icon>
                    </v-btn>
                  </v-form>
                </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-overlay>
      </v-container>
    </v-container>
  </div>
</template>

<script>
import store from '@/store';

import { mapGetters } from 'vuex';
import { required } from 'vee-validate/dist/rules';
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate';
import { db } from '../plugins/firebase';

// there is a bug if you set mode=eager,
// bug is the form will not let you submit unless you unfocus or change focus state.
setInteractionMode('aggressive');
extend('required', {
  ...required,
  message: '{_field_} cannot be empty',
});

export default {
  data: () => ({
    petToAdd: {
      name: '',
      birthday: '',
      species: '',
    },
    petToEdit: {
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
    editPet: null,
    showPet: null,
    deletingPet: null,
    overlay: false,
    overlayShow: false,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  created() {
    const tmpPets = [];
    const tmpSpecies = [];
    db.collection('users')
      .doc(store.state.user.uid)
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
    db.collection('species')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmpDocData = doc.data();
          tmpSpecies.push(tmpDocData.breed);
          // doc.data() is never undefined for query doc snapshots
        });
        tmpSpecies.sort();
        tmpSpecies.push('Not Specified/Not Listed');
        this.$store.dispatch('setSpeciesAction', tmpSpecies);
      });
  },
  computed: {
    ...mapGetters(['getUser', 'getPets', 'getSpecies']),
    pets() {
      return this.getPets;
    },
    species() {
      return this.getSpecies;
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

    updatePet() {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .doc(this.editPet.id)
        .set(this.editPet)
        .then(() => {
          console.log('Document successfully written!');
          this.readPets();
          this.choosePetToEdit(null);
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },

    deletePet(id) {
      this.deletingPet = id;
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('pets')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.deletingPet = null;
          this.readPets();
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    choosePetToEdit(pet) {
      this.editPet = pet;
      console.log(this.editPet);
      this.overlay = !this.overlay;
    },

    choosePetToShow(pet) {
      this.showPet = pet;
      console.log(this.showPet);
      this.overlayShow = !this.overlayShow && !this.editPet && !this.deletingPet;
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
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont5 {
  font-size: 0.5cm;
  font-family: 'Architects Daughter', cursive;
}
</style>
