<template>
  <v-container>
    <v-flex class="text-center">
      <v-chip color="green" label class="ma-2" text-color="white" v-if="recentlyRegistered"
        >Registration Complete!</v-chip
      >
      <v-chip color="orange" label class="ma-2" text-color="white" v-if="alreadyRegistered"
        >You have already registered under this account</v-chip
      >
    </v-flex>
    <div class="prompt">
      Here is your Globally Unique <br/>Identifier (GUID)
    </div>
    <div>
      <canvas class="qr-code" id="canvas"> </canvas>
    </div>
       <v-flex class="text-center">
           <v-btn text type="button" @click="goBack()">Back</v-btn>
    </v-flex>
  </v-container>
</template>

<script>
import QRCode from "qrcode";
import personRepo from "~/plugins/personRepo.js";

export default {
  props: {
    recentlyRegistered: Boolean,
    alreadyRegistered: Boolean,
  },

  data() {
    return {
      loaded: false,
      uuid: null,
    };
  },

  created() {
    this.$emit("update-title", "Your Globally Unique Identifier\n(GUID)",)
  },

  async mounted() {
    await this.readUUID();
  },

  methods: {
    createQRCode() {
      QRCode.toCanvas(
        document.getElementById("canvas"),
        this.uuid,
        function (error) {
          if (error) console.error(error);
          console.log("success!");
        }
      );
    },

    async readUUID() {
      this.uuid = await personRepo.getUUID(this.$store.state.user.email);
      this.loaded = true;
    },
    goBack() {
        this.$emit("go-back")
    }
  },

  watch: {
    loaded(loaded) {
      if (loaded) {
        this.createQRCode();
      }
    },
  },
};
</script>

<style scoped>
.qr-code {
  padding: 0;
  margin: auto;
  display: block;
}

#canvas {
    width: 300px !important;
    height: 300px !important;
}
.prompt {
    font-family: "Montserrat-SemiBold" !important;
      display: flex;
  justify-content: center;
  text-align: center;
  font-size: 20px;

}
</style>