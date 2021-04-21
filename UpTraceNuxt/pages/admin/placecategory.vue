<template>
    <v-container class="place-category-content">
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="add-btn" @click="toAddPlaceCategory()">+ Add Category</v-btn>
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
.place-category-content {
    font-family: "Montserrat-Regular" !important;
}
.add-btn {
    font-family: "Montserrat-Regular" !important;
    color: white !important;
    margin-bottom: 0.5% !important;
    margin-top: 1% !important;
    margin-right: 1% !important;
}
</style>