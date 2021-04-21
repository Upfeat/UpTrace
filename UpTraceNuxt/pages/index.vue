<template>
  <v-app>
    <v-container class="background">
      <v-row>
        <upfeat-logo-main />
      </v-row>
      <v-row align="start" justify="center">
        <v-col>
          <div class="top-text-title">
            <div class="h4">{{ title }}</div>
          </div>
          <div class="top-text-subtitle">
            <div
              class="subtitle-1"
              v-text="
                'Instead of filling out forms everytime you visit a place, scan your QR code we provide for you to automatically generate your information'
              "
            ></div></div
        ></v-col>
      </v-row>

      <v-row align="center" justify="center">
        <div class="interface">
          <UserInterface @update-title="updateTitle"/>
        </div>
      </v-row>
    </v-container>
  </v-app>
</template>
 
      
};
<script>
import upfeatLogo from "../components/upfeat-logo.vue";
export default {
  components: { upfeatLogo },
  data() {
    return {
      title:
        "Create a Unique Code for yourself or business to have safe tracking",
    };
  },
  methods: {
    updateTitle(text) {
      console.log("NEW TITLE FORREAL = " + text)
      this.title = text;
    },
  },
};
</script>

<style scoped>
.background {
  background: url(~assets/background.svg) no-repeat !important;
  background-size: 100% 60% !important;
}
.top-text-title {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 40px;
  color: white;
  font-family: "Montserrat-Regular";
}

.interface {
  display: flex;
  justify-content: center;
}
.top-text-subtitle {
  display: flex;
  justify-content: center;
  text-align: center;
  color: white;
  font-family: "Montserrat-Regular";
}
</style>