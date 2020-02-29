<template>
  <v-container fluid class="mt-10">
    <v-row align-content="center" align="stretch">
      <v-col v-for="model in models" :key="model.name" cols="6">
        <Table :model="model" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Table from '../components/Table.vue';

export default {
  name: 'Main',
  components: {
    Table,
  },
  data: () => ({}),
  computed: {
    ...mapState({
      models: state => state.modelsModule.models,
    }),
  },
  methods: {
    ...mapActions(['setCurrentModel']),
  },
};
</script>
