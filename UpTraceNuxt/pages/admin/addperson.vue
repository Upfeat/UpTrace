<template>
    <v-container>
        <AdminPageTitle :title="title"/>
        <AdminPeopleForm v-model="peopleData"/>
        <v-btn color="lightblue" class="white--text" type="button" @click="submit()">
            + Add Member
        </v-btn>
    </v-container>

</template>

<script>
export default {
 data() {
        return {
            title: "Add Member",
            peopleData: {
                firstName: '',
                lastName: '',
                address: '',
                address2: '',
                city: '',
                provinceOrTerritory: '',
                postalCode: '',
                phoneNumber: '',
                emailAddress: ''
            }
        }
    },

    methods: {
        submit() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.peopleData,'people','addPerson'))
            this.$emit("refresh-data","/admin/people")
        },
    }
}
</script>

<style scoped>

</style>