<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="white--text" @click="toAddCategory()">+ Add Catagory</v-btn>
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

<style>

</style>