import axios from "axios";
const config = require("../../src/config");

// export const UPC_CODE = "https://api.nal.usda.gov/ndb/search/?format=json&q=";
// export const NDBNO_CODE = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
export const UPC_INGREDIENT = "UPC_INGREDIENT";

export const getByUpc = upc => {
  console.log(upc);
  return dispatch => {
    return axios
      .post(`/api/upc`, { new: upc })
      .then(data => {
        dispatch({
          type: UPC_INGREDIENT,
          ingredient: data.data
        });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };
};
