<template>
    <v-container>
        <v-card>
            <AdminPageTitle :title="title"/>
            <v-row>
                <v-col>
                    <PlaceForm ref="placeForm" :manual-enter="manualEnter" v-model="placeData"/>
                </v-col>
            </v-row>
            <v-btn color="lightblue" class="white--text" type="button" @click="submit()">
                + Add Place
            </v-btn>
            <v-btn v-if="!manualEnter" type="button" color="lightblue" outlined text @click="manuallyEnter()">Manually Enter Place</v-btn>
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
                placeID: '',
                address: '',
                address2: '',
                city: '',
                provinceOrTerritory: '',
                latlong: '',
            },
            manualEnter: false
        }
    },

    methods: {
        submit() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.placeData,'places','addPlace'))
            this.$emit("refresh-data","/admin/places")
        },

        manuallyEnter() {
            this.manualEnter = true
        }
    }
}
</script>

<style>

</style>