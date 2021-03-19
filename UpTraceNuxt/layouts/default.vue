<template>
  <v-app dark>
    <v-card class="app-bar">
      <v-app-bar>
        <v-btn text @click="samlAuthenticate()">AUTH</v-btn>
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
    async samlAuthenticate() {
      await this.SAMLAuthenticate('POST',this.formatJsonBody({stuff:"tuff"},'people','getData'))
    }
    
  }
}
</script>

<style>

</style>