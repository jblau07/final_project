import axios from "axios";
const config = require("../../src/config");

export const UPC_CODE = "https://api.nal.usda.gov/ndb/search/?format=json&q=";
export const NDBNO_CODE = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
export const UPC_INGREDIENT = "UPC_INGREDIENT";

export const getByUpc = upc => {
  upc = parseFloat(upc);
  return dispatch => {
    return axios
      .get(`${UPC_CODE}${upc}&${config.api.upc}`)
      .then(data => {
        console.log(data);
        let ndbno = data.data.list.item[0].ndbno;
        return axios
          .get(`${NDBNO_CODE}${ndbno}&${config.api.ndbno}`)
          .then(data => {
            console.log(data);
            let desc = data.data.foods[0].food.desc.name;
            return dispatch({
              type: UPC_INGREDIENT,
              ingredient: desc
            });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };
};
