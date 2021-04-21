<template>
  <v-container>
    <v-card>
      <AdminPageTitle :title="title" />
      <v-row>
        <v-col>
          <PlaceForm
            ref="placeForm"
            :manual-enter="manualEnter"
            :place-catagory-data="placeCatagoryData"
            v-model="placeData"
          />
        </v-col>
      </v-row>
      <v-btn
        color="lightblue"
        class="white--text"
        type="button"
        @click="submit()"
      >
        + Add Place
      </v-btn>
      <v-btn
        v-if="!manualEnter"
        text
        type="button"
        color="lightblue"
        @click="manuallyEnter()"
        >Manually Enter Place</v-btn
      >
    </v-card>
  </v-container>
</template>

<script>
export default {

  data() {
    return {
      title: "Add Place",
      placeCategoryData: [],
      placeData: {
        name: "",
        phoneNumber: "",
        emailAddress: "",
        category: "",
        type: "",
        placeID: "",
        address: "",
        address2: "",
        city: "",
        provinceOrTerritory: "",
        latlong: "",
      },
      manualEnter: false,
    };
  },

  created() {
    this.getData();
  },

  methods: {
    submit() {
      this.SAMLAuthenticate(
        "POST",
        this.formatJsonBody(this.placeData, "places", "addPlace")
      );
      this.$emit("refresh-data", "/admin/places");
    },

    manuallyEnter() {
      this.manualEnter = true;
    },
    getData() {
      const _this = this;

      this.SAMLAuthenticate(
        "POST",
        this.formatJsonBody({}, "placeCategory", "readAll")
      ).then((response) => {
        _this.placeCategoryData = response.value;
      });
      console.log("addplace: "+ JSON.stringify(this.placeCategoryData + " or " + JSON.stringify(_this.placeCategoryData)))
    },

  },
};
</script>

<style scoped>
</style>