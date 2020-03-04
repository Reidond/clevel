<template>
  <div>
    <v-btn color="accent" outlined @click="onBtnClick">{{
      $t('results.card.btn')
    }}</v-btn>
    <v-dialog v-model="dialog" max-height="500">
      <v-card outlined>
        <v-card-title class="headline">{{
          $t('results.card.title')
        }}</v-card-title>

        <v-card-text>
          <v-container fuild>
            <v-row class="mb-0">
              <v-col cols="12">
                <p>{{ $t('results.card.row-1') }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <katex-element :expression="katexRanking" />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <i18n path="results.card.row-3" tag="p">
                  <template v-slot:katexExpert>
                    <katex-element
                      class="font-weight-bold"
                      :expression="expert"
                    />
                  </template>
                  <template v-slot:katexScore>
                    <katex-element
                      class="font-weight-bold"
                      :expression="score.toString()"
                    />
                  </template>
                </i18n>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            {{ $t('results.card.action') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    expectedModels: [],
    expert: '',
    score: 0,
    ranking: [],
    katexRanking: '',
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
      const allCompletedModels = this.experts
        .map(exp => exp.completedModels)
        .flat();

      const mids = this.models.map(el => el.id);
      const allModelsScores = mids.reduce((obj, id) => {
        const rest = allCompletedModels.filter(m => m.id === id);
        if (rest) {
          obj[id] = rest.map(r =>
            // eslint-disable-next-line no-return-assign
            r.answers.reduce((sum, el) => (sum += el.score), 0),
          );
        }

        return obj;
      }, {});

      const modelsMeta = [
        ...this.models.map(model => {
          return {
            a: model.a,
            b: model.b,
            t: model.T,
            p: model.p,
          };
        }),
      ];
      const combinedModels = [
        ...Object.values(allModelsScores).map((crisps, i) => {
          return { crisps, ...modelsMeta[i] };
        }),
      ];
      this.expectedModels = combinedModels;
      this.callRust(JSON.stringify(combinedModels));
    },
    callRust(str) {
      let clevel = import('clevel');

      if (process.env.NODE_ENV !== 'production') {
        clevel = import('../../../pkg');
      }

      clevel
        .then(m => {
          this.ranking = m.rankingOfExperts(str);
          this.ranking = this.ranking.map(r => r.toFixed(3));
          this.katexRanking = `\\Alpha = \\{ ${this.ranking} \\}`;
        })
        .catch(e =>
          this.$dialog.error({
            text: e,
            title: this.$t('results.error'),
          }),
        );
      clevel
        .then(m => {
          const [expert, score] = m.findHead(str);
          this.expert = expert;
          this.score = score.toFixed(3);
        })
        .catch(e =>
          this.$dialog.error({
            text: e,
            title: this.$t('results.error'),
          }),
        );
    },
  },
};
</script>
