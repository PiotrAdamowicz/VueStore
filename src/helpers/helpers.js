import axios from "axios";
const baseURL = ""; //"http://api.exchangeratesapi.io/v1/";
const access_key = ""; //"31417285af16596aeed9e5a3d3e2e460";
const fakeData = [
  { code: "AED", value: 4.421673 },
  { code: "AFN", value: 93.352037 },
  { code: "ALL", value: 123.235763 },
  { code: "F-inn", value: "wooooorks!" },
];

const apiConnection = (paylode, isTesting) => {
  let state = [];

  if (isTesting) {
    console.log("date: " + paylode);

    state = fakeData;
  } else {
    axios
      .get(`${baseURL}${paylode}?access_key=${access_key}`)
      .then((res) => {
        let result = [];
        for (let rate in res.data.rates) {
          result.push({ code: rate, value: res.data.rates[rate] });
        }
        state = result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return state;
};

export { apiConnection };
