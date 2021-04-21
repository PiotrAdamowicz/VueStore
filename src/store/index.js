import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
let baseURL = "http://api.exchangeratesapi.io/v1/";
const access_key = "31417285af16596aeed9e5a3d3e2e460";
const fakeData = [
  { code: "AED", value: 4.419936 },
  { code: "IT'S ALL FAKE!", value: 93.315445 },
  { code: "ALL", value: 123.03403 },
];

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [""],
  },
  mutations: {
    SET_DATA(state, paylode) {
      // baseURL = false; //remove to enable API calls
      if (!baseURL) {
        this.state.data = fakeData;
      } else {
        axios
          .get(`${baseURL}${paylode}?access_key=${access_key}`)
          .then((res) => {
            let response = [];
            for (let rate in res.data.rates) {
              response.push({ code: rate, value: res.data.rates[rate] });
            }
            console.log(`${baseURL}${paylode}?access_key=${access_key}`);

            this.state.data = response;
          })

          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  actions: {
    setData({ commit }, date) {
      commit("SET_DATA", date);
    },
  },
  getters: {
    getData: (state) => state.data,
  },
});
