<template>
  <v-app dark>
    <v-card class="app-bar">
      <v-app-bar>
        <v-btn text @click="samlTest()">SAML</v-btn>
      </v-app-bar>
    </v-card>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
 methods: {
    async samlTest() {
      const res = await this.invokeCloudFunction('get','https://us-central1-attempt2-302520.cloudfunctions.net/acs-1')
      const url = res.data;
      window.location.replace(url)
    }
  }
}
</script>

<style>

</style>