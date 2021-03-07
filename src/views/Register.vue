<template>
  <v-app style="
    background: url('https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg');
    background-size: cover
  ">
  <v-form @submit.prevent="submitRegister">
    <v-card-title class="justify-center mt-8">
      <h1 class=" black--text MyFont2">Register</h1>
    </v-card-title>

    <v-container class="mt-5" align-center justify-center>
      <v-layout align-center justify-center>
        <v-col
            cols="18"
            sm="11"
            md="6"
        >
          <v-text-field
              label="Name"
              v-model="name"
              background-color="white"
              outlined color="red"
              type="name"
              hint="Please enter your name"
          ></v-text-field>

          <v-text-field
              label="Email"
              v-model="email"
              background-color="white"
              outlined color="red"
              type="email"
              hint="Please enter your email"
              :error-messages="emailErrors"
          ></v-text-field>

          <v-text-field
              label="Password"
              v-model="password"
              background-color="white"
              outlined color="red"
              type="password"
              hint="Please enter your password"
              :error-messages="passwordErrors"
          ></v-text-field>

          <v-text-field
              label="ConfirmPassword"
              v-model="confirmPassword"
              background-color="white"
              outlined color="red"
              type="password"
              hint="Confirm your password"
              :error-messages="repeatedPasswordErrors"
          ></v-text-field>

          <v-checkbox
              v-model="selected"
              class="MyFont2"
              label="Agree to register"
              color="success"
              value="success"
              hide-details
              :error-messages="checkBoxErrors"
          ></v-checkbox>
        </v-col>
      </v-layout>
      <v-container class="justify-center">
      <v-col>
        <v-btn color="#FFD180" class="mr-10 MyFont2" @click="backToLogin">
          <v-icon dark left>
            mdi-arrow-left
          </v-icon>
          Back to login
        </v-btn>

        <v-btn color="#FFD180" class="MyFont2" type="submit" @click="submitRegister">
          Submit
        </v-btn>
      </v-col>
      </v-container>
    </v-container>
  </v-form>
  </v-app>
</template>

<script>
import firebase from 'firebase';
import {
  required, email, minLength, sameAs,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      selected: '',
      RegisterSuccess: null,
      RegisterError: null,
      message: 'Already have an account?',
    };
  },
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    confirmPassword: { required, sameAsPassword: sameAs('password') },
    selected: { required },
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.email && errors.push('Must be valid e-mail');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.required && errors.push('Password is required');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.password.minLength && errors.push('Password must have atleast 6 character');
      return errors;
    },
    repeatedPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.confirmPassword.required && errors.push('Confirm your password');
      // eslint-disable-next-line no-unused-expressions
      !this.$v.confirmPassword.sameAsPassword && errors.push('Password does not match');
      return errors;
    },
    checkBoxErrors() {
      const errors = [];
      if (!this.$v.selected.$dirty) return errors;
      // eslint-disable-next-line no-unused-expressions
      !this.$v.selected.required && errors.push('Must agree to register(Tick checkbox)');
      return errors;
    },
  },
  methods: {
    submitRegister() {
      this.$v.$touch();
      if (this.password === this.confirmPassword) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            this.$router.push('/login');
            data.user
              .then(() => {
                this.RegisterSuccess = 'Register Successful! Proceed to Dashboard';
                this.RegisterError = null;
                this.message = 'Go to Dashboard';
                this.$store.dispatch('auth/userRegister', data);
              });
          })
          .catch((err) => {
            console.log(err.message);
            this.RegisterError = err.message;
          });
      } else {
        this.RegisterError = 'Password does not match';
      }
    },
    backToLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont2{
  font-size: 3em;
  font-family: 'Architects Daughter', cursive
}
</style>
