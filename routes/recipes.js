const express = require('express');
const router = express.Router();

const User = require('../server/db/models/User');
const Recipe = require('../server/db/models/Recipe');
const url = '/search?app_id=4774d0c5&app_key=a56469a8e5c8652660440e595a4f5b90&q=';

router.route(`/:item`)
.get((req,res) => {

  console.log(req.params.item)
  console.log('ARE YOU GETTING HERE THO');
  


})












module.exports = router;