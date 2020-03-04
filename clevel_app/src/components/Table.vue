<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="questions"
      sort-by="calories"
      class="elevation-3"
      dense
      disable-pagination
      disable-filtering
      disable-sort
      hide-default-footer
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="title">{{ model.name }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="tableDialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn-toggle>
                <v-btn color="primary" outlined dark v-on="on">{{
                  $t('table.new-item-btn')
                }}</v-btn>
                <RemoveModel :model-id="model.id" />
                <Settings :model="model" />
              </v-btn-toggle>
            </template>
            <v-card outlined>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.question"
                        filled
                        :label="$t('table.card.text-field')"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <MultipleTable
                        v-model="editedItem"
                        :keys="['answers', 'scores']"
                        :label="$t('table.multiple-table-label')"
                      ></MultipleTable>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">{{
                  $t('table.card.actions.close')
                }}</v-btn>
                <v-btn color="blue darken-1" text @click="save">{{
                  $t('table.card.actions.save')
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.answers="{ item }">
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="answer in item.answers" :key="answer">
                <td>{{ answer }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:item.scores="{ item }">
        <v-simple-table dense>
          <template v-slot:default>
            <tbody>
              <tr v-for="score in item.scores" :key="score">
                <td>{{ score }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MultipleTable from './MultipleTable.vue';
import RemoveModel from './RemoveModel.vue';
import Settings from './Settings.vue';

export default {
  components: {
    MultipleTable,
    RemoveModel,
    Settings,
  },
  props: {
    model: {
      type: Object,
      default: () => ({
        name: '',
        questions: [],
      }),
    },
  },
  data() {
    return {
      tableDialog: false,
      settingsDialog: false,
      headers: [
        {
          text: this.$i18n.t('table.headers.question'),
          align: 'start',
          sortable: false,
          value: 'question',
        },
        {
          text: this.$i18n.t('table.headers.answers'),
          value: 'answers',
          sortable: false,
        },
        {
          text: this.$i18n.t('table.headers.scores'),
          value: 'scores',
          sortable: false,
        },
        {
          text: this.$i18n.t('table.headers.action'),
          value: 'action',
          sortable: false,
        },
      ],
      questions: [],
      editedIndex: -1,
      editedItem: {
        question: '',
        answers: [],
        scores: [],
      },
      defaultItem: {
        question: '',
        answers: [],
        scores: [],
      },
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? this.$t('table.card.title.new')
        : this.$t('table.card.title.edit');
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    ...mapActions(['pushQuestion', 'setQuestion']),
    initialize() {
      this.questions.push(
        ...this.model.questions.map(model => {
          return {
            question: model.question,
            answers: model.answers.map(answer => answer.answer),
            scores: model.answers.map(answer => answer.score),
          };
        }),
      );
    },

    editItem(item) {
      this.editedIndex = this.questions.indexOf(item);
      this.editedItem = { ...item };
      this.tableDialog = true;
    },

    async deleteItem(item) {
      const index = this.questions.indexOf(item);
      const res = await this.$dialog.confirm({
        text: this.$t('table.dialog.text'),
        title: this.$t('table.dialog.title'),
      });

      if (res) {
        this.questions.splice(index, 1);
      }
    },

    close() {
      this.tableDialog = false;
      setTimeout(() => {
        this.editedItem = { ...this.defaultItem };
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      const structurizeAnswers = item => {
        const answers = [];

        answers.push(
          ...item.answers.map((answer, i) => {
            return {
              answer,
              score: item.scores[i],
            };
          }),
        );

        const newItem = {
          question: item.question,
          answers,
        };

        return newItem;
      };

      if (this.editedIndex > -1) {
        Object.assign(this.questions[this.editedIndex], this.editedItem);
        this.setQuestion({
          id: this.model.id,
          index: this.editedIndex,
          item: structurizeAnswers(this.editedItem),
        });
      } else {
        this.questions.push(this.editedItem);
        this.pushQuestion({
          id: this.model.id,
          question: structurizeAnswers(this.editedItem),
        });
      }
      this.close();
    },
  },
};
</script>
