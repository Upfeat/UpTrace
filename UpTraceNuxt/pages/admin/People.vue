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
    layout: 'admin',

    props:[
        'display'
    ]
}
</script>

<style>

</style>