<template>
  <v-form class="form">
    <v-container>
      <v-card-subtitle class="title"> Place Information </v-card-subtitle>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-text-field v-model="items.name" label="Name"> </v-text-field>
            </v-col>
            <v-col cols="12" :md="colLen">
              <v-text-field v-model="items.phoneNumber" label="Phone Number">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-text-field readonly v-model="items.email" label="Email">
              </v-text-field>
            </v-col>
          </v-row>

          <!-- Bottom half -->
          <p>Look up an address using Google Maps</p>

          <v-row justify="start">
            <v-col>
              <v-row>
                <v-col cols="12">
                  <div class="placeLookup">
                    <v-autocomplete
                      v-model="selectedLocation"
                      :items="locations"
                      :loading="isLoading"
                      :search-input.sync="search"
                      hide-details
                      hide-selected
                      item-text="name"
                      item-value="place_id"
                      label="Search for a place..."
                      solo
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-title>
                            Search for a
                            <strong>Place</strong>
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                      <template v-slot:selection="{ item }">
                        <span v-text="item.name"></span>
                      </template>
                      <template v-slot:item="{ item }">
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.name"
                          ></v-list-item-title>
                          <v-list-item-subtitle
                            v-text="item.address"
                          ></v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                    </v-autocomplete>
                  </div>
                </v-col>
              </v-row>
              <!-- Fields -->
              <div v-if="locationChosen">
                <v-card class="locationInfo" flat tile color="grey lighten-3">
                  <v-card-title>{{ this.items.name }}</v-card-title>
                  <v-card-text>{{ this.items.address }}</v-card-text>
                  <v-card-text>{{ this.items.latlong }}</v-card-text>
                </v-card>
              </div>
            </v-col>
            <!-- Map column -->
            <v-col>
              <GoogleMapsController
                ref="gMap"
                :admin="false"
                :text-query="search"
                @update-auto-complete="updateAutoComplete"
                @update-place-details="updatePlaceDetails"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <div class="registerBtn">
          <v-btn
            color="lightblue"
            class="white--text"
            type="button"
            @click="submit()"
          >
            Register
          </v-btn>
        </div>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import placeRepo from "~/plugins/placeRepo.js";

export default {
  props: {
    userEmail: String,
  },
  data() {
    return {
      items: {
        name: "",
        phoneNumber: "",
        email: "",
        category: "",
        type: "",
        placeID: "",
        address: "",
        address2: "",
        city: "",
        provinceOrTerritory: "",
        latlong: "",
      },
      colLen: 5,
      isLoading: false,
      search: null,
      locations: [],
      selectedLocation: null,
      locationChosen: false,
    };
  },

  mounted() {
    this.items.email = this.userEmail;
    console.log("PLACE FORM" + this.userEmail);
  },

  methods: {
    updatePlaceSearch() {
      console.log("updateplacesearch: " + this.search);
      if (typeof this.search === "object") {
        //this.search = this.search.name;
      } else if (this.search !== null && this.search.length > 1) {
        console.log("TEXT: " + this.search);
        this.$refs.gMap.getPlaces();
      }
    },

    searchByID() {
      console.log("Selected location: " + this.selectedLocation);
      this.locationChosen = true;
      this.$refs.gMap.searchByID(this.selectedLocation);
    },

    updateAutoComplete(locations) {
      console.log("found locations" + JSON.stringify(locations));
      this.locations = locations;
    },

    updatePlaceDetails(details) {
      console.log("PROVINCE OR TERRITORY =" + details.provinceOrTerritory)
      this.items.name = details.name;
      this.items.address = details.address;
      this.items.phoneNumber = details.phoneNumber;
      this.items.city = details.city;
      this.items.provinceOrTerritory = details.provinceOrTerritory;
      this.items.postalCode = details.postalCode;
      this.items.latlong = details.latlong;
      this.items.placeID = details.placeID;
    },

    submit() {
      console.log("PLACE DETAILS: " + JSON.stringify(this.items))
      placeRepo.create(this.items);
      this.$emit('place-registered')
    },
  },

  watch: {
    search(val) {
      if (val) {
        console.log("submitting requst");
        console.log("VAL = " + val);
        this.isLoading = true;
        this.updatePlaceSearch();
        this.isLoading = false;
      }
    },

    selectedLocation(val) {
      if (val) {
        this.searchByID();
      }
    },
  },
};
</script>

<style scoped>
.title {
  border-bottom: solid 2px lightgray;
  padding-bottom: 10px;
}
.registerBtn {
    display: flex !important;
    justify-content: center !important;
}

.locationInfo {
  margin-top: 20px;
}

.placeLookup {
  margin-top: 20px;
}
</style>