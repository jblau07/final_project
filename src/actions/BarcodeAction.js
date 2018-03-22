import axios from "axios";

const config = require("../../src/config");

// export const UPC_CODE = "https://api.nal.usda.gov/ndb/search/?format=json&q=";
// export const NDBNO_CODE = "https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
export const UPC_INGREDIENT = "UPC_INGREDIENT";

export const getByUpc = upc => {
  let user_id;
    const userInfo = JSON.parse(localStorage.getItem('user'));

    if (userInfo) {
      user_id = userInfo.id;
    }
  console.log(upc);
  return dispatch => {
    return axios
      .post(`/api/upc`, {
        new: upc
      })
      .then(data => {
        dispatch({
          type: UPC_INGREDIENT,
          ingredient: data.data
        })
        // console.log('data.data', data.data)
        return data.data;
      })
      .then(data => {
        return axios.post('/api/ingredients', {
            name: data.item_name
          })
          .then(data => {
            console.log('this data', data)
            let newFridgeItem = data.data.id;
            return axios.post('/api/fridge', {
              user_id,
              newFridgeItem
            })
          })
      })
      .catch(err => {
        console.log(err);
      });
  };
}