<template>
  <div class="data">
    <v-row class="blue-grey lighten-3" justify="center">
      <v-date-picker
        class="blue-grey lighten-3"
        v-model="date"
        @dblclick:date="dblClick"
      ></v-date-picker>
    </v-row>
    <v-data-table
      :items="getData"
      :headers="headers"
      :options.sync="options"
      class="elevation-1 blue-grey"
    ></v-data-table>

    <v-btn v-on:click="btnClick()" elevation="2" color="error" text large
      >test</v-btn
    >
    <h2>{{ h2 }}</h2>
  </div>
</template>

<script>
export default {
  name: "Data",
  data: () => {
    return {
      itemsData: [],
      date: new Date().toISOString().substr(0, 10),
      headers: [
        {
          text: "Currency",
          align: "start",
          sortable: true,
          value: "code",
        },
        { text: "Amount", value: "value" },
      ],
      loading: true,
      options: {},
      h2: "test",
    };
  },
  computed: {
    getData() {
      return this.$store.getters.getData;
    },
  },
  watch: {
    getData() {
      this.itemsData = this.getData;
      // console.log(this.itemsData);
    },
    options: {
      handler() {
        this.getDataFromApi(this.date);
      },
    },
    // watch: {
    //   data(items) {
    //     this.itemsData = items;
    //     console.log(this.itemsData);
    //   },
    //   options: {
    //     handler() {
    //       this.getDataFromApi();
    //     },
    //     deep: true,
    //   },
    //   btnData() {
    //     this.btnClick;
    //   },
  },
  mounted() {
    this.getDataFromApi(this.date);
    this.getData;
  },
  methods: {
    getDataFromApi(date) {
      this.itemsData = this.$store.dispatch("setData", date);
    },
    dblClick(date) {
      console.log(`You have just double clicked the following date: ${date}`);
      this.itemsData = this.getDataFromApi(date);
      this.date = date;
      // this.$store.dispatch("setDate", date);
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  background: #ddd;
}

h2 {
  height: 3rem;
  color: black;
}
</style>
