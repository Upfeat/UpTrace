<template>
<v-card>
    <v-card-title>
        People
    </v-card-title>
    <v-spacer>

    </v-spacer>
  <v-data-table
    :headers="headers"
    :items="peopleData.people"
    :items-per-page="5"
    class="elevation-1"
  >
  </v-data-table>
</v-card>
</template>

<script>
export default {
    props: {
        peopleData: Object
    },
    
    computed: {
        headers() {
            return [
                {text: 'First Name', value: 'firstName'},
                {text: 'Last Name', value: 'lastName'},
                {text: 'Address', value: 'address'},
                {text: 'Phone Number', value: 'phoneNumber'},
                {text: 'Email Address', value: 'emailAddress'}

            ]
        }
    }
}
</script>

<style>

</style>