<template>
    <v-container>
        <v-card-title
          elevation="1"
          shaped
        >
        People
        </v-card-title>

        <h1 v-bind:display="display">{{display}}</h1>
    </v-container>
</template>

<script>
export default {
    layout: 'adminOverlay',

    props:[
        'display'
    ]
}
</script>

<style>

</style>