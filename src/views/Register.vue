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
              background-color="#FFECB3"
              outlined color="red"
              type="name"
              hint="Please enter your name"
          ></v-text-field>

          <v-text-field
              label="Email"
              background-color="#FFECB3"
              outlined color="red"
              type="email"
              hint="Please enter your email"
          ></v-text-field>

          <v-text-field
              label="Password"
              background-color="#FFECB3"
              outlined color="red"
              type="password"
              hint="Please enter your password"
          ></v-text-field>

          <v-text-field
              label="confirmPassword"
              background-color="#FFECB3"
              outlined color="red"
              type="password"
              hint="Confirm your password"
          ></v-text-field>
        </v-col>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Register',
};
</script>

<style scoped>

</style>
