<template>
  <v-app style="
    background: url('https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg');
    background-size: cover
  ">
  <v-form>
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
          ></v-text-field>

          <v-text-field
              label="Password"
              v-model="password"
              background-color="white"
              outlined color="red"
              type="password"
              hint="Please enter your password"
          ></v-text-field>

          <v-text-field
              label="ConfirmPassword"
              v-model="confirmPassword"
              background-color="white"
              outlined color="red"
              type="password"
              hint="Confirm your password"
          ></v-text-field>

          <v-checkbox
              class="MyFont2"
              label="Agree to register"
              color="success"
              value="success"
              hide-details
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

        <v-btn color="#FFD180" class="MyFont2">
          Submit
        </v-btn>
      </v-col>
      </v-container>
    </v-container>
  </v-form>
  </v-app>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
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
