<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">New {{ label }}</v-btn>
          </template>
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="itemValue"
                :label="label"
                filled
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="close">Close</v-btn>
              <v-btn v-if="isEditing" color="yellow darken-1" text @click="save"
                >Edit</v-btn
              >
              <v-btn v-else color="green darken-1" text @click="save"
                >Create</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">{{ label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in value"
                :key="index"
                @click="edit(item)"
              >
                <td>{{ item }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    itemValue: '',
    dialog: false,
    editedIndex: -1,
  }),
  computed: {
    isEditing() {
      return this.editedIndex > -1;
    },
  },
  methods: {
    close() {
      this.editedIndex = -1;
      this.itemValue = '';
      this.dialog = false;
    },
    edit(item) {
      this.editedIndex = this.value.indexOf(item);
      this.itemValue = item;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        this.$set(this.value, this.editedIndex, this.itemValue);
      } else {
        this.value.push(this.itemValue);
      }
      this.close();
    },
  },
};
</script>
