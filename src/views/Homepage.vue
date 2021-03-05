<template>
  <v-app style="
    background: url('https://image.freepik.com/free-photo/abstract-blur-light-gradient-pink-soft-pastel-yellow-wallpaper-background_7636-1347.jpg');
    background-size: cover
  ">
    <v-form>
      <v-layout justify-center>
        <v-img
            class="mt-16"
            :aspect-ratio="1"
            :max-width="350"
            :max-height="350"
            src="../assets/circle.png"
        >
          <v-layout justify-center>
            <v-img
                class="mt-6"
                :aspect-ratio="1"
                :max-width="250"
                :max-height="250"
                src="https://media.tenor.com/images/b6816283f39bdc3b46c80a122a603456/tenor.gif"
            >
            </v-img>
          </v-layout>
        </v-img>
      </v-layout>
      <v-layout justify-center align-center>
        <v-flex>
          <h1 class="black--text MyFont"> Petimist </h1>
          <v-btn x-large color="#FFD180" class="justify-center font-weight-black MyFont mr-15 mt-5" to="/login"> Login </v-btn>
          <v-btn x-large color="#FFD180" class="justify-center font-weight-black MyFont mt-5" to="/register"> Register </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-app>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont{
  font-size: 8em;
  font-family: 'Architects Daughter', cursive
}
</style>
