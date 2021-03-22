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
            adminLoggedIn: false,
            propData: 'not loaded'
            //    <People v-bind:display="propData" />
        }
    },

    async created() {
    },

    computed: {
        async loggedIn() {
            var data = await this.getData();
            this.adminLoggedIn = data.valid

            return this.adminLoggedIn;
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