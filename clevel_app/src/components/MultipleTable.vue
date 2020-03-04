<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-dialog v-model="dialog" persistent max-width="290">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" v-on="on">{{
              $t('multiple-table.btn-new', { label })
            }}</v-btn>
          </template>
          <v-card outlined>
            <v-card-title class="headline"></v-card-title>
            <v-card-text>
              <v-text-field
                v-for="(key, index) in actualKeys"
                :key="index + 69"
                v-model="actualKeys[index]"
                :disabled="editedIndexKeys[index] === -1 && isEditing"
                :label="index"
                filled
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="close">{{
                $t('multiple-table.btn-close')
              }}</v-btn>
              <v-btn
                v-if="isEditing"
                color="yellow darken-1"
                text
                @click="save"
                >{{ $t('multiple-table.btn-edit') }}</v-btn
              >
              <v-btn v-else color="green darken-1" text @click="save">{{
                $t('multiple-table.btn-save')
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(arr, key) in renderValues" :key="key"
        ><v-col v-if="isInKeys(key)">
          <v-simple-table dense>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{ key }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in arr"
                  :key="index"
                  @click="edit(item, key)"
                >
                  <td>{{ item }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col></v-col
      >
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
      type: Object,
      default: () => {},
    },
    keys: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    actualKeys: {},
    dialog: false,
    editedIndex: -1,
    editedIndexKeys: {},
  }),
  computed: {
    isEditing() {
      return this.editedIndex > -1;
    },
    renderValues() {
      return Object.fromEntries(
        // eslint-disable-next-line no-unused-vars
        Object.entries(this.value).filter(([key, value]) =>
          this.keys.includes(key),
        ),
      );
    },
  },
  mounted() {
    this.defaultActualKeys();
  },
  methods: {
    defaultActualKeys() {
      this.keys.forEach(key => {
        this.$set(this.actualKeys, key, '');
      });
    },
    defaultEditedIndexKeys() {
      this.keys.forEach(key => {
        this.$set(this.editedIndexKeys, key, -1);
      });
    },
    close() {
      this.editedIndex = -1;
      this.defaultEditedIndexKeys();
      this.defaultActualKeys();
      this.dialog = false;
    },
    edit(item, key) {
      this.editedIndex = this.value[key].indexOf(item);
      this.editedIndexKeys[key] = this.editedIndex;
      this.actualKeys[key] = item;
      this.dialog = true;
    },
    save() {
      if (this.editedIndex > -1) {
        this.keys.forEach(key => {
          this.$set(
            this.value[key],
            this.editedIndexKeys[key],
            this.actualKeys[key],
          );
        });
      } else {
        this.keys.forEach(key => {
          this.value[key].push(this.actualKeys[key]);
        });
      }
      this.close();
    },
    isInKeys(item) {
      return this.keys.includes(item);
    },
  },
};
</script>
