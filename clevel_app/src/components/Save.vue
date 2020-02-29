<template
  ><v-btn color="green" class="mr-3" primary @click="save"
    >Save</v-btn
  ></template
>

<script>
import TOML from '@iarna/toml';
import { saveAs } from 'file-saver';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      fileName: state => state.modelsModule.fileName,
      models: state => state.modelsModule.models,
    }),
  },
  methods: {
    save() {
      const file = new File([TOML.stringify(this.models)], this.fileName);
      saveAs(file);
    },
  },
};
</script>
