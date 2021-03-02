<template>
  <v-form>

    <v-card-title class="justify-center">
      <h1 style="font-family:'sans-serif'">Login Page</h1>
    </v-card-title>
    <v-container align-center justify-center>
      <v-layout align-center justify-center>
        <v-col
            cols="18"
            sm="11"
            md="6"
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

    <v-btn color="#FFD180" style="font-family:'sans-serif'" class="mr-16 ma-2">
      Login
    </v-btn>

    <v-btn color="#FFD180" style="font-family:'sans-serif'" class="mr-16">
      <img src="https://img.icons8.com/clouds/2x/google-logo.png" height="45" class="ma-2"/>
      Google
    </v-btn>
    <v-btn color="#FFD180" style="font-family:'sans-serif'">
      <img src="https://www.greenektar.com/wp-content/uploads/2015/10/facebook-icon-png.png" height="35" class="ma-2"/>
      Facebook
    </v-btn>

    <v-col>
      <v-btn color="#FFD180" style="font-family:'sans-serif'" class="ma-7">
        Register
      </v-btn>
    </v-col>
  </v-form>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style scoped>

</style>
