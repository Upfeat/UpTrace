<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="white--text" @click="toAddPlaceCategory()">+ Add Category</v-btn>
            </v-flex>
            <div>
                <PlaceCategoryTable :place-category-data="placeCategoryData"/>
            </div>

        </v-card>        
    </v-container>
</template>

<script>
import PlaceCategoryTable from '../../components/PlaceCategoryTable.vue'
export default {
  components: { PlaceCategoryTable },

    props:{
        data: Object
    },

    data() {
        return {
            title: "Place Categories",
            placeCategoryData: this.data.placeCategory
        }
    },
    
    methods: {
        toAddPlaceCategory() {
            this.$router.push("/admin/addplacecategory")
        }
    }
}

</script>

<style>

</style>