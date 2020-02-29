<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="accent" class="mr-3" outlined v-on="on">Add New</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Add New Model</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="model.name"
                label="Name of model*"
                required
                filled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="onClick">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { v4 as uuidv4 } from 'uuid';
import { mapActions } from 'vuex';

export default {
  data: () => ({
    model: {
      id: uuidv4(),
      name: '',
      questions: [],
      a: 0,
      b: 0,
      T: 0,
      p: 0,
    },
    dialog: false,
  }),
  methods: {
    ...mapActions(['pushToModel']),
    onClick() {
      this.pushToModel(this.model);
      this.dialog = false;
    },
  },
};
</script>
