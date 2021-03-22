<template>
    <v-container >
        <PeopleForm />
        <PeopleTable :people-data="peopleData"/>
    </v-container>


</template>

<script>
import PeopleTable from '../../components/PeopleTable.vue'
export default {
  components: { PeopleTable },
    layout: 'adminnav',

    props:{
        //tableData: Object
    },

    data() {
        return {
            peopleData:{
                people:[
                    {
                        firstName: 'Josh',
                        lastName: 'Daigle',
                        address: '54 st edmunds bay',
                        phoneNumber: '204-960-8617',
                        emailAddress: 'joshwdaigle@gmail.com'
                    }

                    ]

                }
        }
    },

    
}

</script>

<style>

</style>