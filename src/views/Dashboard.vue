<template>
  <div id="app">
    <div>
      <button @click="butClick" class="show-modal">Tip of The Day</button>
    <div class="modal hidden">
             <h1>Tip</h1>
        <button class="close-modal">&times;</button>
        <div id="tip"> <h3>{{ tip.name }}</h3></div>
    </div>
    <div class="overlay hidden"></div>
      <!-- <button id="show-modal" @click="showModal = true">Tip Today</button> -->
      <!-- use the modal component, pass in the prop -->
      <!-- <modal v-if="showModal" @close="showModal = false"> -->
        <!--
      you can use custom content here to overwrite
      default content
    -->
        <!-- <h3 slot="header">custom header</h3> -->
      <!-- </modal> -->
      <!-- <div @click="enableTipDialog">
        Click to view some cool tips for your pets.
      </div> -->
      <div>
        <!-- <v-card v-if="tipDialog == true"> -->
          <!-- <div id="tip">{{ tip.name }}</div> -->
          <!-- <div @click="disableTipDialog">close</div> -->
        <!-- </v-card> -->
      </div>

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
// import store from '@/store';

import { mapGetters } from 'vuex';
import firebase from 'firebase/app';
import { signOut } from '../utils/facebook';
import { db } from '../plugins/firebase';

export default {
  data: () => ({
    tipDialog: false,
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

  created() {
    const tips = [];
    db.collection('tips').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tips.push(doc.data());
      });
      const tip = tips[Math.floor(Math.random() * tips.length)];
      console.log(tip);
      this.$store.dispatch('setTipAction', tip);
    });
  },

  methods: {
    butClick() {
      const modal = document.querySelector('.modal');
      const overlay = document.querySelector('.overlay');
      const btnCloseModal = document.querySelector('.close-modal');
      const btnsOpenModal = document.querySelector('.show-modal');

      const openModal = () => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      };

      const closeModal = () => {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      };
      btnsOpenModal.addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
      });

      btnCloseModal.addEventListener('click', openModal);
      overlay.addEventListener('click', closeModal);

      document.addEventListener('keydown', (e) => {
        console.log(e.key);

        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });
    },
    // enableTipDialog() {
    //   this.tipDialog = true;
    // },
    // disableTipDialog() {
    //   this.tipDialog = false;
    // },
    goToLogout() {
      signOut();

      this.$router.push('/');
    },
    viewAppointment() {
      const tip = db.collection('tips');
      const key = tip.doc().id;
      tip.where(firebase.firestore.FieldPath.documentId(), '>=', key)
        .limit(1)
        .get()
        .then((snapshot) => {
          if (snapshot.size > 0) {
            snapshot.forEach((doc) => {
              console.log(doc.id, '=>', doc.data());
            });
          } else {
            tip.where(firebase.firestore.FieldPath.documentId(), '<', key)
              .limit(1)
              .get()
              .then(() => {
                snapshot.forEach((doc) => {
                  console.log(doc.id, '=>', doc.data());
                });
              })
              .catch((err) => {
                console.log('Error getting documents', err);
              });
          }
        })
        .catch((err) => {
          console.log('Error getting documents', err);
        });
    },
  },
  computed: {
    ...mapGetters(['getTip']),
    tip() {
      return this.getTip;
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

#tip{
  font-size: 12px;
}
* {
  padding: 0;
  margin: 0;
}
/* body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
 } */
.show-modal {
  font-size: 2rem;
  font-weight: 600;
  padding: 1.75rem 3.5rem;
  margin: 5rem 2rem;
  border: none;
  background-color: #efe1ce;
  color: #444;
  border-radius: 1rem;
  cursor: pointer;
}

.close-modal {
  position: absolute;
  top: 1.2rem;
  right: 2rem;
  font-size: 3rem;
  color: #333;
  cursor: pointer;
  border: none;
  background: none;
}

/* h1 {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

p {
  font-size: 1rem;
} */

/* -------------------------- */
/* CLASSES TO MAKE MODAL WORK */
.hidden {
  display: none;
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  background-color: white;
  padding: 6rem;
  border-radius: 5px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  opacity: 1;
animation-name: fadeInOpacity;
animation-iteration-count: 1;
animation-timing-function: ease-in;
animation-duration: 0.5s;
}

@keyframes fadeInOpacity {
0% {
opacity: 0;
}
100% {
opacity: 1;
}
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1240px;
  background-color: white;
  padding: 6rem;
  border-radius: 5px;
  box-shadow: 0 3rem 5rem rgba(0, 0, 0, 0.3);
  z-index: 10;
  opacity: 1;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  z-index: 5;
}

</style>
