<template>
  <v-container>
    <v-card :width="cardWidth">
      <PersonPlacePicker
        v-if="interfaceState == 'PersonPlacePicker'"
        :isRegistering="isRegistering"
        @pick-person="personSelection"
        @pick-place="placeSelection"
        @log-in="logInSelection"
        @register="registerSelection"
      />
      <UserLogin v-if="interfaceState == 'UserLogin'" @go-back="undoPersonPlaceSelection"/>
      <UserRegistrationForm
        v-if="interfaceState == 'UserRegistrationForm'"
        @user-registered="userHasRegistered"
      />
      <QRCode
        v-if="interfaceState == 'QRCode'"
        :recently-registered="hasRegistered"
        :already-registered="alreadyRegistered"
        @go-back="undoPersonPlaceSelection"
        @update-title="updateTitle"
      />
      <PlaceRegistrationForm
        :user-email="loggedIn.email"
        v-if="interfaceState == 'PlaceRegistrationForm'"
        @place-registered="userHasRegistered"
      />
      <QRCodeScanner
        v-if="interfaceState == 'QRCodeScanner'"
        @update-title="updateTitle"
        @go-back="undoPersonPlaceSelection"
      />
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      person: false,
      place: false,
      isRegistering: true,
      hasRegistered: false,
      alreadyRegistered: false,
      uuid: null,
      cardWidth: "700px",
      cardHeight: "400px",
      placeRegistrationFormWidth: "700px",
      placeRegistrationFormHeight: "600px",
      loading: false,
    };
  },
  computed: {
    interfaceState() {
      let state = "";

      if (!this.person && !this.place) {
        //initial state
        state = "PersonPlacePicker";
      } else if (this.loggedIn) {
        //console.log("IS IT IN REPO: "+personRepo.checkForEmail(this.loggedIn.email))
        if (this.person) {
          if (this.isRegistering) {
            if (this.$store.state.personRegistered) {
              this.alreadyRegistered = true;
              state = "QRCode";
            } else if (this.hasRegistered) {
              state = "QRCode";
            } else {
              state = "UserRegistrationForm";
            }
          } else {
            state = "QRCode";
          }
        } else if (this.place) {
          if (this.isRegistering) {
            if (this.$store.state.placeRegistered) {
              this.alreadyRegistered = true;
              state = "QRCodeScanner";
            } else if (this.hasRegistered) {
              state = "QRCodeScanner";
            } else {
              this.cardWidth = this.placeRegistrationFormWidth;
              this.cardHeight = this.placeRegistrationFormHeight;
              state = "PlaceRegistrationForm"; //TODO
            }
          } else {
            state = "QRCodeScanner";
          }
        }
      } else {
        state = "UserLogin";
      }
      console.log(state);
      return state;
    },

    loggedIn() {
      return this.$store.state.user;
    },

    defaultTitle() {
      let defaultTitle = "";
      if (this.isRegistering) {
        defaultTitle = "Create a Unique Code for yourself or\nbusiness to have safe tracking";
      } else {
        defaultTitle = "Welcome Back!";
      }
      return defaultTitle
    },
  },
  methods: {
    logInSelection() {
      this.isRegistering = false;
      this.updateTitle(this.defaultTitle);
    },
    registerSelection() {
      this.isRegistering = true;
      this.updateTitle(this.defaultTitle);
    },
    userHasRegistered() {
      this.hasRegistered = true;
    },
    personSelection() {
      this.person = true;
    },
    undoPersonPlaceSelection() {
      this.person = false;
      this.place = false;
      this.updateTitle(this.defaultTitle);
    },
    placeSelection() {
      this.place = true;
    },
    updateTitle(text) {
      console.log("NEW TITLE = " + text);
      this.$emit("update-title", text);
    },
  },
};
</script>

<style scoped>
.v-card {
  height: auto;
}
</style>