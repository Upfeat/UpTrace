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
                        v-model="firstName"
                        label="First Name">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="lastName"
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
                        v-model="address"
                        label="Address Line 1">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="address2"
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
                        v-model="city"
                        label="City">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="provinceOrTerritory"
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
                        v-model="postalCode"
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
                        v-model="phoneNumber"
                        label="Phone Number">
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="4"
                >
                    <v-text-field
                        v-model="emailAddress"
                        label="Email Address">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-btn type="text" @click="submit()">
                Submit
            </v-btn>                    
        </v-container>
    </v-form>
</v-card>

</template>

<script>
export default {
    data() {
        return{
            firstName: '',
            lastName: '',
            address: '',
            address2: '',
            city: '',
            provinceOrTerritory: '',
            postalCode: '',
            phoneNumber: '',
            emailAddress: ''
        }
    },
    
    methods: {
        async submit() {
            let person = {
                firstName: this.firstName,
                lastName: this.lastName,
                address: this.address,
                address2: this.address2,
                city: this.city,
                provinceOrTerritory: this.provinceOrTerritory,
                postalCode: this.postalCode,
                phoneNumber: this.phoneNumber,
                emailAddress: this.emailAddress 
            }
            var valid = await this.SAMLAuthenticate('POST',this.formatJsonBody(person,'people','addPerson'))            
        }
    }
    
}
</script>

<style>
.title {
    border-bottom: solid
}
</style>