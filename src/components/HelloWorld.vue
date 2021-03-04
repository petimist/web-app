<template>
    <v-app id="homepage">
      <section style="height: 100vh">
        <v-parallax
            src="../assets/background.jpg"
            style="height: 100vh"
        >
          <v-layout justify-center>
            <v-img
                class="mt-5"
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
          <v-container fluid fill-height>
            <v-layout justify-center>
              <v-flex xs12 sm8 md4>
                <h1 class="black--text MyFont"> Petimist </h1>
                <v-btn x-large color="#FFD180" class="justify-center font-weight-black MyFont mr-15" onclick=""> Login </v-btn>
                <v-btn x-large color="#FFD180" class="justify-center font-weight-black MyFont" onclick=""> Register </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-parallax>
      </section>
    </v-app>
</template>

<style>

@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

.MyFont{
  font-size: 8em;
  font-family: 'Architects Daughter', cursive
}
</style>
