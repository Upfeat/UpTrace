<template>
  <v-container>
    <v-card :width="cardWidth">
      <UserPersonPlacePicker
        v-if="interfaceState == 'UserPersonPlacePicker'"
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
      <UserQRCode
        v-if="interfaceState == 'UserQRCode'"
        :recently-registered="hasRegistered"
        :already-registered="alreadyRegistered"
        @go-back="undoPersonPlaceSelection"
        @update-title="updateTitle"
      />
      <UserPlaceRegistrationForm
        :user-email="loggedIn.email"
        v-if="interfaceState == 'UserPlaceRegistrationForm'"
        @place-registered="userHasRegistered"
      />
      <UserQRCodeScanner
        v-if="interfaceState == 'UserQRCodeScanner'"
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
      widths: {
        userPersonPlacePicker: "700px",
        userLogin: "500px",
        userRegistrationForm: "500px",
        userQRCode: "500px",
        userPlaceRegistrationForm: "700px",
        userQRCodeScanner: "700px"
      },
      loading: false,
    };
  },
  computed: {
    interfaceState() {
      let state = "";

      if (!this.person && !this.place) {
        //initial state
        state = "UserPersonPlacePicker";

      } else if (this.loggedIn) {
        //console.log("IS IT IN REPO: "+personRepo.checkForEmail(this.loggedIn.email))
        if (this.person) {
          if (this.isRegistering) {
            if (this.$store.state.personRegistered) {
              this.alreadyRegistered = true;
              state = "UserQRCode";
            } else if (this.hasRegistered) {
              state = "UserQRCode";
            } else {
              state = "UserRegistrationForm";
            }
          } else {
            state = "UserQRCode";

          }
        } else if (this.place) {
          if (this.isRegistering) {
            if (this.$store.state.placeRegistered) {
              this.alreadyRegistered = true;
              state = "UserQRCodeScanner";
            } else if (this.hasRegistered) {
              state = "UserQRCodeScanner";
            } else {
              state = "UserPlaceRegistrationForm"; //TODO
            }
          } else {
            state = "UserQRCodeScanner";
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

    cardWidth() {
      var width
      switch(this.interfaceState) {
        case "UserPersonPlacePicker": 
          width = this.widths.userPersonPlacePicker
          break
        case "UserLogin":
          width = this.widths.userLogin
          break
        case "UserRegistrationForm":
          width = this.widths.userRegistrationForm
          break
        case "UserQRCode":
          width = this.widths.userQRCode
          break 
        case "UserPlaceRegistrationForm":
          width = this.widths.userPlaceRegistrationForm
          break 
        case "UserQRCodeScanner":
          width = this.widths.userQRCodeScanner
          break
        default:
          width = "700px"
      }
      return width
    }
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