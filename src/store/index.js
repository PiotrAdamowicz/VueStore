import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const baseURL = "http://api.exchangeratesapi.io/v1/";
const access_key = "31417285af16596aeed9e5a3d3e2e460";

// const fakeData = {
//   success: true,
//   timestamp: 1618963199,
//   historical: true,
//   base: "EUR",
//   date: "2021-04-20",
//   rates: {
//     AED: 4.419936,
//     AFN: 93.315445,
//     ALL: 123.03403,
//     AMD: 627.985926,
//     ANG: 2.159339,
//     AOA: 791.500412,
//     ARS: 111.886286,
//     AUD: 1.558062,
//     AWG: 2.164721,
//     AZN: 2.044494,
//   },
// };

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [""],
    date: "",
    myFakeData: [
      { code: "AED", value: "4.421673" },
      { code: "AFN", value: "93.352037" },
    ],
  },
  mutations: {
    //TODO: I think it'll be best to use only specific date URL so on mounted I can use default date and on click chosen one

    //http://api.exchangeratesapi.io/v1/{date}?access_key={access_key}

    SET_DATA(state, paylode) {
      console.log(paylode);

      axios
        .get(`${baseURL}${paylode}?access_key=${access_key}`)
        .then((res) => {
          let result = [];
          console.log("RES:");
          console.log(res);
          for (let rate in res.data.rates) {
            result.push({ code: rate, value: res.data.rates[rate] });
          }
          this.state.data = result;
          console.log("RESULT:");
          console.log(result);
          console.log("STATE.DATA:");
          console.log(state.data);
        })
        .catch((err) => {
          console.log(err);
        });

      //My problem was that in simpler picker from Vutify data structure was {currency,amount} so mapping in component didn't work
      // for (let rate in paylode.res.rates)
      // console.log(res);
      // state.data = res;
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
