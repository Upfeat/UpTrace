<template>
  <div v-if="loggedIn">
    <AdminNavBar />
    <NuxtChild :data="data" @refresh-data="refreshData" />
  </div>
  <div v-else-if="!loggedIn">
    <v-row justify="center">
      <v-col align-self="center">
        <AdminLoading />

      </v-col>
    </v-row>
  </div>
</template>

<script>
import AdminNavBar from '../components/Admin/AdminNavBar'
export default {
  components: {
    AdminNavBar
  },
  data() {
    return {
      propData: "not loaded",
      adminLoggedIn: false,
      peopleData: [],
      placeData: [],
      placeCategoryData: [],
      transportationData: [],
    };
  },

  created() {
    if (!this.adminLoggedIn) {
      this.getData();
    }
  },

  computed: {
    loggedIn() {
      return this.adminLoggedIn;
    },
    displayPeopleData() {
      return JSON.stringify(this.peopleData);
    },

    data() {
      return {
        people: this.peopleData,
        places: this.placeData,
        transportation: this.transportationData,
        placeCategory: this.placeCategoryData,
      };
    },
  },

  methods: {
    getData() {
      console.log("GETTING THE DATA");
      const _this = this;
      this.SAMLAuthenticate(
        "POST",
        this.formatJsonBody({}, "people", "readAll")
      ).then((response) => {
        if (response === undefined) {
          console.log("It is undefined in admin Get Data");
        }
        _this.peopleData = response.value;

        this.SAMLAuthenticate(
          "POST",
          this.formatJsonBody({}, "places", "readAll")
        ).then((response) => {
          _this.placeData = response.value;

          this.SAMLAuthenticate(
            "POST",
            this.formatJsonBody({}, "placeCategory", "readAll")
          ).then((response) => {
            _this.placeCategoryData = response.value;

            this.SAMLAuthenticate(
              "POST",
              this.formatJsonBody({}, "transportation", "readAll")
            ).then((response) => {
              _this.adminLoggedIn = response.valid;
              _this.transportationData = response.value;
            });
          });
        });
      });
    },

    refreshData(url) {
      const _this = this;
      this.SAMLAuthenticate(
        "POST",
        this.formatJsonBody({}, "people", "readAll")
      ).then((response) => {
        _this.adminLoggedIn = response.valid;
        _this.peopleData = response.value;
      });
      this.$router.push(url);
    },
  },
};
</script>

<style scoped>
</style>