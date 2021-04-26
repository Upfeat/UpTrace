<template>
  <v-form class="form">
    <v-container>
      <v-card-subtitle class="title"> Place Information </v-card-subtitle>
      <v-row>
        <v-col>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-text-field
                v-model="items.name"
                label="Name"
                @input="onInput()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-text-field
                v-model="items.phoneNumber"
                label="Phone Number"
                @input="onInput()"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" :md="colLen">
              <v-text-field
                v-model="items.email"
                label="Email"
                @input="onInput()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-autocomplete
                v-model="items.category"
                :items="placeCategoryData"
                item-text="name"
                label="Category"
                return-object
                @select="onInput()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" :md="colLen">
              <v-autocomplete
                v-model="items.type"
                :items="type"
                label="Types"
                @input="onInput()"
              ></v-autocomplete>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" :md="colLen">
              <v-text-field
                v-model="items.placeID"
                label="Google Place ID"
                @input="onInput()"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-card-subtitle class="title"> Address </v-card-subtitle>

          <!-- Bottom half -->
          <v-row>
            <v-col>
              <v-row>
                <v-col cols="12" :md="8">
                  <div class="placeLookup">
                    <p>Look up an address using Google Maps</p>

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
              <div v-if="manualEnter">
                <v-row>
                  <v-col cols="12" :md="colLen">
                    <v-text-field
                      v-model="items.address"
                      label="Address Line 1"
                      @input="onInput()"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" :md="colLen">
                    <v-text-field
                      v-model="items.address2"
                      label="Address Line 2"
                      @input="onInput()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" :md="colLen">
                    <v-text-field
                      v-model="items.city"
                      label="City"
                      @input="onInput()"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" :md="colLen">
                    <v-autocomplete
                      v-model="items.provinceOrTerritory"
                      :items="provinceOrTerritory"
                      label="Province/Territory"
                      @input="onInput()"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" :md="colLen">
                    <v-text-field
                      v-model="items.postalCode"
                      label="Postal Code"
                      @keyup="onInput()"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" :md="colLen">
                    <v-text-field
                      v-model="items.latlong"
                      label="Latitude/Longtitude"
                      @input="onInput()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </div>
              <div v-else-if="locationChosen">
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
                :text-query="search"
                :admin="true"
                @update-auto-complete="updateAutoComplete"
                @update-place-details="updatePlaceDetails"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    value: Object,
    placeCategoryData: Array,
    manualEnter: Boolean,
  },

  data() {
    return {
      items: [],
      colLen: 3,
      type: ["public", "private"],
      provinceOrTerritory: [
        "Alberta",
        "British Columbia",
        "Manitoba",
        "New Brunswick",
        "Newfoundland and Labrador",
        "Northwest Territories",
        "Nova Scotia",
        "Nunavut",
        "Ontario",
        "Prince Edward Island",
        "Quebec",
        "Saskatchewan",
        "Yukon",
      ],
      isLoading: false,
      search: null,
      locations: [],
      selectedLocation: null,
      locationChosen: false,
    };
  },

  created() {
    this.items = this.value;
    console.log("Place Category Data: " + this.placeCategoryData);
  },

  methods: {
    onInput() {
      this.$emit("update-data", this.items);
    },

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
      this.items.name = details.name;
      this.items.address = details.address;
      this.items.phoneNumber = details.phoneNumber;
      this.items.city = details.city;
      this.items.provinceOrTerritory = details.provinceOrTerritory;
      this.items.postalCode = details.postalCode;
      this.items.latlong = details.latlong;
      this.items.placeID = details.placeID;
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
.form {
  font-family: "Montserrat-Regular";
}

.locationInfo {
  margin-top: 20px;
}

.placeLookup {
  margin-top: 20px;
}
</style>