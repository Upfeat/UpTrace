<template>
    <v-container v-if="loaded">
        <AdminPageTitle :title="title"/>
        <v-card>
        <PlaceForm v-model="placeData" @update-data="updateData"/>
        <v-btn color="lightblue" class="white--text" type="button" elevation="1" @click="updatePlace()">
            Save
        </v-btn>   
        <v-btn color="lightgray" type="button" elevation="1" @click="deletePlace()">
            Delete
        </v-btn>       
        </v-card>

    </v-container>
    <v-container v-else>
        <Loading />
    </v-container>
</template>

<script>
export default {
    created() {
        console.log(this.$route.params)
        this.getData()
    },

    data() {
        return {
            title: "Edit Place",
            uuid: this.$route.params.editplace,
            peopleData: 'notloaded',
            loaded: false
        }
    },
    methods: {

        getData() {
            const _this = this
            console.log(this.uuid)
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'places','readPlaceFromID')).then(response=>{
                _this.placeData = response.value
                _this.loaded = true
            })
        },

        updateData(newData) {
            this.placeData = newData
            console.log("EDIT PERSON = " + this.placeData)
        },

        updatePlace() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.placeData,'places','updatePlace'))
            this.$emit("refresh-data","/admin/places")
        },

        deletePlace() {
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'places','deletePlace'))
            this.$emit("refresh-data","/admin/places")
        }
    }
}
</script>

<style scoped>

</style>