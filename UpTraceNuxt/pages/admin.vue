<template>
    <v-container v-if="loggedIn">
        <NuxtChild :people-data="peopleData" @refresh-data="refreshData"/>
    </v-container>
    <v-container v-else-if="!loggedIn">
        <Loading />
    </v-container>
</template>

<script>
import Loading from '../components/Loading.vue';
export default {
  components: { Loading },
    layout: 'adminnav',

    data() {
        return {
            propData: 'not loaded',
            adminLoggedIn: false,
            peopleData: {not:'loaded'}
        }
    },

    created() {
        if(!this.adminLoggedIn) {
            this.getData();
        }
    },

    computed: {
        loggedIn() {
            return this.adminLoggedIn;
        },
        displayPeopleData() {
            return JSON.stringify(this.peopleData)
        }
    },

    methods: {

        getData() {
            console.log("GETTING THE DATA")
            const _this = this;
            this.SAMLAuthenticate('POST',this.formatJsonBody({},'people','readAll')).then(response=>{
                _this.adminLoggedIn = response.valid
                _this.peopleData = response.value
                console.log(JSON.stringify(response.value))
            })
            
        },

        refreshData(url) {
            const _this = this;
            this.SAMLAuthenticate('POST',this.formatJsonBody({},'people','readAll')).then(response=>{
                _this.adminLoggedIn = response.valid
                _this.peopleData = response.value
            })
            this.$router.push(url)
        }

    }

}
</script>

<style>

</style>