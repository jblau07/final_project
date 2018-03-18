const express = require('express');
const router = express.Router();
const Base64Decode = require('base64-stream').decode;
const fs = require('fs');
// const axios = require('axios');
const watson = require('watson-developer-cloud');
const path = require('path');

router.post('/', (req, res) => {
  let stream = Base64Decode(req.body.image);
  console.log('stream', stream);

  return new Promise((resolve, reject) => {
    const visual = new watson.VisualRecognitionV3({
      api_key: 'b1555be548310e779283830eb5f2cc3d664e5248',
      version: 'v3',
      version_date: '2016-05-20',
      url: 'https://gateway-a.watsonplatform.net/visual-recognition/api'
    });
  
    let parameters = {
      threshold: 0.7,
    };
    
    const params = {
      images_file: fs.createReadStream(path.join(__dirname + '/temp/apple.jpeg')),
      // images_file: stream,
      parameters: parameters
    };

    console.log('just before visual.classify()');
    
    visual.classify(params, (err, response) => {
      if (err) {
        console.log('err', err);
      }
      console.log('response', JSON.stringify(response, null, 2));
    });
  })
  .then(result => {
    console.log('result', JSON.stringify(result, null, 2));
    res.send(200).json({ "success": true });
  })
  .catch(err => {
    console.log('err', err);
  });
});

module.exports = router;