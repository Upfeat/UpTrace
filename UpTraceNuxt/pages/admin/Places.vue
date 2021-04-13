<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="white--text" @click="toAddPlace()">+ Add Place</v-btn>
            </v-flex>
            <div>
                <PlacesTable :place-data="placesData"/>
            </div>

        </v-card>        
    </v-container>
</template>

<script>
import PlacesTable from '../../components/PlacesTable.vue'
export default {
  components: { PlacesTable },

    props:{
        data: Object
    },

    data() {
        return {
            title: "Places",
            placesData: this.data.places
        }
    },

    methods: {
        toAddPlace() {
            this.$router.push("/admin/addplace")
        }
    }
}

</script>

<style>

</style>