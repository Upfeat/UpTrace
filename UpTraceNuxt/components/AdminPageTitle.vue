<template>
   <v-app-bar
      app
      min-width="200px"
    >
    <v-app-bar-title :title="getTitle" class="title2">
        {{title}}
    </v-app-bar-title>
    </v-app-bar>
</template>

<script>
export default {

    props: {
        title: String
    },

    computed: {
        getTitle() {
            return this.title
        }
    },
}
</script>

<style>
.title2 {
    font-family: 'Montserrat-Regular';
    overflow: visible;
    min-width: 2000px;
}
</style>