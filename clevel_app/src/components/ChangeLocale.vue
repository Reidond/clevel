<template>
  <v-container class="mt-6">
    <v-row align="end" justify="end">
      <v-col cols="4">
        <v-select
          v-model="$i18n.locale"
          :items="langs"
          item-value="uk_UA"
          outlined
          full-width
          value="uk_UA"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return { langs: ['en', 'uk_UA'], itemText: ['Англійська', 'Українська'] };
  },
};
</script>
