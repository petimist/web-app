<template>
  <v-app style="
      background: url('https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg');
      background-size: cover;
    ">
    <ValidationObserver
      ref="observer"
      v-slot="{ invalid }"
    >
      <v-form @submit.prevent="signIn">
        <v-card-title class="justify-center mt-8">
          <h1 class="black--text MyFont1">Please Login Your Account</h1>
        </v-card-title>
        <v-container
          class="mt-8"
          align-center
          justify-center
        >
          <v-layout
            align-center
            justify-center
          >
            <v-col
              cols="18"
              sm="11"
              md="6"
            >
              <!-- for validating user's input -->
              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <v-text-field
                  label="Email"
                  background-color="white"
                  outlined
                  color="red"
                  type="email"
                  v-model="email"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>

              <ValidationProvider
                v-slot="{ errors }"
                name="Password"
                rules="required"
              >
                <v-text-field
                  label="Password"
                  background-color="white"
                  outlined
                  color="red"
                  type="password"
                  v-model="password"
                  :error-messages="errors"
                  required
                ></v-text-field>
              </ValidationProvider>

              <v-btn
                color="#FFD180"
                class="mr-16 ma-2 MyFont1"
                @click="signIn"
                :disabled="invalid"
              >
                Login
              </v-btn>

              <v-btn
                color="#FFD180"
                class="mr-16 MyFont1"
                @click="googleLogin"
              >
                <img
                  src="https://img.icons8.com/clouds/2x/google-logo.png"
                  height="45"
                  class="mr-2"
                />
                Google
              </v-btn>

              <v-btn
                color="#FFD180"
                class="MyFont1"
                @click="facebookPopup"
              >
                <img
                  src="https://www.greenektar.com/wp-content/uploads/2015/10/facebook-icon-png.png"
                  height="35"
                  class="mr-2"
                />
                Facebook
              </v-btn>
              <div class="d-flex flex-column align-center">
                <v-img
                  src="https://diaryofsarita.files.wordpress.com/2015/01/01508-language2bseparator.png?w=1400"
                  max-width="600"
                ></v-img>
              </div>

              <v-col>
                <v-btn
                  color="#FFD180"
                  class="MyFont1"
                  @click="goToRegister"
                >
                  Register
                </v-btn>
              </v-col>
            </v-col>
          </v-layout>
        </v-container>
      </v-form>
    </ValidationObserver>
  </v-app>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';
import { required, email, max } from 'vee-validate/dist/rules';
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from 'vee-validate';
import firebase from 'firebase/app';
import 'firebase/auth';

// there is a bug if you set mode=eager,
// bug is the form will not let you submit unless you unfocus or change focus state.
setInteractionMode('aggressive');
extend('required', {
  ...required,
  message: '{_field_} cannot be empty',
});
// for validating maximum field length (might be useful for later)
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters',
});
extend('email', {
  ...email,
  message: 'Please enter a valid email address',
});

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      user: null,
    };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['getUser']),
    userExist() {
      return this.getUser;
    },
  },
  watch: {
    userExist(val) {
      if (val !== null && val !== undefined) {
        this.$router.push('/dashboard');
      }
    },
  },
  methods: {
    ...mapActions(['signInAction']),
    signIn() {
      this.signInAction({ email: this.email, password: this.password });
    },

    goToRegister() {
      this.$router.push('/register');
    },
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((data) => {
          this.$store.dispatch('setUserAction', data.user);
        })
        .catch((err) => {
          alert(`${err.message}`);
        });
    },
    facebookPopup() {
      firebase
        .auth()
        .signInWithPopup(facebookProvider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          const { credential } = result;

          // The signed-in user info.
          const { user } = result;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const { accessToken } = credential;

          // ...
          console.log('Logged in', credential, user, accessToken);
          this.$store.dispatch('setUserAction', user);
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { facebookEmail } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;

          console.log(
            'ERROR!',
            credential,
            facebookEmail,
            errorMessage,
            errorCode,
          );
          // ...
        });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap");

.MyFont1 {
  font-size: 3em;
  font-family: "Architects Daughter", cursive;
}
</style>
