<template>
  <v-form>

    <v-card-title class="justify-center">
      <h1 style="font-family:'sans-serif'">Register</h1>
    </v-card-title>

    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-col
            cols="18"
            sm="11"
            md="6"
        >
          <v-text-field
              label="Name"
              v-model="name"
              background-color="#FFECB3"
              outlined color="red"
              type="name"
              hint="Please enter your name"
          ></v-text-field>

          <v-text-field
              label="Email"
              v-model="email"
              background-color="#FFECB3"
              outlined color="red"
              type="email"
              hint="Please enter your email"
          ></v-text-field>

          <v-text-field
              label="Password"
              v-model="password"
              background-color="#FFECB3"
              outlined color="red"
              type="password"
              hint="Please enter your password"
          ></v-text-field>

          <v-text-field
              label="ConfirmPassword"
              v-model="confirmPassword"
              background-color="#FFECB3"
              outlined color="red"
              type="password"
              hint="Confirm your password"
          ></v-text-field>

          <v-checkbox
              label="Agree to register"
              color="success"
              value="success"
              hide-details
          ></v-checkbox>
        </v-col>
      </v-layout>

      <v-col class="ma-7">
        <v-btn color="#FFD180" style="font-family:'sans-serif'" class="mr-10" @click="backToLogin">
          <v-icon dark left>
            mdi-arrow-left
          </v-icon>
          Back to login
        </v-btn>

        <v-btn color="#FFD180" style="font-family:'sans-serif'">
          Submit
        </v-btn>
      </v-col>
    </v-container>
  </v-form>
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

<style scoped>

</style>
