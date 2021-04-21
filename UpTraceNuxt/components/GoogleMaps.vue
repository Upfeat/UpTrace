<template>
  <div v-if="admin" style="width: 500px; height: 500px">
    <div ref="map" style="width: 100%; height: 100%"></div>
  </div>
  <div v-else style="width: 360px; height: 230px">
    <div ref="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  props: {
    apiKey: String,
    query: String,
    admin: Boolean,
  },

  created() {
    this.d_setBounds = debounce(this.setBounds, 2000);
  },

  mounted() {
    if (!process.server) {
      if (typeof google === "undefined") {
        const script = document.createElement("script");
        script.onload = this.onScriptLoaded;
        script.type = "text/javascript";
        script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&region=CA&language=en&libraries=places`;
        document.head.appendChild(script);
      } else {
        this.onScriptLoaded();
      }
    }
  },

  data() {
    return {
      gMap: null,
      placesService: null,
      fields: ["name", "formatted_address", "geometry", "place_id"],
      locationBias: null,
      autoCompleteList: [],
      markers: [],
    };
  },

  methods: {
    onScriptLoaded(event = null) {
      if (event) {
        this.initMap();
      } else {
        console.log("Already existed");
      }
    },

    initMap() {
      try {
        this.gMap = new google.maps.Map(this.$refs.map, {
          center: { lat: 49.8951, lng: -97.1384 },
          zoom: 8,
        });

        this.placesService = new google.maps.places.PlacesService(this.gMap);

        const _this = this;
        google.maps.event.addListener(this.gMap, "bounds_changed", function () {
          _this.d_setBounds(this);
        });
      } catch (error) {
        console.log("error: " + error);
      }
    },

    setBounds(map) {
      const coordinates = map.getBounds().toJSON(); //.toJSON();
      this.locationBias = {
        north: coordinates.north,
        south: coordinates.south,
        east: coordinates.east,
        west: coordinates.west,
      };
    },

    buildTextSearchRequest(queryText) {
      return {
        query: queryText,
        fields: ["name", "formatted_address", "geometry", "place_id"],
        bounds: this.locationBias,
      };
    },

    buildPlaceDetailsRequest(queryText) {
      return {
        placeId: queryText,
        fields: [
          "name",
          "formatted_address",
          "formatted_phone_number",
          "geometry",
          "place_id",
        ],
      };
    },

    searchByID(place_id) {
      console.log("REACHED FINAL FUNCTION: place_id=" + place_id);
      if (place_id === null) return;
      const _this = this;
      this.clearMapResults();

      if (this.placesService) {
        this.placesService.getDetails(
          this.buildPlaceDetailsRequest(place_id),
          function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              _this.createMarker(results);
              _this.gMap.setCenter(results.geometry.location);
              _this.gMap.setZoom(18);
              _this.$emit(
                "selected-place-details",
                _this.formatPlaceResults(results)
              );
            } else {
              console.log("status: " + status);
            }
          }
        );
      } else {
        console.log("Places Service not initialized");
      }
    },

    submitRequest() {
      const _this = this;
      console.log("REACHED SUBMIT REQUEST: query=" + this.query);

      this.clearMapResults();

      if (this.placesService) {
        this.placesService.textSearch(
          this.buildTextSearchRequest(this.query),
          function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                _this.addToAutoComplete(results[i]);
                _this.createMarker(results[i]);
              }
              _this.gMap.setCenter(results[0].geometry.location);
            } else {
              console.log("status: " + status);
            }
          }
        );
      } else {
        console.log("Places Service not initialized");
      }
    },

    addToAutoComplete(place) {
      console.log("adding: " + place.name + " to the list");
      const listItem = {
        name: place.name,
        address: place.formatted_address,
        place_id: place.place_id,
      };
      this.autoCompleteList.push(listItem);
      this.$emit("update-auto-complete", this.autoCompleteList);
    },

    clearMapResults() {
      this.autoCompleteList.length = 0;
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
        this.markers[i] = null;
      }
      this.markers.length = 0;
    },

    formatPlaceResults(results) {
      return {
        name: results.name,
        address: results.formatted_address,
        phoneNumber: results.formatted_phone_number,
        city: results.formatted_address.split(",")[1].substring(1),
        provinceOrTerritory: this.abrevToFull(
          results.formatted_address.split(",")[2].substring(1, 3)
        ),
        postalCode: results.formatted_address.split(",")[2].substring(4),
        placeID: results.place_id,
        latlong: `${results.geometry.location.toJSON().lat}/${
          results.geometry.location.toJSON().lng
        }`,
      };
    },

    abrevToFull(abbrev) {
      let list = {
        AB: "Alberta",
        BC: "British Columbia",
        MB: "Manitoba",
        NB: "New Brunswick",
        NT: "Northwest Territories",
        NS: "Nova Scotia",
        NU: "Nunavut",
        ON: "Ontario",
        PE: "Prince Edward Island",
        QC: "Quebec",
        SK: "Saskatchewan",
        YT: "Yukon",
        NL: "Newfoundland and Labrador",
      };

      console.log("ABBREV = " + abbrev + "FULL = " + list[abbrev])
      return list[abbrev];
    },

    createMarker(place) {
      console.log(place);

      const map = this.gMap;
      if (!place.geometry || !place.geometry.location) return;
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
      this.markers.push(marker);
      google.maps.event.addListener(marker, "click", () => {
        console.log(place.name);
      });
    },
  },
};
</script>

<style scoped>
</style>