<template>
  <div>
    <h1 align="left"> Pet Info
      <v-dialog
          v-model="dialog"
          persistent
          max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn fab color="orange" dark
                 v-bind="attrs"
                 v-on="on">
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-container>
              <v-layout align-center justify-center>
                <v-col
                    cols="18"
                    sm="11"
                    md="6"
                >
                  <v-text-field
                      label="Name"
                      background-color="grey"
                      outlined color="red"
                      type="name"
                      hint="Please enter your pet's name"
                  ></v-text-field>

                  <v-text-field
                      label="Birthday"
                      background-color="grey"
                      outlined color="red"
                      hint="Please enter your pet's birthday"
                  ></v-text-field>

                  <v-text-field
                      label="Specie"
                      background-color="grey"
                      outlined color="red"
                      hint="Please enter your pet's specie"
                  ></v-text-field>

                  <v-btn
                      class="ma-2"
                      color="green"
                      dark
                  >
                    Add
                    <v-icon dark>
                      mdi-checkbox-marked-circle
                    </v-icon>
                  </v-btn>

                  <v-btn
                      class="ma-2"
                      color="red"
                      dark
                      @click="closePopUp"
                  >
                    Close
                    <v-icon dark>
                      mdi-cancel
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </h1>
    <br>
    <v-divider style="background-color:black"></v-divider>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    closePopUp() {
      this.dialog = false;
    },
  },
};
</script>
