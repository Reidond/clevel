<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn-toggle>
          <v-btn class="pr-2" to="/modelboard">Back</v-btn>
          <Results />
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="display-1 font-weight-black">Experts</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="expert in experts" :key="expert.id" cols="3">
        <v-card outlined @click="onClickExperts(expert)">
          <v-card-title>{{ expert.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="display-1 font-weight-black">Models</p>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="model in models" :key="model.id" cols="3">
        <v-card outlined @click="onClickModels(model)">
          <v-card-title>{{ model.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p class="display-1 font-weight-black">Questions</p>
        <v-chip
          v-if="Object.keys(currentExpert).length > 1"
          class="ma-2"
          color="yellow black--text"
        >
          {{ currentExpert.name }}
        </v-chip>

        <v-chip
          v-if="Object.keys(currentModel).length > 1"
          class="ma-2"
          color="purple"
        >
          {{ currentModel.name }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-if="
          Object.keys(currentExpert).length === 0 ||
            Object.keys(currentModel).length === 0
        "
        cols="12"
      >
        <p class="body-1">
          Choose expert and model.
        </p>
      </v-col>
      <v-col v-else-if="stepperCompleted" cols="12">
        <p class="body-1">
          You have completed this model. Choose another or same one to repeat.
        </p>
      </v-col>
      <v-col v-else-if="isLoading" cols="12">
        <p class="body-1">
          Loading...
        </p>
      </v-col>
      <v-col v-else cols="12">
        <v-stepper v-model="stepper">
          <v-stepper-header>
            <v-stepper-step
              v-for="(question, index) in currentModel.questions"
              :key="index + currentModel.id"
              :complete="stepper > index + 1"
              :step="index + 1"
              >{{ `Question ${index + 1}` }}</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content
              v-for="(question, index) in currentModel.questions"
              :key="currentModel.id + index + 69"
              :step="index + 1"
            >
              <v-card class="mb-12">
                <v-card-title>{{ question.question }}</v-card-title>
                <v-card-text>
                  <v-radio-group v-model="radios" :mandatory="false">
                    <v-radio
                      v-for="(answer, answerIndex) in question.answers"
                      :key="`${answer}${answerIndex}${69 * 2}`"
                      :label="`${answer.answer} - ${answer.score}`"
                      :value="answer"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-card>

              <v-btn color="primary" @click="onClickStepperBtn(index)">
                Continue
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Results from '@/components/Results.vue';

export default {
  components: {
    Results,
  },
  data: () => ({
    stepper: 1,
    stepperCompleted: false,
    isLoading: false,
    localAnswers: [],
    radios: {},
  }),
  computed: {
    ...mapState({
      showcaseMode: state => state.showcaseMode,
      experts: state => state.testingModule.experts,
      models: state => state.modelsModule.models.data,
      currentModel: state => state.modelsModule.currentModel,
      currentExpert: state => state.testingModule.currentExpert,
    }),
  },
  async mounted() {
    if (!this.showcaseMode) {
      await this.generateExperts();
    }
    await this.setCurrentModel({});
    await this.setCurrentExpert({});
  },
  methods: {
    ...mapActions([
      'generateExperts',
      'setCurrentModel',
      'setCurrentExpert',
      'completeModel',
    ]),
    async onClickExperts(expert) {
      this.stepper = 1;
      this.stepperCompleted = false;
      this.isLoading = true;
      await this.setCurrentExpert(expert);
      this.isLoading = false;
    },
    async onClickModels(model) {
      this.stepper = 1;
      this.stepperCompleted = false;
      this.isLoading = true;
      await this.setCurrentModel(model);
      this.isLoading = false;
    },
    async onClickStepperBtn(index) {
      this.stepper = index + 2;
      this.$set(this.localAnswers, index, this.radios);
      if (this.stepper > this.currentModel.questions.length) {
        this.stepper = 1;
        this.stepperCompleted = true;
        await this.completeModel({
          expert: this.currentExpert,
          model: { id: this.currentModel.id, answers: this.localAnswers },
        });
        this.localAnswers = [];
      }
    },
  },
};
</script>
