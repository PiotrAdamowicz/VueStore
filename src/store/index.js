import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import { apiConnection } from "../helpers/helpers";
// const baseURL = //"http://api.exchangeratesapi.io/v1/";
// const access_key = //"31417285af16596aeed9e5a3d3e2e460";

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

      state.data = apiConnection(paylode, true);

      // axios
      //   .get(`${baseURL}${paylode}?access_key=${access_key}`)
      //   .then((res) => {
      //     let result = [];
      //     console.log("RES:");
      //     console.log(res);
      //     for (let rate in res.data.rates) {
      //       result.push({ code: rate, value: res.data.rates[rate] });
      //     }
      //     this.state.data = result;

      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

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
