<template>
  <v-container>
    <v-row>
      <v-col class="text-xs-center">
        <v-flex align-self-center>
          <v-form>
            <v-container>
              <v-card-title class="title"> Register a Person </v-card-title>
              <v-text-field v-model="personData.firstName" label="First Name">
              </v-text-field>
              <v-text-field v-model="personData.lastName" label="Last Name">
              </v-text-field>
              <v-text-field v-model="personData.address" label="Address Line 1">
              </v-text-field>
              <v-text-field
                v-model="personData.address2"
                label="Address Line 2"
              >
              </v-text-field>
              <v-text-field v-model="personData.city" label="City">
              </v-text-field>
              <v-text-field
                v-model="personData.provinceOrTerritory"
                label="Province/Territory"
              >
              </v-text-field>
              <v-text-field v-model="personData.postalCode" label="Postal Code">
              </v-text-field>
              <v-text-field
                v-model="personData.phoneNumber"
                label="Phone Number"
              >
              </v-text-field>
              <v-text-field
                readonly
                v-model="personData.emailAddress"
                label="Email Address"
              >
              </v-text-field>
            </v-container>
          </v-form>
          <v-btn
            color="lightblue"
            class="white--text"
            type="button"
            @click="register()"
            >Register</v-btn
          >
        </v-flex>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import personRepo from "~/plugins/personRepo.js";
export default {
  props: {},

  data() {
    return {
      personData: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        provinceOrTerritory: "",
        postalCode: "",
        phoneNumber: "",
        emailAddress: this.$store.state.user.email,
      },

      encyptedKeys: [
        "firstName",
        "lastName",
        "address",
        "address2",
        "postalCode",
        "phoneNumber",
        "emailAddress",
      ],
    };
  },

  methods: {
    async register() {
      await personRepo.create(this.personData);
      this.$emit("user-registered");
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