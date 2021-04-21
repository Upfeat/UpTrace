<template>
  <v-container class="page-content">
    <v-spacer> </v-spacer>
    <div>
      <v-data-table
        class="table"
        :headers="headers"
        :items="placeData"
        :items-per-page="5"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item="row">
          <tr style="height: 100px">
            <td class="text-xs-right">{{ row.item.name }}</td>
            <td class="text-xs-right">{{ row.item.phoneNumber }}</td>
            <td class="text-xs-right">{{ row.item.emailAddress }}</td>
            <td class="text-xs-right">{{ row.item.catagory }}</td>
            <td class="text-xs-right">{{ row.item.type }}</td>
            <td class="text-xs-right">{{ row.item.address }}</td>
            <td class="text-xs-right">{{ row.item.latlong }}</td>
            <td class="text-xs-right">{{ row.item.placeID }}</td>
            <td>
              <v-btn
                class="mx-2"
                color="#6B6B6B"
                icon
                @click="handleClick(row.item)"
              >
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
      <div class="pagination-btns">
        <v-layout justify-end>
          <v-pagination v-model="page" :length="pageCount"> </v-pagination>
        </v-layout>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    placeData: Array,
  },
  data() {
    return {
      page: 1,
      pageCount: 0,
    };
  },
  computed: {
    headers() {
      return [
        { text: "Name", value: "name" },
        { text: "Phone Number", value: "phoneNumber" },
        { text: "Email Address", value: "emailAddress" },
        { text: "Catagory", value: "catagory" },
        { text: "Type", value: "type" },
        { text: "Address", value: "address" },
        { text: "Latitude/Longtitude", value: "latlong" },
        { text: "Google Place ID", value: "placeID" },
      ];
    },
  },
  methods: {
    handleClick(place) {
      this.$router.push({ path: `editplace/${place.uuid}` });
    },
  },
};
</script>

<style>
td {
  height: 100px !important;
}

.v-pagination {
  margin-top: 70px !important;
}

.v-data-table {
  border-top: solid 1px #e1e1e1 !important;
  border-bottom: solid 1px #e1e1e1 !important;

  border-radius: 0px;
}
</style>