<template>
<v-card>
    <v-card-title>
        Categories
    </v-card-title>
    <v-spacer>

    </v-spacer>
  <v-data-table
    :headers="headers"
    :items="placeCategoryData"
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
        placeCategoryData: Array
    },
    
    computed: {
        headers() {

            return [
                {text: 'Name', value: 'name'},
                {text: 'Type', value: 'type'},
                {text: 'Status', value: 'status'},
            ]
        }
    },
    methods: {
        handleClick(placeCategory) {
            this.$router.push({ path: `editplacecategory/${placeCategory.uuid}` })
        },
    }
}
</script>

<style>

</style>