<template>
    <v-container v-if="loaded">
        <AdminPageTitle :title="title"/>
        <v-card>
        <PeopleForm v-model="peopleData" @update-data="updateData"/>
        <v-btn color="lightblue" class="white--text" type="button" elevation="1" @click="updatePerson()">
            Save
        </v-btn>   
        <v-btn color="lightgray" type="button" elevation="1" @click="deletePerson()">
            Delete
        </v-btn>       
        </v-card>

    </v-container>
    <v-container v-else>
        <Loading />
    </v-container>
</template>

<script>
export default {
    created() {
        console.log(this.$route.params)
        this.getData()
    },

    data() {
        return {
            title: "Edit Member",
            uuid: this.$route.params.editperson,
            peopleData: 'notloaded',
            loaded: false
        }
    },
    methods: {

        getData() {
            const _this = this
            console.log(this.uuid)
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'people','readPersonFromID')).then(response=>{
                _this.peopleData = response.value
                _this.loaded = true
            })
        },

        updateData(newData) {
            this.peopleData = newData
            console.log("EDIT PERSON = " + this.peopleData)
        },

        updatePerson() {
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.peopleData,'people','updatePerson'))
            this.$emit("refresh-data","/admin/people")
        },

        deletePerson() {
            this.SAMLAuthenticate('POST',this.formatJsonBody({'uuid': this.uuid},'people','deletePerson'))
            this.$emit("refresh-data","/admin/people")
        }
    }
}
</script>

<style>

</style>