<template>
  <v-container>
    <v-spacer> </v-spacer>
    <div>
      <v-data-table
        class="table"
        :headers="headers"
        :items="transportationData"
        :items-per-page="5"
        :page.sync="page"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:item="row">
          <tr style="height: 100px">
            <td class="text-xs-right">{{ row.item.type }}</td>
            <td class="text-xs-right">{{ row.item.identifier }}</td>
            <td class="text-xs-right">{{ row.item.startDate }}</td>
            <td class="text-xs-right">{{ row.item.endDate }}</td>
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
      <div>
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
    transportationData: Array,
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
        { text: "TYPE", value: "type" },
        { text: "IDENTIFIER", value: "identifier" },
        { text: "START DATEE", value: "startDate" },
        { text: "END DATE", value: "endDate" },
      ];
    },
  },
  methods: {
    handleClick(transportation) {
      this.$router.push({ path: `edittransportation/${transportation.uuid}` });
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