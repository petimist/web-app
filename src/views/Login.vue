<template>
  <v-form>

    <v-card-title class="justify-center">
      <h1 style="font-family:'sans-serif'">Login Page</h1>
    </v-card-title>
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-col
            cols="12"
            sm="11"
            md="3"
        >
          <v-text-field
              label="Email"
              background-color="#FFECB3"
              outlined color="red"
              type="email"
          ></v-text-field>

          <v-text-field
              label="Password"
              background-color="#FFECB3"
              outlined color="red"
              type="password"
          ></v-text-field>
        </v-col>
      </v-layout>
    </v-container>

    <v-row
        align="center"
        justify="space-around"
    >

    <v-btn color="#FFD180" style="font-family:'sans-serif'">
      Login
    </v-btn>

    <v-btn color="#FFD180" style="font-family:'sans-serif'">
      Google
    </v-btn>

    <v-btn color="#FFD180" style="font-family:'sans-serif'">
      Facebook
    </v-btn>
    </v-row>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped>

</style>
