<template>
  <div>
    <AppBar title="Expert evaluation">
      <v-btn class="mr-3" outlined color="yellow" to="/">{{
        $t('model-board.btn-back')
      }}</v-btn>
      <Save />
      <AddNew />
      <v-btn outlined to="/testing">{{ $t('model-board.btn') }}</v-btn>
    </AppBar>

    <v-container fluid class="mt-10">
      <v-row v-if="isModelsEmpty" align-content="center" align="stretch">
        <v-col v-for="model in models" :key="model.name" cols="6">
          <Table :model="model" />
        </v-col>
      </v-row>
      <v-row v-else align-content="center" align="stretch">
        <v-col cols="6" class="text-center">
          <p class="title">
            {{ $t('model-board.empty') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddNew from '@/components/AddNew.vue';
import Save from '@/components/Save.vue';
import AppBar from '@/components/AppBar.vue';
import Table from '../components/Table.vue';

export default {
  components: {
    Table,
    AddNew,
    Save,
    AppBar,
  },
  data: () => ({}),
  computed: {
    ...mapState({
      models: state => state.modelsModule.models.data,
    }),
    isModelsEmpty() {
      return this.models.length > 0;
    },
  },
  methods: {
    ...mapActions(['setCurrentModel']),
  },
};
</script>
