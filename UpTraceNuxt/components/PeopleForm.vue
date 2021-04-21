<template>
  <v-card class="card">
    <v-form>
      <v-container>
        <v-row class="title" justify="left">
            <v-card-title>Personal</v-card-title>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.firstName"
              label="First Name"
              @input="onInput()"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.lastName" label="Last Name">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="title" justify="left">
            <v-card-title>Address</v-card-title>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.address" label="Address Line 1">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.address2" label="Address Line 2">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.city" label="City"> </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="items.provinceOrTerritory"
              label="Province/Territory"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.postalCode" label="Postal Code">
            </v-text-field>
          </v-col>
        </v-row>
                <v-row class="title" justify="left">
            <v-card-title>Contact</v-card-title>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.phoneNumber" label="Phone Number">
            </v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="items.emailAddress" label="Email Address">
            </v-text-field>
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
    };
  },

  created() {
    this.items = this.value;
  },

  methods: {
    onInput() {
      console.log("registered");
      this.$emit("update-data", this.items);
    },
  },
};
</script>

<style>
.title {
  border-bottom: solid 1px #e1e1e1 !important;
  font-family: "Montserrat-Regular" !important;

}

.card {
   font-family: "Montserrat-Regular" !important;
}

.v-input__slot::before {
    border-color: #e1e1e1 !important;
}
</style>