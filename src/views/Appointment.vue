<template>
  <div id="app">
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

        <v-container fluid>
          <v-form>
            <h1 align="left">
              Appointment
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
                          label="Todo"
                          outlined
                          color="red"
                          hint="Please enter the reason of your pet's appointment to the vet"
                          v-model="addAppointment.todo"
                      ></v-text-field>

                      <v-text-field
                          label="Date"
                          type="date"
                          outlined
                          color="red"
                          hint="Please choose the date for your pet's appointment"
                          v-model="addAppointment.date"
                      ></v-text-field>

                      <v-time-picker
                          v-model="addAppointment.time"
                          format="ampm"
                          class="mb-7"
                      >
                      </v-time-picker>

                      <v-text-field
                          label="Vet"
                          outlined
                          color="red"
                          hint="Please enter the vet's contact information (Phone number)"
                          v-model="addAppointment.vet"
                      ></v-text-field>

                      <v-btn
                          @click="createAppointment"
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
                          @click="closePopUp"
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

          <v-container v-if="appointments.length > 0">
            <v-slide-x-reverse-transition
                class="py-0"
                group
            >
              <v-card v-for="appointment in appointments" :key="appointment.id" class="mb-2" color="#FFD180" height="110" >
                <v-layout class="black--text">
                  <v-icon color="black" class="ml-3 mb-1"> mdi-pencil </v-icon>
                  <h3 class="MyFont5 mt-4 ml-5">
                    Appointment: {{ appointment.todo }}
                    <br>
                    Date : {{ appointment.date }}, at {{ appointment.time }}
                    <br>
                    Tel : {{ appointment.vet }}
                  </h3>
                  <v-spacer></v-spacer>

                  <v-col cols="auto">
                    <v-dialog
                        v-model="dialog2"
                        transition="dialog-top-transition"
                        max-width="600"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            v-bind="attrs"
                            v-on="on"
                        >edit</v-btn>
                      </template>

                      <template>
                        <v-card>
                          <v-toolbar
                              class="mb-6 black--text"
                              color="#FFD180"
                              light
                              dense
                          >Please edit your pet's appointment information</v-toolbar>
                          <v-card-text>
                            <v-text-field label="Please enter the reason of your pet's appointment to the vet" v-model="appointment.todo" >
                            </v-text-field>
                            <v-text-field type="date" label="Please choose the date for your pet's appointment" v-model="appointment.date" >
                            </v-text-field>
                            <v-text-field label="Please choose the time for your pet's appointment" v-model="appointment.time" >
                            </v-text-field>
                            <v-text-field label="Please enter the vet's contact information (Phone number)" v-model="appointment.vet" >
                            </v-text-field>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn @click="updateAppointment(appointment.id, appointment)">Confirm Edit</v-btn>
                            <v-btn
                                @click="closePop2"
                            >Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>

                  <v-btn class="mt-3 ml-3 mr-8" @click="deleteAppointment(appointment.id)">delete </v-btn>
                </v-layout>
              </v-card>
            </v-slide-x-reverse-transition>
          </v-container>
        </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { db } from '../plugins/firebase';

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
    dialog2: false,
  }),
  created() {
    this.viewAppointment();
  },
  computed: {
    ...mapGetters(['getUser', 'getAppointments']),
    appointments() {
      return this.getAppointments;
    },
  },
  methods: {
    createAppointment() {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .add({
          date: this.addAppointment.date,
          time: this.addAppointment.time,
          vet: this.addAppointment.vet,
          todo: this.addAppointment.todo,
          timestamp: `${this.addAppointment.date} ${this.addAppointment.time}`,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.clearInput();
          this.viewAppointment();
          this.closePopUp();
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
          const sortedAppointments = readApp.sort((a, b) => {
            const aDate = new Date(`${a.date} ${a.time}`);
            const bDate = new Date(`${b.date} ${b.time}`);
            return -(bDate - aDate);
          });
          this.$store.dispatch('setAppointmentsAction', sortedAppointments);
        });
    },
    updateAppointment(id, appointment) {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('appointment')
        .doc(id)
        .set(appointment)
        .then(() => {
          console.log('Document successfully written!');
          this.closePop2();
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
    closePop2() {
      this.dialog2 = false;
    },
    clearInput() {
      this.addAppointment.date = '';
      this.addAppointment.time = '';
      this.addAppointment.vet = '';
      this.addAppointment.todo = '';
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
