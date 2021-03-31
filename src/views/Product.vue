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
        <h1 align="left">Product</h1>
        <br />
        <v-divider style="background-color: black"></v-divider>
      </v-form>
    </v-container>

    <!-- <div>
        <v-card width="500" class="justify-center"
          ><v-text-field v-model="newProduct.name" label="Product Name">
          </v-text-field>
          <v-text-field
            v-model="newProduct.price"
            label="Product Price"
          ></v-text-field>
          <v-btn @click="createProduct"> add product </v-btn></v-card
        >
      </div> -->

    <div>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center"></th>
              <th class="text-center">Name</th>
              <th class="text-center">Price</th>
              <th class="text-center"></th>
              <!-- <th class="text-center">Quantity</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <v-img max-height="120" max-width="120" :src="product.image"></v-img>
              </td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>

              <td>
                <v-btn @click="plus(product.price)"> + </v-btn>
                <v-btn @click="minus(product.price)"> - </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div>
        total expense = {{ this.expense }} baht
        <br />
      </div>
    </div>
  </div>
</template>

<script>
// import store from '@/store';
import { mapGetters } from 'vuex';
import { db } from '../plugins/firebase';

export default {
  data: () => ({
    currentExpense: 0,
    newProduct: {
      name: '',
      price: '',
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
  }),

  created() {
    const tmpProds = [];
    db.collection('products')
      // .doc(store.state.user.uid)
      // .collection('products')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const tmpDocData = doc.data();
          tmpDocData.id = doc.id;
          tmpProds.push(tmpDocData);
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, ' => ', doc.data());
        });
        this.$store.dispatch('setProductsAction', tmpProds);
      });
  },
  computed: {
    ...mapGetters(['getUser', 'getProducts']),
    products() {
      return this.getProducts;
    },
    expense() {
      return this.currentExpense;
    },
  },
  methods: {
    plus(price) {
      this.currentExpense += price;
    },

    minus(price) {
      if (this.currentExpense - price < 0) {
        alert('Price cannot be below zero.');
      } else {
        this.currentExpense -= price;
      }
    },

    // createProduct() {
    //   // Add a new document with a generated id.
    //   db.collection('users')
    //     .doc(this.getUser.uid)
    //     .collection('products')
    //     .add({
    //       name: this.newProduct.name,
    //       price: this.newProduct.price,
    //       createdAt: new Date(),
    //     })
    //     .then((docRef) => {
    //       console.log('Document written with ID: ', docRef.id);
    //       this.newProduct.name = '';
    //       this.newProduct.price = '';
    //       this.readProducts();
    //     })
    //     .catch((error) => {
    //       console.error('Error adding document: ', error);
    //     });
    // },

    readProducts() {
      const tmpProds = [];
      db.collection('products')
        // .doc(this.getUser.uid)
        // .collection('products')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const tmpDocData = doc.data();
            tmpDocData.id = doc.id;
            tmpDocData.editing = false;
            tmpProds.push(tmpDocData);
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
          });
          // this.$store.dispatch('setProductsAction', tmpProds);
        });
    },

    // deleteProduct(id) {
    //   db.collection('users')
    //     .doc(this.getUser.uid)
    //     .collection('products')
    //     .doc(id)
    //     .delete()
    //     .then(() => {
    //       console.log('Document successfully deleted!');
    //       this.readProducts();
    //     })
    //     .catch((error) => {
    //       console.error('Error removing document: ', error);
    //     });
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
