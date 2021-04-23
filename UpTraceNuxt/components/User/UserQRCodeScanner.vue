<template>
<div class="scanner-content">
  <v-row justify="center" align-content="center" height="200px">
    <div class="user-prompt">
      Please login from a mobile or tablet device to use QR Scanner
    </div>
  </v-row>
  <v-row>
      <v-col md=" 5">

      </v-col>
  </v-row>
  <v-row  justify="center"  align="center">
    <v-btn text type="button" @click="goBack()">back</v-btn>
  </v-row>
  </div>

</template>

<script>
export default {
  mounted() {
    this.$emit("update-title", "Have safe tracking!");
  },
  methods: {
    goBack() {
      this.$emit("go-back");
    },
  },
};
</script>

<style scoped>
.scanner-content {
  font-family: "Montserrat-SemiBold" !important;
    height: 300px;
}
</style>