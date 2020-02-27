<template>
  <v-app>
    <v-app-bar app dense class="mb-8">
      <v-toolbar-title>Clevel</v-toolbar-title>
      <v-spacer></v-spacer>

      <AddNew />

      <FindHeadFromModels />
    </v-app-bar>

    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
import AddNew from '@/components/AddNew.vue';
import FindHeadFromModels from '@/components/FindHeadFromModels.vue';

export default {
  name: 'App',
  components: {
    AddNew,
    FindHeadFromModels,
  },
};
</script>
