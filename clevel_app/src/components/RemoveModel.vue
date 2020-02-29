<template>
  <div>
    <v-btn color="error" outlined @click="removeModel(modelId)">Remove</v-btn>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    modelId: {
      type: String,
      default: '',
    },
  },
  methods: {
    ...mapActions(['removeModel']),
  },
};
</script>
