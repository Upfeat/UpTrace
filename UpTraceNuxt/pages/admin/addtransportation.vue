<template>
    <v-container>
        <v-card>
            <div class="content"></div>
            <AdminPageTitle :title="title"/>
            <v-row>
                <v-col>
                    <TransportationForm  v-model="transportationData"/>
                </v-col>
            </v-row>
            <v-btn color="lightblue" class="white--text" type="button" @click="submit()">
                + Add Category
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
export default {

 data() {
        return {
            title: "Add Transportation",
            transportationData: {
                type: '',
                identifier: '',
                startDate: '',
                endDate: '',
            },
        }
    },

    methods: {
        submit() {
            console.log(JSON.stringify(this.transportationData))
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.transportationData,'transportation','addTransportation'))
            this.$emit("refresh-data","/admin/transportation")
        },

    }
}
</script>

<style scoped>
.content {
    font-family: 'Montserrat-Regular';
}
</style>