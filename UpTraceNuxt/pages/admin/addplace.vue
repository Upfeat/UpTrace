<template>
    <v-container>
        <v-card>
            <AdminPageTitle :title="title"/>
            <v-row>
                <v-col>
                    <PlaceForm ref="placeForm" @map-query="updateQuery" v-model="placeData"/>
                </v-col>
                <v-col>
                    <GoogleMapsController ref="gMaps" :text-query="queryText" @update-auto-complete="updateAutoComplete"/>
                </v-col>
            </v-row>
            <v-btn color="lightblue" class="white--text" type="button" @click="submit()">
                + Add Place
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
export default {
 data() {
        return {
            title: "Add Place",
            placeData: {
                name: '',
                phoneNumber: '',
                emailAddress: '',
                category: '',
                type: '',
                googlePlaceID: '',
                address: '',
                address2: '',
                city: '',
                provinceOrTerritory: '',
                latlong: '',
                placeSearch: '',
            },
            autoCompleteList: [],
            queryText: ''
        }
    },

    methods: {
        submit() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.peopleData,'place','addPlace'))
            this.$emit("refresh-data","/admin/place")
        },

        updateQuery(text) {
            console.log("place Search: " + text)
            this.queryText = text
            if(text && text.length > 1)
                this.$refs.gMaps.submitQuery()
        },

        updateAutoComplete(autoComplete) {
            this.autoCompleteList = autoComplete
            this.$refs.placeForm.changeLocations(autoComplete)

        }


    }
}
</script>

<style>

</style>