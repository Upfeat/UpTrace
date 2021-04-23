<template>
  <v-container class="content">
    <v-row>
      <v-col md="1"> </v-col>
      <v-col>
        <v-row>
          <v-col>
            <v-flex class="text-center">
              <div class="h1">{{ promptText }}</div>
            </v-flex>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col>
            <v-flex class="text-center">
              <img src="~assets/person.svg" width="200px" height="200px" />
            </v-flex>
          </v-col>

          <v-col md="1"> <v-flex class="or"> or </v-flex> </v-col>

          <v-col>
            <v-flex class="text-center">
              <img src="~assets/place.svg" width="200px" height="200px" />
            </v-flex>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-flex class="text-center">
              <v-btn
                color="lightblue"
                class="white--text"
                type="button"
                width="170px"
                height="52px"
                @click="pickPerson()"
                >Person</v-btn
              >
            </v-flex>
          </v-col>
          <v-col md="1"> </v-col>
          <v-col>
            <v-flex class="text-center">
              <v-btn
                color="lightblue"
                class="white--text"
                type="button"
                width="170px"
                height="52px"
                @click="pickPlace()"
                >Place</v-btn
              >
            </v-flex>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-flex class="text-center">
              <div class="btn-subtitle">Resister an individual person</div>
            </v-flex>
          </v-col>
          <v-col md="1"> </v-col>
          <v-col>
            <v-flex class="text-center">
              <div class="btn-subtitle">
                Register a restaurant, convience store, walk-in clinic etc.
              </div>
            </v-flex>
          </v-col>
        </v-row>

        <v-row justify="center">
          <div v-if="isRegistering">
            <v-btn text class="lightblue--text" type="button" @click="logIn()"
              >Already have an account? Sign in</v-btn
            >
          </div>
          <div v-else>
            <v-btn
              text
              class="lightblue--text"
              type="button"
              @click="register()"
              >Dont have an account? Register</v-btn
            >
          </div>
        </v-row>
      </v-col>
            <v-col md="1"> </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    isRegistering: Boolean,
  },

  data() {
    return {
      text: "hello",
    };
  },

  methods: {
    pickPerson() {
      this.$emit("pick-person");
    },
    pickPlace() {
      this.$emit("pick-place");
    },
    logIn() {
      this.$emit("log-in");
    },
    register() {
      this.$emit("register");
    },
  },
  computed: {
    promptText() {
      if (this.isRegistering) return "Register as a";
      return "Log in as a";
    },
  },
};
</script>

<style scoped>
.h1 {
  font-family: "Montserrat-Regular" !important;
  font-size: 34px;
}
.content {
  font-family: "Montserrat-Regular" !important;
}
.btn-subtitle {
  margin-bottom: 2%;
  color: #6B6B6B;
}
.or {
  font-family: "Montserrat-SemiBold" !important;
  font-size: 22px;
}
</style>