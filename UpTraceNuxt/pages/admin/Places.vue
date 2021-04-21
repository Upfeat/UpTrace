<template>
  <v-container class="place-content">
    <AdminPageTitle :title="title" />
    <v-card>
      <v-flex class="text-right">
        <v-btn
          type="button"
          color="lightblue"
          class="add-btn"
          @click="toAddPlace()"
          >+ Add Place</v-btn
        >
      </v-flex>
      <v-spacer></v-spacer>

      <div>
        <PlacesTable
          :place-data="placesData"
          :place-categories="placeCategoryData"
        />
      </div>
    </v-card>
  </v-container>
</template>

<script>
import PlacesTable from "../../components/PlacesTable.vue";
export default {
  components: { PlacesTable },

  props: {
    data: Object,
  },

  data() {
    return {
      title: "Places",
      placesData: this.data.places,
      placeCategoryData: this.data.placeCategory,
    };
  },

  methods: {
    toAddPlace() {
      this.$router.push("/admin/addplace");
    },
  },
};
</script>

<style>
.people-content {
  font-family: "Montserrat-Regular" !important;
}
.add-btn {
  font-family: "Montserrat-Regular" !important;
  color: white !important;
  margin-bottom: 0.5% !important;
  margin-top: 1% !important;
  margin-right: 1% !important;
}
</style>