<template>
<v-card>
    <v-card-title>
        Transportation
    </v-card-title>
    <v-spacer>

    </v-spacer>
  <v-data-table
    :headers="headers"
    :items="transportationData"
    :items-per-page="5"
    class="elevation-1"
    @click:row="handleClick"
  >
  </v-data-table>
</v-card>
</template>

<script>
export default {
    props: {
        transportationData: Array
    },
    
    computed: {
        headers() {
            return [
                {text: 'Type', value: 'type'},
                {text: 'Identifier', value: 'identifier'},
                {text: 'Start Data', value: 'startDate'},
                {text: 'End Date', value: 'endDate'},
            ]
        }
    },
    methods: {
        handleClick(transportation) {
            this.$router.push({ path: `edittransportation/${transportation.uuid}` })
        },
    }
}
</script>

<style>

</style>