<template>
  <v-card>
    <v-form>
      <v-container>
        <v-card-subtitle class="title">
          Place Category Information
        </v-card-subtitle>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.name" label="Name">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="items.type"
              :items="types"
              label="Type"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="items.status"
              :items="status"
              label="Status"
            ></v-autocomplete>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
export default {
  props: {
    value: Object,
  },

  data() {
    return {
      items: "not loaded",
      types: ["Essential", "Non-Essential"],
      status: ["Restricted", "Non-Restricted"]
    };
  },

  created() {
    this.items = this.value;
  },

  methods: {
    onInput() {
      this.$emit("update-data", this.items);
    },
  },
};
</script>

<style scoped>
.title {
  border-bottom: solid 2px lightgray;
  padding-bottom: 10px;
}
</style>