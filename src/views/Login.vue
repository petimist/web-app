<template>
  <v-app style="
    background: url('https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg');
    background-size: cover
  ">
    <v-form>
      <v-card-title class="justify-center mt-8">
        <h1 class="black--text MyFont1"> Please Login Your Account </h1>
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
            <v-text-field
              label="Email"
              background-color="white"
              outlined
              color="red"
              type="email"
            ></v-text-field>

            <v-text-field
              label="Password"
              background-color="white"
              outlined
              color="red"
              type="password"
            ></v-text-field>
          </v-col>
        </v-layout>
      </v-container>

      <v-btn
        color="#FFD180"
        class="mr-16 ma-2 MyFont1"
      >
        Login
      </v-btn>

      <v-btn
        color="#FFD180"
        class="mr-16 MyFont1"
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
    </v-form>
  </v-app>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    goToRegister() {
      this.$router.push('/register');
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
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const { email } = error;
          // The firebase.auth.AuthCredential type that was used.
          const { credential } = error;

          console.log('ERROR!', credential, email, errorMessage, errorCode);
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
