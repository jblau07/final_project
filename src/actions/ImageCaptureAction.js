import axios from 'axios';

export const SEND_IMAGE = 'SEND_IMAGE';

export const sendImage = (image) => {
  return dispatch => {
    return axios.post('/api/image-capture', {
      image: image
    })
    .then(data => {
      console.log('data', data);
      dispatch({
        type: SEND_IMAGE,
        image: data.image
      });
    })
    .catch(err => {
      console.log('err', err);
    });
  }
}