<template>
  <v-dialog v-model="dialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn-toggle>
        <v-btn color="accent" dense outlined v-on="on">{{
          $t('settings.btn')
        }}</v-btn>
      </v-btn-toggle>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">{{ $t('settings.card.title') }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="a" filled label="a"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="b" filled label="b"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="T" filled label="T"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="p" filled label="p"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">{{
          $t('settings.action-cancel')
        }}</v-btn>
        <v-btn color="blue darken-1" text @click="save">{{
          $t('settings.action-save')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    dialog: false,
    a: '',
    b: '',
    T: '',
    p: '',
  }),
  mounted() {
    this.a = this.model.a;
    this.b = this.model.b;
    this.T = this.model.T;
    this.p = this.model.p;
  },
  methods: {
    ...mapActions(['setSettings']),
    close() {
      this.dialog = false;
    },
    save() {
      this.setSettings({
        id: this.model.id,
        a: parseInt(this.a, 10),
        b: parseInt(this.b, 10),
        T: parseInt(this.T, 10),
        p: parseInt(this.p, 10),
      });
      this.close();
    },
  },
};
</script>
