<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn color="accent" class="mr-3" outlined v-on="on">{{
        $t('add-new.btn')
      }}</v-btn>
    </template>
    <v-card outlined>
      <v-card-title>
        <span class="headline">{{ $t('add-new.title') }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="model.name"
                :label="$t('add-new.text-field')"
                required
                filled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>{{ $t('add-new.notice') }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">{{
          $t('add-new.btn-close')
        }}</v-btn>
        <v-btn color="blue darken-1" text @click="onClick">{{
          $t('add-new.btn-save')
        }}</v-btn>
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
