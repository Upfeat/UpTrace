<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    color="bluegray"
    dark
  >
    <AdminUpfeatLogo />
    <v-list>
      <v-list-item :to="dashboard.to" router exact>
        <v-list-item-action>
          <v-icon color="teal">{{ dashboard.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="dashboard.title" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="people.to" router exact>
        <v-list-item-action>
          <v-icon color="teal">{{ people.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title v-text="people.title" />
        </v-list-item-content>
      </v-list-item>

      <v-row>
        <v-col md="9">
          <v-list-item :to="places.to" router exact>
            <v-row>
              <v-col md="4">
                <v-list-item-action>
                  <v-icon color="teal">{{ places.icon }}</v-icon>
                </v-list-item-action>
              </v-col>

              <v-col md="8">
                <v-list-item-content>
                  <v-list-item-title v-text="places.title" />
                </v-list-item-content>
              </v-col>
            </v-row>
          </v-list-item>
        </v-col>
        <v-col md="3" >
          <v-flex class="text-left">
          <v-btn icon type="button" @click="showCategories"
            ><v-icon dark> mdi-chevron-down </v-icon></v-btn
          >
          </v-flex>
        </v-col>
      </v-row>

      <v-list-item v-if="categories" :to="placeCategories.to" router exact>
        <v-list-item-content>
          <v-list-item-title v-text="placeCategories.title" />
        </v-list-item-content>
      </v-list-item>

      <v-list-item :to="transportation.to" router exact>
        <v-list-item-action>
          <v-icon color="teal">{{ transportation.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="transportation.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      categories: false,

      dashboard: {
        icon: "mdi-view-dashboard",
        title: "Dashboard",
        to: "/admin",
      },
      people: {
        icon: "mdi-account-circle",
        title: "People",
        to: "/admin/people",
      },
      places: {
        icon: "mdi-map",
        title: "Place",
        to: "/admin/places",
      },
      placeCategories: {
        icon: "mdi-map",
        title: "Category",
        to: "/admin/placecategory",
      },

      transportation: {
        icon: "mdi-train-variant",
        title: "Transportation",
        to: "/admin/transportation",
      },

      miniVariant: false,
      right: true,
      rightDrawer: false,
    };
  },
  methods: {
    showCategories() {
      this.categories = !this.categories;
    },
  },
};
</script>

<style scoped>
</style>