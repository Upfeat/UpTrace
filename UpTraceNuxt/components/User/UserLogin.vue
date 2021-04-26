<template>
  <div class="user-login">
    <div id="firebaseui-auth-container"></div>
    <v-flex class="text-center">
      <v-btn text type="button" @click="goBack()">Back</v-btn>
    </v-flex>
  </div>
</template>
<script>
import { fireAuth, authProviders } from "~/plugins/firebase";

export default {
  name: "Login",

  mounted: function () {
    if (process.browser) {
      const firebaseui = require("firebaseui");
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(fireAuth);

      const config = {
        credentialHelper: firebaseui.auth.CredentialHelper.NONE,
        signInOptions: [
          authProviders.Google,
          authProviders.Facebook,
          authProviders.Apple,
        ],
        signInFlow: "popup",
        tosUrl: "/tos",
        privacyPolicyUrl: "/privacy-policy",
        callbacks: {
          signInSuccessWithAuthResult: this.signInResult,
        },
      };
      ui.disableAutoSignIn();
      if (this.$store.state.user) {
        this.openAppPage();
      } else {
        ui.start("#firebaseui-auth-container", config);
      }
    }
  },
  methods: {
    signInResult() {
      this.openAppPage();
      return false;
    },
    openAppPage() {
      this.$router.push({
        path: "/",
      });
    },
    goBack() {
      this.$emit("go-back");
    },
  },
};
</script>
<style src="~/node_modules/firebaseui/dist/firebaseui.css">
.user-login {
  margin-top: 100px !important;
}
</style>
