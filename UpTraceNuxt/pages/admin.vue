<template>
  <v-container v-if="this.loggedIn">
      <NuxtChild :display="propData" />
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
    layout: 'adminnav',

    data() {
        return {
            propData: 'not loaded',
            adminLoggedIn: false
        }
    },

    computed: {
        async loggedIn() {
            console.log("called")
            if(!this.adminLoggedIn) {
                let valid = await (this.getData()).valid
                this.adminLoggedIn = valid
                return valid
            }
            return 
        }
    },

    methods: {

        async getData() {
            return await this.SAMLAuthenticate('POST',this.formatJsonBody({stuff:"tuff"},'people','getData'))
        }

    }

}
</script>

<style>

</style>