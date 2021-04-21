<template>
    <v-container class="transportation-content">
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="add-btn" @click="toAddCategory()">+ Add Catagory</v-btn>
            </v-flex>
            <div>
                <TransportationTable :transportation-data="transportationData"/>
            </div>

        </v-card>        
    </v-container>
</template>

<script>
import TransportationTable from '../../components/TransportationTable.vue'
export default {
  components: { TransportationTable },
    props:{
        data: Object
    },

    data() {
        return {
            title: "Transportation",
            transportationData: this.data.transportation
        }
    },

    methods: {
        toAddCategory() {
            this.$router.push("/admin/addtransportation")
        }
    }
}

</script>

<style scoped>
.transportation-content {
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