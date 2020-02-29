<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>Welcome To Clevel App!</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-btn block color="secondary" dark @click="dialog = true"
                  >Create New Model Board</v-btn
                >
                <p class="pt-3 text-center subtitle-2">or...</p>
                <v-file-input
                  label="Upload your model board file..."
                  filled
                  @change="uploadBtn"
                ></v-file-input>
                <p class="pt-3 text-center subtitle-2">
                  or you can try <a @click="showcase">showcase mode</a>
                </p>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title class="headline">Create New Model Board</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="experts"
              label="Experts"
              filled
            ></v-text-field>
            <v-text-field
              v-model="modelsCount"
              label="Models"
              filled
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">
            Cancel
          </v-btn>

          <v-btn color="green darken-1" text @click="createBtn">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { mapActions } from 'vuex';
import TOML from '@iarna/toml';

export default {
  data: () => ({
    dialog: false,
    experts: null,
    modelsCount: null,
  }),
  methods: {
    ...mapActions(['setFile', 'setModel']),
    createBtn() {
      const model = {
        meta: {
          experts: +this.experts,
          modelsCount: +this.modelsCount,
        },
        data: [],
      };
      this.setModel({ model });
      this.$router.push('/modelboard');
      this.dialog = false;
    },
    uploadBtn(file) {
      const reader = new FileReader();
      reader.onload = event => {
        console.log(JSON.stringify(TOML.parse(event.target.result)));
        this.setModel({ model: TOML.parse(event.target.result) });
      };
      reader.readAsText(file);
      this.setFile({ file });
      this.$router.push('/modelboard');
    },
    async showcase() {
      const { model } = await import('../examples/testData');
      this.setModel({ model });
      this.$router.push('/modelboard');
    },
  },
};
</script>

<style></style>
