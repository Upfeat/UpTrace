<template>
    <v-form>
        <v-container>
            <v-card-subtitle class="title">
                Place Information
            </v-card-subtitle>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                    >
                    <v-text-field
                        v-model="items.name"
                        label="Name"
                        @input="onInput()"
                        >
                        
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.phoneNumber"
                        label="Phone Number"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.email"
                        label="Email"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-autocomplete
                        v-model="items.catagories"
                        :items="catagories"
                        label="Catagory"
                        @input="onInput()"
                    ></v-autocomplete> 
                </v-col>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-autocomplete
                        v-model="items.types"
                        :items="types"
                        label="Types"
                        @input="onInput()"
                    ></v-autocomplete> 
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.googlePlaceID"
                        label="Google Place ID"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="5"
                >                 
                    <v-autocomplete
                        :search-input.sync="queryText"
                        :items="locations"
                        label="Search for a place"
                        @keydown="upDatePlaceSearch()"
                    >
                        <template v-slot:item="data">
                            <v-list-item-content>
                                <v-list-item-title v-text="data.item.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="data.item.address"></v-list-item-subtitle>
                            </v-list-item-content>       
                        </template>
                    </v-autocomplete>
                </v-col>
            </v-row>
             <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.address"
                        label="Address Line 1"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.address2"
                        label="Address Line 2"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.city"
                        label="City"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-autocomplete
                        v-model="items.provinceOrTerritory"
                        :items="provinceOrTerritory"
                        label="Province/Territory"
                        @input="onInput()"
                    ></v-autocomplete> 
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.postalCode"
                        label="Postal Code"
                        @keyup="onInput()"
                        >
                    </v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    :md="colLen"
                >
                    <v-text-field
                        v-model="items.latlong"
                        label="Latitude/Longtitude"
                        @input="onInput()"
                        >
                    </v-text-field>
                </v-col>
            </v-row>
        </v-container>
    </v-form>

</template>

<script>
export default {

    props: {
        value: Object,
    },

    data() {
        return {
            items: [],
            colLen: 3,
            types: ["accounting", "airport", "amusement_park", "aquarium", "art_gallery", "atm", "bakery", "bank", "bar", "beauty_salon", "bicycle_store", "book_store", "bowling_alley", "bus_station", "cafe", "campground", "car_dealer", "car_rental", "car_repair", "car_wash", "casino", "cemetery", "church", "city_hall", "clothing_store", "convenience_store", "courthouse", "dentist", "department_store", "doctor", "drugstore", "electrician", "electronics_store", "embassy", "fire_station", "florist", "funeral_home", "furniture_store", "gas_station", "gym", "hair_care", "hardware_store", "hindu_temple", "home_goods_store", "hospital", "insurance_agency", "jewelry_store", "laundry", "lawyer", "library", "light_rail_station", "liquor_store", "local_government_office", "locksmith", "lodging", "meal_delivery", "meal_takeaway", "mosque", "movie_rental", "movie_theater", "moving_company", "museum", "night_club", "painter", "park", "parking", "pet_store", "pharmacy", "physiotherapist", "plumber", "police", "post_office", "primary_school", "real_estate_agency", "restaurant", "roofing_contractor", "rv_park", "school", "secondary_school", "shoe_store", "shopping_mall", "spa", "stadium", "storage", "store", "subway_station", "supermarket", "synagogue", "taxi_stand", "tourist_attraction", "train_station", "transit_station", "travel_agency", "university", "veterinary_care", "zoo"],
            catagories: ["public","private"],
            provinceOrTerritory:["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon"],
            queryText: null,
            locations: []
        }
    },

    created() {
        this.items = this.value
    },

    methods: {
        onInput() {
            this.$emit("update-data", this.items)
        },
        upDatePlaceSearch() {
            this.$emit("map-query", this.queryText)

        },
        changeLocations(locations) {
            this.locations = locations
            console.log("LOCATIONS: "+this.locations)
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