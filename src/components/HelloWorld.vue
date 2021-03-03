<template>
    <v-app id="homepage">
      <section style="height: 100vh">
        <v-parallax
            dark
            src="../assets/background.jpg"
            style="height: 100vh"
        >
          <v-container fluid fill-height>
            <v-layout justify-center>
              <v-img
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
          </v-container>
        </v-parallax>
      </section>
    </v-app>
</template>
