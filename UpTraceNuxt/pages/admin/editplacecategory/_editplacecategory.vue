<template>
    <v-container v-if="loaded">
        <AdminPageTitle :title="title"/>
        <v-card>
        <AdminPlaceCategoryForm v-model="placeCategoryData" @update-data="updateData"/>
        <v-btn color="lightblue" class="white--text" type="button" elevation="1" @click="updatePlaceCategory()">
            Save
        </v-btn>   
        <v-btn color="lightgray" type="button" elevation="1" @click="deletePlaceCategory()">
            Delete
        </v-btn>       
        </v-card>

    </v-container>
    <v-container v-else>
        <AdminLoading />
    </v-container>
</template>

<script>
export default {
    created() {
        this.getData()
    },

    data() {
        return {
            title: "Edit Category",
            uuid: this.$route.params.editplacecategory,
            placeCategoryData: 'notloaded',
            loaded: false
        }
    },
    methods: {

        getData() {
            const _this = this
            console.log(this.uuid)
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'placeCategory','readPlaceCategoryFromID')).then(response=>{
                _this.placeCategoryData = response.value
                _this.loaded = true
            })
        },

        updateData(newData) {
            this.placeCategoryData = newData
            console.log("EDIT PERSON = " + this.placeCategoryData)
        },

        updatePlaceCategory() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.placeCategoryData,'placeCategory','updatePlaceCategory'))
            this.$emit("refresh-data","/admin/placecategory")
        },

        deletePlaceCategory() {
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'placeCategory','deletePlaceCategory'))
            this.$emit("refresh-data","/admin/placecategory")
        }
    }
}
</script>

<style scoped>

</style>