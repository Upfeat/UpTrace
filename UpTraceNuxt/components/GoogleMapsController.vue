<template>
    <v-container>
        <GoogleMaps ref="gMaps" :apiKey="apiKey" :query="textQuery" @update-auto-complete="updateAutoComplete"/>
    </v-container>
</template>

<script>
export default {

    props: {
        textQuery: String,
    },

    data() {
        return {
            apiKey:"AIzaSyBJJ23wI0d0m9TY21_ioLkezDIWsp0IMNQ",
        }
    },

    methods: {
        submitQuery() {
            this.$refs.gMaps.submitRequest()
        },

        updateAutoComplete(autoCompleteList) {
            this.$emit("update-auto-complete",autoCompleteList)
        }

    }

}
</script>

<style>

</style>