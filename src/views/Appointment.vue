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

    <v-container fluid>
      <h1 align="left">
        Appointment
        <v-dialog v-model="dialog" persistent max-width="670px">
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
              <v-layout>
                <ValidationObserver ref="observer" v-slot="{ invalid }">
                  <v-form>
                    <ValidationProvider v-slot="{ errors }" name="Todo" rules="required">
                      <v-text-field
                        label="What is your appointment?"
                        outlined
                        color="blue"
                        hint="Please enter the reason of your pet's appointment to the vet"
                        :error-messages="errors"
                        v-model="addAppointment.todo"
                        required
                      ></v-text-field>
                    </ValidationProvider>
                    <v-row justify="center" class="mt-3 mb-3">
                      <h5 class="MyFont5 text-left">Please choose the date and time</h5>
                    </v-row>
                    <v-row>
                      <v-col>
                        <ValidationProvider name="date" rules="required">
                          <v-date-picker :min="today" v-model="addAppointment.date"></v-date-picker>
                        </ValidationProvider>
                      </v-col>
                      <v-col>
                        <ValidationProvider name="time" rules="required">
                          <v-time-picker v-model="addAppointment.time" format="ampm" class="mb-7" :disabled="addAppointment.date ? false : true">
                          </v-time-picker>
                        </ValidationProvider>
                      </v-col>
                    </v-row>

                    <ValidationProvider v-slot="{ errors }" name="todo" rules="digits:10">
                      <v-text-field
                        label="Vet's contact number (Optional)"
                        outlined
                        color="blue"
                        hint="Example: 0123456789"
                        v-model="addAppointment.vet"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>

                    <v-btn :disabled="invalid" @click="createAppointment" class="ma-2" color="green" dark>
                      Add
                      <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                    </v-btn>

                    <v-btn class="ma-2" color="red" dark @click="closePopUp">
                      CANCEL
                      <v-icon dark> mdi-cancel </v-icon>
                    </v-btn>
                  </v-form>
                </ValidationObserver>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-dialog>
      </h1>
      <br />
      <v-divider style="background-color: black"></v-divider>
      <!-- TEST BACKEND -->

      <v-container v-if="appointments.length > 0">
        <v-slide-x-reverse-transition class="py-0" group>
          <v-card v-for="appointment in appointments" :key="appointment.id" class="mb-2" color="#FFD180">
            <v-layout class="black--text">
              <v-icon color="black" class="ml-5 mb-1"> mdi-pencil </v-icon>
              <v-col>
                <v-row>
                  <h2 class="MyFont2 mt-4 ml-7 brown--text text-left" style="max-width: 800px;">
                    {{ appointment.todo }}
                  </h2>
                </v-row>

                <v-row v-if="appointment.date" justify="start">
                  <v-col cols="3">
                    <h3 class="MyFont5">Date : {{ appointment.date }}</h3>
                  </v-col>
                  <v-col v-if="appointment.time" cols="2">
                    <h3 class="MyFont5">Time: {{ appointment.time }}</h3>
                  </v-col>
                </v-row>
                <v-row v-if="appointment.vet">
                  <h3 class="MyFont5 ml-7 mb-2">Tel : {{ appointment.vet }}</h3>
                </v-row>
              </v-col>
              <v-btn class="mt-3 ml-3 mr-8" @click="chooseAppointmentToEdit(appointment)">edit</v-btn>

              <v-btn class="mt-3 ml-3 mr-8" @click="deleteAppointment(appointment.id)">delete </v-btn>
            </v-layout>
          </v-card>
        </v-slide-x-reverse-transition>
      </v-container>
      <v-container v-if="editAppointment">
        <v-overlay :value="overlay">
          <v-card light width="700">
            <v-toolbar class="mb-6 black--text" color="#FFD180" light dense>
              <v-icon class="mr-2">mdi-notebook-edit</v-icon>
              Please edit your pet's appointment information</v-toolbar
            >
            <v-card-text>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <v-form>
                <ValidationProvider v-slot="{ errors }" name="Todo" rules="required">
                  <v-text-field
                    label="What is your new appointment?"
                    outlined
                    color="blue"
                    hint="Please enter the new description of your pet's appointment to the vet"
                    :error-messages="errors"
                    v-model="editAppointment.todo"
                    required
                  ></v-text-field>
                </ValidationProvider>
                <v-row justify="center" class="mt-3 mb-3">
                  <h5 class="MyFont5 text-left">Please choose the date and time</h5>
                </v-row>
                <v-row>
                  <v-col>
                    <ValidationProvider name="date" rules="required">
                      <v-date-picker :min="today" v-model="editAppointment.date"></v-date-picker>
                    </ValidationProvider>
                  </v-col>
                  <v-col>
                    <ValidationProvider name="time" rules="required">
                      <v-time-picker v-model="editAppointment.time" format="ampm" class="mb-7" :disabled="editAppointment.date ? false : true">
                      </v-time-picker>
                    </ValidationProvider>
                  </v-col>
                </v-row>

                <ValidationProvider v-slot="{ errors }" name="todo" rules="digits:10">
                  <v-text-field
                    label="New vet's contact number (Optional)"
                    outlined
                    color="blue"
                    hint="Example: 0123456789"
                    v-model="addAppointment.vet"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>

                <v-btn :disabled="invalid" @click="updateAppointment" class="ma-2" color="yellow" >
                  EDIT
                  <v-icon dark> mdi-checkbox-marked-circle </v-icon>
                </v-btn>

                <v-btn class="ma-2" color="red" dark @click="overlay = false">
                  CANCEL
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
import { mapGetters } from 'vuex';
import { required, digits } from 'vee-validate/dist/rules';
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
extend('digits', {
  ...digits,
  message: 'Please enter 10 digits',
});

export default {
  data: () => ({
    addAppointment: {
      date: '',
      time: '',
      vet: '',
      todo: '',
    },
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
    dialog: false,
    dialog2: false,
    editAppointment: null,
    overlay: false,
  }),
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  created() {
    this.viewAppointment();
  },
  computed: {
    ...mapGetters(['getUser', 'getAppointments']),
    appointments() {
      return this.getAppointments;
    },
    today() {
      return new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1);
    },
  },
  methods: {
    createAppointment() {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .add(this.addAppointment)
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.viewAppointment();
          this.closePopUp();
          this.clearInput();
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
    viewAppointment() {
      const readApp = [];
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const tmpDocData = doc.data();
            tmpDocData.id = doc.id;
            tmpDocData.editing = false;
            readApp.push(tmpDocData);
          });
          this.$store.dispatch('setAppointmentsAction', readApp);
        });
    },
    updateAppointment() {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .doc(this.editAppointment.id)
        .set(this.editAppointment)
        .then(() => {
          console.log('Document successfully written!');
          this.overlay = !this.overlay;
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },

    deleteAppointment(id) {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
          this.viewAppointment();
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    closePopUp() {
      this.dialog = false;
    },
    clearInput() {
      this.addAppointment.date = '';
      this.addAppointment.time = '';
      this.addAppointment.vet = '';
      this.addAppointment.todo = '';
    },
    chooseAppointmentToEdit(appointment) {
      this.editAppointment = appointment;
      console.log(this.editAppointment);
      this.overlay = !this.overlay;
    },
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
