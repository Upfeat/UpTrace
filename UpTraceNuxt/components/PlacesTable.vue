<template>
<v-card>
    <v-card-title>
        Places
    </v-card-title>
    <v-spacer>

    </v-spacer>
  <v-data-table
    :headers="headers"
    :items="placeData"
    :items-per-page="5"
    class="elevation-1"
    @click:row="handleClick"
  >
  </v-data-table>
</v-card>
</template>

<script>
export default {
    props: {
        placeData: Array
    },
    
    computed: {
        headers() {
            return [
                {text: 'Name', value: 'name'},
                {text: 'Phone Number', value: 'phoneNumber'},
                {text: 'Email Address', value: 'emailAddress'},
                {text: 'Catagory', value: 'catagory'},
                {text: 'Type', value: 'type'},
                {text: 'Address', value: 'address'},
                {text: 'Latitude/Longtitude', value: 'latlong'},
                {text: 'Google Place ID', value: 'googlePlaceID'},
            ]
        }
    },
    methods: {
        handleClick(place) {
            //this.$router.push({ path: `editplace/${place.uuid}` })
        },
    }
}
</script>

<style>

</style>