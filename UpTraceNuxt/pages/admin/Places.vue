<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="white--text" @click="toAddPlace()">+ Add Place</v-btn>
            </v-flex>
            <PlacesTable :place-data="placeData"/>
        </v-card>        
    </v-container>
</template>

<script>
import PlacesTable from '../../components/PlacesTable.vue'
export default {
  components: { PlacesTable },
    layout: 'adminnav',

    props:{
        placeData: Array
    },

    data() {
        return {
            title: "Places",
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