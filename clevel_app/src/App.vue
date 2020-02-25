<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title>Clevel</v-toolbar-title>
    </v-app-bar>

    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'App',
};
</script>
