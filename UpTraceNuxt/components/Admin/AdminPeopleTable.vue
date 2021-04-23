<template>
  <v-container>
    <div>
      <v-data-table
        :headers="headers"
        :items="peopleData"
        :items-per-page="5"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item="row">
          <tr style="height: 100px">
            <td class="text-xs-right">{{ row.item.firstName }}</td>
            <td class="text-xs-right">{{ row.item.lastName }}</td>
            <td class="text-xs-right">{{ row.item.address }}</td>
            <td class="text-xs-right">{{ row.item.phoneNumber }}</td>
            <td class="text-xs-right">{{ row.item.emailAddress }}</td>
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
    peopleData: Array,
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
        { text: "FIRST NAME", value: "firstName" },
        { text: "LAST NAME", value: "lastName" },
        { text: "ADDRESS", value: "address" },
        { text: "PHONE NUMBER", value: "phoneNumber" },
        { text: "EMAIL ADDRESS", value: "emailAddress" },
      ];
    },
  },
  methods: {
    handleClick(person) {
      this.$router.push({ path: `editperson/${person.uuid}` });
    },
  },
};
</script>

<style>
td {
  height: 50px !important;  
  border-bottom: none !important;
  border-top: solid 1px #e1e1e1 !important;

}

th {
    border: none 1px !important;
}

tr {
  border: 0px none !important;
  
}

.v-pagination {
  margin-top: 70px !important;
}

.v-data-table {  
  font-family: "Montserrat-Regular";
  border-radius: 0px;
}
</style>