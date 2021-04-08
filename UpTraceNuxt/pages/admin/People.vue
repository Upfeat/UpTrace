<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="white--text" @click="toAddMember()">+ Add Member</v-btn>
            </v-flex>
            <PeopleTable :people-data="peopleData"/>
        </v-card>        
    </v-container>
</template>

<script>
import PeopleTable from '../../components/PeopleTable.vue'
export default {
  components: { PeopleTable },
    layout: 'adminnav',

    props:{
        peopleData: Array
    },

    created() {
        console.log(this.displayData)
    },

    computed: {
        displayData() {
            return JSON.stringify(this.peopleData)
        }
    },

    data() {
        return {
            title: "People",
        }
    },

    methods: {
        toAddMember() {
            this.$router.push("/admin/addperson")
        },

        PRINT() {
            console.log(JSON.stringify(this.peopleData))
        }
    }
}

</script>

<style>

</style>