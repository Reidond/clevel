<template>
  <v-content>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>{{ $t('main.toolbar-title') }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-btn block color="secondary" dark @click="dialog = true">{{
                  $t('main.form.btn')
                }}</v-btn>
                <p class="pt-3 text-center subtitle-2">
                  {{ $t('main.form.p-1') }}
                </p>
                <v-file-input
                  :label="$t('main.form.file-input')"
                  filled
                  @change="uploadBtn"
                ></v-file-input>
                <i18n
                  path="main.form.p-2"
                  tag="p"
                  class="pt-3 text-center subtitle-2"
                >
                  <template v-slot:a>
                    <a @click="showcase">{{ $t('main.form.showcase-mode') }}</a>
                  </template>
                </i18n>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="1000px">
      <v-card>
        <v-card-title class="headline">{{
          $t('main.dialog.title')
        }}</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="fileName"
              :label="$t('main.dialog.file-name')"
              filled
            ></v-text-field>
            <v-text-field
              v-model="experts"
              :label="$t('main.dialog.experts')"
              filled
            ></v-text-field>
            <v-text-field
              v-model="modelsCount"
              :label="$t('main.dialog.models')"
              filled
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="dialog = false">
            {{ $t('main.dialog.action-cancel') }}
          </v-btn>

          <v-btn color="green darken-1" text @click="createBtn">
            {{ $t('main.dialog.action-create') }}
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
    fileName: '',
    dialog: false,
    experts: null,
    modelsCount: null,
  }),
  methods: {
    ...mapActions(['setFileName', 'setModel', 'setShowcaseMode', 'setExperts']),
    async createBtn() {
      const model = {
        meta: {
          experts: +this.experts,
          modelsCount: +this.modelsCount,
        },
        data: [],
      };
      this.setModel({ model });
      this.setFileName({ fileName: `${this.fileName}.toml` });
      await this.setShowcaseMode(false);
      this.$router.push('/modelboard');
      this.dialog = false;
    },
    // TODO: Validate TOML
    async uploadBtn(file) {
      const reader = new FileReader();
      reader.onload = event => {
        this.setModel({ model: TOML.parse(event.target.result) });
      };
      reader.readAsText(file);
      this.setFileName({ fileName: file.name });
      await this.setShowcaseMode(false);
      this.$router.push('/modelboard');
    },
    async showcase() {
      const { model } = await import('../examples/testData');
      const { experts } = await import('../examples/expertsData');
      await this.setModel({ model });
      await this.setExperts(experts);
      await this.setFileName({ fileName: 'test_data.toml' });
      await this.setShowcaseMode(true);
      this.$router.push('/modelboard');
    },
  },
};
</script>

<style></style>
