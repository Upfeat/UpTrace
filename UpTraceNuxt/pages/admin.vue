<template>
  <v-container v-if="this.loggedIn">
  </v-container>
  <v-container v-else-if="!this.loggedIn">
    <v-progress-circular
      :size="400"
      :width="7"
      color="green"
      indeterminate
    ></v-progress-circular>
  </v-container>

</template>

<script>
export default {
    
    data() {
        return {
            adminLoggedIn: false,
            propData: 'not loaded'
            //    <People v-bind:display="propData" />
        }
    },

    async created() {
        var data = await this.getData();
        if(data.valid) {
            this.adminLoggedIn = true;
            this.propData = data.value;
        }

    },

    computed: {
        loggedIn() {
            return this.adminLoggedIn;
        }
    },

    methods: {

        async getData() {
            return await this.SAMLAuthenticate('GET','test')
        },

    }

}
</script>

<style>

</style>