<template>
    <v-container v-if="loggedIn" class="pages">
        <AdminNavBar />
        <NuxtChild :data="data" @refresh-data="refreshData"/>
    </v-container>
    <v-container v-else-if="!loggedIn">
        <Loading />
    </v-container>
</template>

<script>
import Loading from '../components/Loading.vue';
export default {
  components: { Loading },
    //layout: 'adminnav',

    data() {
        return {
            propData: 'not loaded',
            adminLoggedIn: false,
            peopleData: [],
            placeData: [],
            placeCategoryData: [],
            transportationData: []
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
        },

        data() {
            return {
                people: this.peopleData,
                places: this.placeData,
                transportation: this.transportationData,
                placeCategory: this.placeCategoryData
            }
        }
    },

    methods: {

        getData() {
            console.log("GETTING THE DATA")
            const _this = this;
            this.SAMLAuthenticate('POST',this.formatJsonBody({},'people','readAll')).then(response=>{
                if(response === undefined) {
                    console.log("It is undefined in admin Get Data")
                }
                _this.peopleData = response.value

                this.SAMLAuthenticate('POST',this.formatJsonBody({},'places','readAll')).then(response=>{
                    _this.placeData = response.value
                    
                    this.SAMLAuthenticate('POST',this.formatJsonBody({},'placeCategory','readAll')).then(response=>{
                        _this.placeCategoryData = response.value

                        this.SAMLAuthenticate('POST',this.formatJsonBody({},'transportation','readAll')).then(response=>{
                            _this.adminLoggedIn = response.valid
                            _this.transportationData = response.value
                        })
                    })
                })
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
.pages {
}
</style>