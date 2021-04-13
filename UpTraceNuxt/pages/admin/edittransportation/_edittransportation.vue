<template>
    <v-container v-if="loaded">
        <AdminPageTitle :title="title"/>
        <v-card>
        <TransportationForm v-model="transportationData" @update-data="updateData"/>
        <v-btn color="lightblue" class="white--text" type="button" elevation="1" @click="updateTransportation()">
            Save
        </v-btn>   
        <v-btn color="lightgray" type="button" elevation="1" @click="deleteTransportation()">
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
        this.getData()
    },

    data() {
        return {
            title: "Edit Transportation",
            uuid: this.$route.params.edittransportation,
            transportationData: 'notloaded',
            loaded: false
        }
    },
    methods: {

        getData() {
            const _this = this
            console.log(this.uuid)
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'transportation','readTransportationFromID')).then(response=>{
                _this.transportationData = response.value
                _this.loaded = true
            })
        },

        updateData(newData) {
            this.transportationData = newData
            console.log("EDIT PERSON = " + this.transportationData)
        },

        updateTransportation() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.transportationData,'transportation','updateTransportation'))
            this.$emit("refresh-data","/admin/transportation")
        },

        deleteTransportation() {
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'transportation','deleteTransportation'))
            this.$emit("refresh-data","/admin/transportation")
        }
    }
}
</script>

<style>

</style>