<template>
    <v-container>
        <v-card>
            <div class="content"></div>
            <AdminPageTitle :title="title"/>
            <v-row>
                <v-col>
                    <AdminPlaceCategoryForm  v-model="placeCategoryData"/>
                </v-col>
            </v-row>
            <v-btn color="lightblue" class="white--text" type="button" @click="submit()">
                + Add Category
            </v-btn>
        </v-card>
    </v-container>
</template>

<script>
export default {

 data() {
        return {
            title: "Add Place Category",
            placeCategoryData: {
                name: '',
                type: '',
                status: '',
            },
        }
    },

    methods: {
        submit() {
            console.log(JSON.stringify(this.placeCategoryData))
            this.SAMLAuthenticate('POST',this.formatJsonBody(this.placeCategoryData,'placeCategories','addPlaceCategory'))
            this.$emit("refresh-data","/admin/placeCategory")
        },

    }
}
</script>

<style scoped>
.content {
    font-family: 'Montserrat-Regular';
}
</style>