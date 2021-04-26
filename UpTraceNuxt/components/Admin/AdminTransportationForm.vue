<template>
  <v-form>
    <v-container>
      <v-card-subtitle class="title"> General information </v-card-subtitle>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="items.type"
            :items="types"
            label="Type"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="items.identifier"
            label="Identifier"
            @input="onInput()"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <template>
            <v-col>
              <v-menu
                ref="startDateMenu"
                v-model="startDateMenu"
                :close-on-content-click="false"
                :return-value.sync="startDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Start Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="startDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="startDateMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startDateMenu.save(startDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </template>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <template>
            <v-col>
              <v-menu
                ref="endDateMenue"
                v-model="endDateMenue"
                :close-on-content-click="false"
                :return-value.sync="endDate"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    label="End Date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="endDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="endDateMenue = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.endDateMenue.save(endDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    value: Object,
  },

  data() {
    return {
      items: "not loaded",
      types: ["Bus", "Plane", "Train", "Boat", "Taxi", "Private Car"],
      startDate: new Date().toISOString().substr(0, 10),
      endDate: new Date().toISOString().substr(0, 10),
      startDateMenu: false,
      endDateMenue: false,
    };
  },

  created() {
    this.items = this.value;
  },

  methods: {
    onInput() {
      this.$emit("update-data", this.items);
    },
  },

  watch: {
    startDate(val) {
      if (val) {
        this.items.startDate = val;
        console.log(this.items.startDate);
      }
    },
    endDate(val) {
      if (val) {
        this.items.endDate = val;
        console.log(this.items.endDate);
      }
    },
  },
};
</script>

<style scoped>
.title {
  border-bottom: solid 2px lightgray;
  padding-bottom: 10px;
  font-family: "Montserrat-Regular";
}
</style>