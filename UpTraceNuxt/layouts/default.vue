<template>
  <v-app>
    <v-card class="app-bar">
      <v-app-bar>
        <v-btn text @click="goToAdmin()">ADMIN</v-btn>
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
    goToAdmin() {
      this.$router.push("admin/people")
    }
    
  }
}
</script>

<style>

</style>