<template>
  <div>
    <v-btn color="accent" outlined @click="onBtnClick">Results</v-btn>
    <v-dialog v-model="dialog" max-width="290">
      <v-card outlined>
        <v-card-title class="headline"
          >Use Google's location service?</v-card-title
        >

        <v-card-text>
          {{ expectedModels }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            Disagree
          </v-btn>

          <v-btn color="green darken-1" text @click="dialog = false">
            Agree
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// const rust = import('../../../pkg');

export default {
  data: () => ({
    dialog: false,
    expectedModels: [],
  }),
  computed: {
    ...mapState({
      models: state => state.modelsModule.models.data,
      experts: state => state.testingModule.experts,
    }),
  },
  methods: {
    onBtnClick() {
      this.dialog = true;
      this.makeExpectedModels();
    },
    makeExpectedModels() {
      const destructurizedModels = [
        ...this.models.map(model => {
          let wantedModel;
          this.experts.forEach(expert => {
            wantedModel = expert.completedModels.find(
              val => val.id === model.id,
            );
          });
          return wantedModel;
        }),
      ];
      const modelsMeta = [
        ...this.models.map(model => {
          return {
            a: model.a,
            b: model.b,
            T: model.T,
            p: model.p,
          };
        }),
      ];
      const combinedModels = [
        ...destructurizedModels.map((m, i) => {
          return { m, ...modelsMeta[i] };
        }),
      ];
      console.log(combinedModels);
    },
    // callRust(str) {
    //   rust.then(m => m.find_head_from_models_wasm(str)).catch(console.error);
    // },
  },
};
</script>
