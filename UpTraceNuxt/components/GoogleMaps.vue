<template>
  <div style="width: 500px; height: 500px">
    <div ref="map" style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import debounce from "debounce";
export default {
  props: {
    apiKey: String,
    query: String,
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
      console.log(coordinates)
      
      this.locationBias = {north:coordinates.north, south:coordinates.south, east:coordinates.east, west:coordinates.west}
    },


    buildRequest() {
      return {
        query: this.query,
        fields: this.fields,
        locationBias: this.locationBias,
      };
    },

    submitRequest() {
      const _this = this;

      this.clearMapResults()

      if (this.placesService) {
        this.placesService.findPlaceFromQuery(
          this.buildRequest(),
          function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                _this.addToAutoComplete(results[i])
                _this.createMarker(results[i])
              }
              _this.gMap.setCenter(results[0].geometry.location)
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
        const listItem = {name: place.name, address: place.formatted_address, id: place.place_id}
        //console.log("ITEM ADDED: "+JSON.stringify(listItem))
        this.autoCompleteList.push(listItem)
        this.$emit("update-auto-complete",this.autoCompleteList)
    },

    clearMapResults() {
      this.autoCompleteList.length=0
      for(var i = 0; i<this.markers.length; i++) {
          this.markers[i].setMap(null)
          this.markers[i] = null
      }
      this.markers.length=0
    },

    createMarker(place) {
      console.log(place);

      const map = this.gMap;
      if (!place.geometry || !place.geometry.location) return;
      const marker = new google.maps.Marker({
        map,
        position: place.geometry.location,
      });
      this.markers.push(marker)
      google.maps.event.addListener(marker, "click", () => {
        console.log(place.name);
      });
    },
  },
};
</script>

<style>
</style>