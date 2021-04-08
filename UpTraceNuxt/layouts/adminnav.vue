<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="bluegray"
      dark
    >
    <upfeat-logo />
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon color="teal">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  
    <v-footer>
    </v-footer>
  </v-app>
</template>

<script>
import upfeatLogo from '../components/upfeat-logo.vue'
export default {
  components: { upfeatLogo },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-account-circle',
          title: 'People',
          to: '/admin/people'
        },
        {
          icon: 'mdi-map',
          title: 'Places',
          to: '/admin/places'
        },
        {
          icon: 'mdi-train-variant',
          title: 'Transportation',
          to: '/admin/transportation'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
    }
  }
}
</script>

<style>

</style>