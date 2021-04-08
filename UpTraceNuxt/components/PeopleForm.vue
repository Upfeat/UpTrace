<template>
    <v-card>
    <v-form>
        <v-container>
            <v-card-subtitle class="title">
                Personal
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                    >
                    <v-text-field
                        v-model="items.firstName"
                        label="First Name"
                        @input="onInput()"
                        >
                        
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.lastName"
                        label="Last Name">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-card-subtitle class="title">
                Address
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.address"
                        label="Address Line 1">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.address2"
                        label="Address Line 2">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.city"
                        label="City">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.provinceOrTerritory"
                        label="Province/Territory">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.postalCode"
                        label="Postal Code">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-card-subtitle class="title">
                Contact
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.phoneNumber"
                        label="Phone Number">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="items.emailAddress"
                        label="Email Address">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</v-card>

</template>

<script>
export default {

    props: {
        value: Object
    },

    data() {
        return {
            items: "not loaded"
        }
    },

    created() {
        this.items = this.value
    },

    methods: {
        onInput() {
            console.log("registered")
            this.$emit("update-data", this.items);
        }
   }

}
</script>

<style>
.title {
    border-bottom: solid 2px lightgray;
    padding-bottom:10px;
}
</style>