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
    <!-- create product -->
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
              <th class="text-center">Quantity</th>
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
              <td>{{ product.quantity }}</td>

              <td>
                <v-btn @click="addItem(product)"> + </v-btn>
                <v-btn @click="minus(product.price)"> - </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <!-- TODO : Make it look better -->
      <div>
        <v-card>
          <v-card-text>
            <v-layout align-center>
              <v-row class="mt-10 mb-10">
                <v-col class="text-right"
                  ><h2>Total Expense is {{ this.expense }} baht</h2></v-col
                >
                <v-col><v-btn x-large> Calculate and save </v-btn></v-col>
              </v-row>
            </v-layout>
          </v-card-text>
        </v-card>
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
    itemsPerPageArray: [4, 8, 12],
    search: '',
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 4,
    sortBy: 'name',
    keys: ['Name', 'Calories', 'Fat', 'Carbs', 'Protein', 'Sodium', 'Calcium', 'Iron'],
    items: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        sodium: 87,
        calcium: '14%',
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%',
      },
      {
        name: 'Eclair',
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        sodium: 337,
        calcium: '6%',
        iron: '7%',
      },
      {
        name: 'Cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%',
      },
      {
        name: 'Gingerbread',
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        sodium: 327,
        calcium: '7%',
        iron: '16%',
      },
      {
        name: 'Jelly bean',
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        sodium: 50,
        calcium: '0%',
        iron: '0%',
      },
      {
        name: 'Lollipop',
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        sodium: 38,
        calcium: '0%',
        iron: '2%',
      },
      {
        name: 'Honeycomb',
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        sodium: 562,
        calcium: '0%',
        iron: '45%',
      },
      {
        name: 'Donut',
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        sodium: 326,
        calcium: '2%',
        iron: '22%',
      },
      {
        name: 'KitKat',
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        sodium: 54,
        calcium: '12%',
        iron: '6%',
      },
    ],
  }),

  created() {
    /**
     * On create, we check the main products table
     * Then, we read the quantity collection, check for the user id
     * if collection does not contain user id, then we add 0 to it
     * Else, we take the quantity from firestore and store it in vuestore
     */
    const tmpProds = [];
    db.collection('products')
      .get()
      .then((productsSnapshot) => {
        productsSnapshot.forEach((doc) => {
          const tmpDocData = doc.data();
          tmpDocData.id = doc.id;
          db.collection('products')
            .doc(doc.id)
            .collection('quantities')
            .get()
            .then((quantitiesSnapshot) => {
              quantitiesSnapshot.forEach((quantity) => {
                const tmpQuantityData = quantity.data();
                db.collection('products')
                  .doc(doc.id)
                  .collection('quantities')
                  .get()
                  .then(() => {
                    console.log('Document successfully written!');
                  })
                  .catch((error) => {
                    console.error('Error writing document: ', error);
                  });
                tmpProds.push(tmpQuantityData);
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, ' => ', doc.data());
              });
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });

          tmpProds.push(tmpDocData);
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, ' => ', doc.data());
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
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== 'Name');
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    addItem(item) {
      db.collection('users')
        .doc(this.getUser.uid)
        .collection('products')
        .doc(item.id)
        .set(item.quantity + 1)
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
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
