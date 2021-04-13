<template>
    <v-container>
        <GoogleMaps ref="gMaps" :apiKey="apiKey" :query="textQuery" @selected-place-details="updatePlaceDetails" @update-auto-complete="updateAutoComplete"/>
    </v-container>
</template>

<script>
import debounce from "debounce";

export default {

    props: {
        textQuery: String,
    },

    data() {
        return {
            apiKey:"AIzaSyBJJ23wI0d0m9TY21_ioLkezDIWsp0IMNQ",
        }
    },

    created() {
        this.d_submitQuery = debounce(this.submitQuery, 400)
    },

    methods: {
        submitQuery() {
            this.$refs.gMaps.submitRequest()
        },

        getPlaces() {
            this.d_submitQuery()
        },

        searchByID(place_id) {
            console.log("CONTROLLER: place_id=" + place_id)
            this.$refs.gMaps.searchByID(place_id)
        },

        updateAutoComplete(autoCompleteList) {
            this.$emit("update-auto-complete",autoCompleteList)
        },

        updatePlaceDetails(details) {
            console.log("SELECTED PLACE DETAILS = " + JSON.stringify(details))
            this.$emit("update-place-details",details)

        }

    }

}
</script>

<style>

</style>