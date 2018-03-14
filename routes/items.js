const express = require('express');
const router = express.Router();

const Item = require('../server/db/models/Item');


router.route('/')
.get((req,res)=>{
  return new Item()
  .fetchAll({withRelated: ['users']})
  .then(ingredients =>{
    return res.json( ingredients.toJSON());
  })
  .catch(err => {
    console.log({err:err.message});
    return res.json({err: err.message});
  })

})
.post((req,res)=>{
  let data = {} = req.body;
  return new Item(data)
  .then(ingredient => {
    return res.       
  })

})

router.route('/:id')
.p











module.exports = Router;