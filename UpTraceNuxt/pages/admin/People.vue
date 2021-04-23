<template>
    <v-container class="people-content">
        <AdminPageTitle :title="title"/>
        <v-card>
            <v-flex class="text-right">
                <v-btn type="button" color="lightblue" class="add-btn" @click="toAddMember()">+ Add Member</v-btn>
            </v-flex>
            <v-spacer></v-spacer>
            <div v-if="peopleData">
                <AdminPeopleTable :people-data="peopleData"/>

            </div>
        </v-card>        
    </v-container>
</template>

<script>
export default {
  
    props:{
        data: Object
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
            peopleData: this.data.people
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

<style scoped>
.people-content {
    font-family: "Montserrat-Regular" !important;
}
.add-btn {
    color: white;
    margin-bottom: 0.5% !important;
    margin-top: 1% !important;
    margin-right: 1% !important;
}
</style>