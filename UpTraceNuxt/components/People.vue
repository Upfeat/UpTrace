<template>
    <v-container>
        <h1 v-bind:display="display">{{display}}</h1>
    </v-container>
</template>

<script>
export default {
    props:[
        'display'
    ]
}
</script>

<style>

</style>